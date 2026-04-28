import { promises as fs } from 'fs';
import path from 'path';

export interface QuoteLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  description: string;
  source: 'form' | 'chatbot';
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

export async function readLeads(): Promise<QuoteLead[]> {
  try {
    const raw = await fs.readFile(LEADS_FILE, 'utf-8');
    return JSON.parse(raw) as QuoteLead[];
  } catch {
    return [];
  }
}

export async function writeLeads(leads: QuoteLead[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}
