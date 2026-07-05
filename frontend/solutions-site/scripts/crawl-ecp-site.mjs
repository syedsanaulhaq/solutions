#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = 'https://ecp.gov.pk';
const SITEMAP_URL = `${ROOT}/sitemap.xml`;
const OUTPUT_PATH = path.resolve('src/data/ecpSiteCorpus.json');
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

const MAX_CHARS_PER_PAGE = 9000;
const CHUNK_SIZE = 850;
const CHUNK_OVERLAP = 120;
const MAX_PAGES = Number.parseInt(process.env.ECP_MAX_PAGES ?? '800', 10);

function normalizeSpace(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function stripHtml(html) {
  let cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  const boilerplate = [
    'HOME Latest updates General Election 2024 Press Releases Notifications Cause List Orders',
    'About Us Overview of ECP Honourable CEC Honourable Members Secretary ECP PEC Offices ECP Wings Officers',
    'Elections General Elections LG Elections Election Laws Delimitation Party Position Senate Elections',
    'For Voters How To Register Check Your Registration FAQs Electoral Rolls 8300 SMS Service National Voters Day',
    'Political Parties List of Political Parties List of Election Symbols Code Of Conduct Downloads ECP Wings Reports',
    'Accessibility Tools Increase Font Decrease Font High Contrast Negative Contrast Light Background Links Underline GrayScale Readable Fonts Reset',
  ];

  for (const segment of boilerplate) {
    cleaned = cleaned.replace(new RegExp(segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), ' ');
  }

  return normalizeSpace(cleaned);
}

function chunkText(text) {
  if (!text) return [];
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    const end = Math.min(i + CHUNK_SIZE, text.length);
    const chunk = text.slice(i, end).trim();
    if (chunk) chunks.push(chunk);
    if (end >= text.length) break;
    i = Math.max(end - CHUNK_OVERLAP, i + 1);
  }
  return chunks;
}

function extractLinks(html, baseUrl) {
  const links = [];
  const matches = [...html.matchAll(/href=["']([^"'#]+)["']/gi)];
  for (const match of matches) {
    const raw = match[1]?.trim();
    if (!raw) continue;
    try {
      const absolute = new URL(raw, baseUrl).toString();
      const normalized = sanitizeUrl(absolute);
      if (normalized) links.push(normalized);
    } catch {
      // ignore invalid links
    }
  }
  return links;
}

function extractLocTags(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)]
    .map((m) => m[1].trim())
    .filter(Boolean);
}

function isXmlSitemap(xml) {
  return /<urlset|<sitemapindex/i.test(xml);
}

function sanitizeUrl(raw) {
  try {
    const u = new URL(raw);
    if (!u.hostname.includes('ecp.gov.pk')) return null;
    u.hash = '';
    if (u.searchParams.has('page')) {
      u.search = '';
    }
    const blockedExt = /(\.pdf|\.doc|\.docx|\.xls|\.xlsx|\.zip|\.jpg|\.jpeg|\.png|\.gif|\.mp4|\.mp3)$/i;
    if (blockedExt.test(u.pathname)) return null;
    return u.toString().replace(/\/$/, '') || u.toString();
  } catch {
    return null;
  }
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.text();
}

async function collectSitemapUrls(startUrl) {
  const queue = [startUrl];
  const seen = new Set();
  const urls = new Set();

  while (queue.length) {
    const sitemapUrl = queue.shift();
    if (!sitemapUrl || seen.has(sitemapUrl)) continue;
    seen.add(sitemapUrl);

    try {
      const xml = await fetchText(sitemapUrl);
      if (!isXmlSitemap(xml)) continue;
      const locs = extractLocTags(xml);
      for (const loc of locs) {
        if (/\.xml($|\?)/i.test(loc)) {
          queue.push(loc);
        } else {
          const normalized = sanitizeUrl(loc);
          if (normalized) urls.add(normalized);
        }
      }
      console.log(`Sitemap parsed: ${sitemapUrl} (${locs.length} loc tags)`);
    } catch (error) {
      console.warn(`Sitemap failed: ${sitemapUrl} -> ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (!urls.size) {
    urls.add(`${ROOT}/for-voters`);
    urls.add(`${ROOT}/general-elections`);
    urls.add(`${ROOT}/election-laws`);
    urls.add(`${ROOT}/notifications`);
    urls.add(`${ROOT}/orders`);
    urls.add(`${ROOT}/delimitation`);
  }

  return [...urls];
}

async function crawlPages(urls) {
  const corpus = [];
  const queue = [...urls];
  const seen = new Set();
  let idCounter = 1;
  let crawled = 0;

  while (queue.length && crawled < MAX_PAGES) {
    const url = queue.shift();
    if (!url || seen.has(url)) continue;
    seen.add(url);
    crawled += 1;

    try {
      const html = await fetchText(url);
      const title = normalizeSpace((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '').replace(/<[^>]+>/g, ' '));
      const h1 = normalizeSpace((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '').replace(/<[^>]+>/g, ' '));
      const text = stripHtml(html).slice(0, MAX_CHARS_PER_PAGE);

      for (const discovered of extractLinks(html, url)) {
        if (!seen.has(discovered) && !queue.includes(discovered)) {
          queue.push(discovered);
        }
      }

      if (!text || text.length < 120) {
        if (crawled % 20 === 0 || queue.length === 0) {
          console.log(`Crawled ${crawled} pages, queue ${queue.length}`);
        }
        continue;
      }

      const chunks = chunkText(text).slice(0, 12);
      for (const chunk of chunks) {
        corpus.push({
          id: idCounter++,
          url,
          title: h1 || title || 'ECP Page',
          content: chunk,
        });
      }

      if (crawled % 20 === 0 || queue.length === 0) {
        console.log(`Crawled ${crawled} pages, queue ${queue.length}`);
      }
    } catch (error) {
      console.warn(`Page failed: ${url} -> ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return corpus;
}

async function main() {
  console.log('Collecting sitemap URLs...');
  const urls = await collectSitemapUrls(SITEMAP_URL);
  console.log(`Discovered sitemap URLs: ${urls.length}`);
  console.log(`Crawler max pages: ${MAX_PAGES}`);

  console.log('Crawling pages and building corpus...');
  const corpus = await crawlPages(urls);

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(corpus, null, 2)}\n`, 'utf8');

  const uniqueUrls = new Set(corpus.map((entry) => entry.url));
  console.log(`Saved corpus: ${OUTPUT_PATH}`);
  console.log(`Entries: ${corpus.length}, Unique URLs: ${uniqueUrls.size}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
