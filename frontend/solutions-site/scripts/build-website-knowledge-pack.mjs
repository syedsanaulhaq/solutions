#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_OUTPUT = 'tmp/website-knowledge-pack.md';
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

function normalizeSpace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function stripHtml(html) {
  return normalizeSpace(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
  );
}

async function fetchPage(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
  });

  if (!response.ok) {
    throw new Error(`Failed ${url}: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);

  const title = titleMatch ? normalizeSpace(stripHtml(titleMatch[1])) : '';
  const h1 = h1Match ? normalizeSpace(stripHtml(h1Match[1])) : '';
  const plain = stripHtml(html);

  return {
    url,
    title,
    h1,
    excerpt: plain.slice(0, 1800),
  };
}

async function main() {
  const [, , outputPathArg, ...urls] = process.argv;

  if (!outputPathArg || urls.length === 0) {
    console.error('Usage: node scripts/build-website-knowledge-pack.mjs <output-file> <url1> <url2> ...');
    console.error(`Example output path: ${DEFAULT_OUTPUT}`);
    process.exit(1);
  }

  const pages = [];
  for (const url of urls) {
    try {
      const page = await fetchPage(url);
      pages.push(page);
      console.log(`Fetched: ${url}`);
    } catch (error) {
      pages.push({
        url,
        title: '',
        h1: '',
        excerpt: `ERROR: ${error instanceof Error ? error.message : String(error)}`,
      });
      console.warn(`Failed: ${url}`);
    }
  }

  const lines = [
    '# Website Knowledge Pack',
    '',
    `Generated at: ${new Date().toISOString()}`,
    '',
  ];

  for (const page of pages) {
    lines.push(`## ${page.h1 || page.title || page.url}`);
    lines.push(`- URL: ${page.url}`);
    if (page.title) lines.push(`- Title: ${page.title}`);
    if (page.h1) lines.push(`- H1: ${page.h1}`);
    lines.push('');
    lines.push(page.excerpt || 'No extracted text.');
    lines.push('');
  }

  const outputPath = path.resolve(outputPathArg);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${lines.join('\n')}\n`, 'utf8');

  console.log(`Saved knowledge pack: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
