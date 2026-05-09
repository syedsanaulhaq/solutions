import { readFile } from 'fs/promises';
import path from 'path';

export interface WebHostingPlan {
  id: string;
  whmcsId: number;
  name: string;
  priceGBP: number;
  pricePKR: number;
  billingCycle: string;
  description: string;
  popular: boolean;
  features: string[];
}

export interface VPSSpecs {
  cpu: string;
  ram: string;
  storage: string;
  bandwidth: string;
  os?: string;
  ip?: string;
}

export interface VPSPlan {
  id: string;
  whmcsId: number;
  name: string;
  priceGBP: number;
  pricePKR: number;
  billingCycle: string;
  description: string;
  popular: boolean;
  features: string[];
  specs: VPSSpecs;
}

export interface DedicatedPlan {
  id: string;
  whmcsId: number;
  name: string;
  priceGBP: number;
  pricePKR: number;
  billingCycle: string;
  description: string;
  popular: boolean;
  features: string[];
  specs: VPSSpecs;
}

export interface PlansData {
  lastSynced: string;
  exchangeRate: { GBPPKR: number; source: string };
  webHosting: WebHostingPlan[];
  vpsHosting: VPSPlan[];
  dedicatedServers: DedicatedPlan[];
}

export async function getPlans(): Promise<PlansData> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'hosting-plans.json');
  const raw = await readFile(filePath, 'utf-8');
  return JSON.parse(raw) as PlansData;
}
