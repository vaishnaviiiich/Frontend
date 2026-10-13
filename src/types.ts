export type AssetType = 'profile' | 'app';
export type Tier = 0 | 1 | 2;
export type Provenance = 'synthetic' | 'seeded' | 'public' | 'live';

export type ReasonCode = {
  code: string;
  variant_type?: string;
  message: string;
};

export type Detection = {
  id: string;
  asset_type: AssetType;
  asset_name: string;
  platform_or_store: string;
  brand_id: string;
  brand_match: string;
  score: number | null;
  tier: Tier;
  official: boolean;
  reason_codes: ReasonCode[];
  provenance: Provenance;
  detected_at: string;
  status: 'New' | 'Investigating' | 'Resolved';
  avatar?: string;
};

export type AnalyzeResponse = {
  score: number | null;
  tier: Tier;
  components: { label: string; value: number }[];
  signals: string[];
  shap: { label: string; value: number; tone: 'risk' | 'safe' }[];
  reason_codes: ReasonCode[];
  official: boolean;
};

export type Brand = {
  id: string;
  name: string;
  domains: string[];
  handles: string[];
  packages: string[];
  developers: string[];
  allowlist: { value: string; type: string; note: string }[];
  thresholds: { review: number; escalate: number };
};

export type Case = {
  id: string;
  detectionId: string;
  title: string;
  status: 'Open' | 'In review' | 'Closed';
  tier: Tier;
  type: AssetType;
  owner: string;
  updated: string;
  notes: string;
};
