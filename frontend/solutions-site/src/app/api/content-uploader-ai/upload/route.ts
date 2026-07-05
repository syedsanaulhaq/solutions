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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Please upload a file.' }, { status: 400 });
    }

    const fileName = (file.name || 'content').toLowerCase();
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

    const clipped = normalized.slice(0, 60000);

    return NextResponse.json({
      contentText: clipped,
      clipped: clipped.length < normalized.length,
      chars: clipped.length,
    });
  } catch (error) {
    console.error('[content-uploader-ai/upload] Failed to parse uploaded content:', error);
    return NextResponse.json({ error: 'Failed to parse uploaded content.' }, { status: 500 });
  }
}
