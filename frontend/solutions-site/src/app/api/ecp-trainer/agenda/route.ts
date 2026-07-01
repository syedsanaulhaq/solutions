import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';

function decodeXmlEntities(input: string): string {
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function docxXmlToText(xml: string): string {
  const paragraphRegex = /<w:p[\s\S]*?<\/w:p>/g;
  const textRegex = /<w:t[^>]*>([\s\S]*?)<\/w:t>/g;

  const paragraphs = xml.match(paragraphRegex) ?? [];
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    const chunks: string[] = [];
    let match: RegExpExecArray | null;
    while ((match = textRegex.exec(paragraph)) !== null) {
      chunks.push(decodeXmlEntities(match[1]));
    }

    const line = chunks.join('').replace(/\s+/g, ' ').trim();
    if (line) lines.push(line);
  }

  return lines.join('\n');
}

function summarizeAgenda(raw: string): string[] {
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const dayHeadings = lines.filter((line) => /^day\s*[- ]?\d+/i.test(line));
  const moduleHeadings = lines.filter((line) => /^\d+\.\s/.test(line));

  const summary: string[] = [];
  if (dayHeadings.length) summary.push(`Detected ${dayHeadings.length} day headings.`);
  if (moduleHeadings.length) summary.push(`Detected ${moduleHeadings.length} module headings.`);

  const sampleDays = dayHeadings.slice(0, 5);
  if (sampleDays.length) {
    summary.push('First day headings:');
    summary.push(...sampleDays.map((line) => `- ${line}`));
  }

  return summary;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Please upload a file.' }, { status: 400 });
    }

    const fileName = (file.name || 'agenda').toLowerCase();
    const buffer = Buffer.from(await file.arrayBuffer());

    let extractedText = '';

    if (fileName.endsWith('.txt') || fileName.endsWith('.md')) {
      extractedText = buffer.toString('utf8');
    } else if (fileName.endsWith('.docx')) {
      const zip = await JSZip.loadAsync(buffer);
      const xmlFile = zip.file('word/document.xml');
      if (!xmlFile) {
        return NextResponse.json({ error: 'Could not read DOCX document.xml.' }, { status: 400 });
      }

      const xml = await xmlFile.async('text');
      extractedText = docxXmlToText(xml);
    } else {
      return NextResponse.json({ error: 'Unsupported file type. Use .docx, .txt, or .md.' }, { status: 400 });
    }

    const normalized = extractedText.replace(/\u00a0/g, ' ').replace(/[ \t]+/g, ' ').trim();
    if (!normalized) {
      return NextResponse.json({ error: 'No readable text found in file.' }, { status: 400 });
    }

    const clipped = normalized.slice(0, 24000);
    const summary = summarizeAgenda(clipped);

    return NextResponse.json({
      agendaText: clipped,
      summary,
      clipped: clipped.length < normalized.length,
    });
  } catch (error) {
    console.error('[ecp-trainer/agenda] Failed to parse uploaded agenda:', error);
    return NextResponse.json({ error: 'Failed to parse agenda file.' }, { status: 500 });
  }
}
