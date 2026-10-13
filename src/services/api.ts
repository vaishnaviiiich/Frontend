import { brand, cases, detections } from '@/mocks/data';
import type { AnalyzeResponse, Detection } from '@/types';

const base = import.meta.env.VITE_API_BASE ?? '';
export const isDemo = !base;

async function request<T>(path: string, init?: RequestInit, fallback?: T): Promise<T> {
  if (!base && fallback !== undefined) return Promise.resolve(fallback);
  try {
    const response = await fetch(`${base}${path}`, { headers: { 'Content-Type': 'application/json' }, ...init });
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    return await response.json() as T;
  } catch (error) {
    if (fallback !== undefined) return fallback;
    throw error;
  }
}

export const getDetections = () => request<Detection[]>('/api/detections', undefined, detections);
export const getCases = () => request('/api/cases', undefined, cases);
export const getBrand = () => request('/api/brands/brand-acme', undefined, brand);

export async function analyze(input: Record<string, unknown>): Promise<AnalyzeResponse> {
  const text = JSON.stringify(input).toLowerCase();
  const official = text.includes('acmebank') && (text.includes('com.acme.mobile') || text.includes('@acmebank')) && !text.includes('help');
  const score = official ? null : Math.min(98, Math.max(34, 52 + (text.includes('support') ? 24 : 0) + (text.includes('pro') ? 18 : 0) + (text.includes('bank') ? 8 : 0)));
  const riskScore = score ?? 0;
  return request('/api/analyze/profile', { method: 'POST', body: JSON.stringify(input) }, {
    score, tier: official ? 0 : riskScore >= 80 ? 2 : 1, official,
    components: [{ label: 'Identity similarity', value: official ? 100 : riskScore - 4 }, { label: 'Asset reuse', value: official ? 100 : riskScore - 12 }, { label: 'Behavioral signals', value: official ? 100 : riskScore - 20 }, { label: 'Context risk', value: official ? 0 : riskScore - 8 }],
    signals: official ? ['Exact match to Brand Digital Twin', 'Allowlisted official asset'] : ['Name resembles protected brand asset', 'Detected on a monitored source', 'Candidate is not in allowlist'],
    shap: official ? [] : [{ label: 'Name similarity', value: 31, tone: 'risk' }, { label: 'Logo reuse', value: 24, tone: 'risk' }, { label: 'Account age', value: -12, tone: 'safe' }, { label: 'Follower pattern', value: 9, tone: 'risk' }],
    reason_codes: official ? [] : [{ code: 'ADDED_WORD', variant_type: 'Look-alike', message: "Added word: candidate includes 'support'" }, { code: 'IMAGE_MATCH', message: 'Profile image matches official brand assets' }],
  });
}

export const submitFeedback = (payload: unknown) => request('/api/feedback', { method: 'POST', body: JSON.stringify(payload) }, { ok: true });
