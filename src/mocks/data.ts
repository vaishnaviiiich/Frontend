import type { Brand, Case, Detection } from '@/types';

const reasons = {
  char: { code: 'CHAR_SWAP', variant_type: 'Look-alike', message: "Character swap: 'paypa1' vs 'paypal'" },
  word: { code: 'ADDED_WORD', variant_type: 'Look-alike', message: "Added word: 'acme-bank-support' vs 'acmebank'" },
  spacing: { code: 'SPACING_CHANGE', variant_type: 'Look-alike', message: "Spacing change: 'acme bank' vs 'acmebank'" },
  image: { code: 'IMAGE_MATCH', message: 'Profile image matches official brand assets' },
  package: { code: 'PACKAGE_SIMILARITY', message: "Package name is one character from 'com.acme.mobile'" },
};

const names = [
  ['acme_bank_help', 'Instagram', 91, 2, [reasons.word, reasons.image]],
  ['com.acme.mobile.pro', 'Google Play', 96, 2, [reasons.package, reasons.char]],
  ['acmebank_official', 'X', null, 0, []],
  ['acme-support', 'TikTok', 78, 1, [reasons.word, reasons.spacing]],
  ['acme bank', 'Facebook', 84, 1, [reasons.spacing]],
  ['com.acmebank.wallet', 'App Store', 88, 2, [reasons.package]],
  ['paypa1_acme', 'Instagram', 73, 1, [reasons.char]],
  ['acmebank-careers', 'LinkedIn', 66, 1, [reasons.word]],
  ['Acme Bank', 'App Store', null, 0, []],
  ['acme_bank_news', 'YouTube', 48, 1, [reasons.word]],
  ['acmebank-secure', 'X', 89, 2, [reasons.char, reasons.image]],
  ['com.acme.bank.test', 'Google Play', 52, 1, [reasons.package]],
  ['acme.bank', 'Instagram', 62, 1, [reasons.spacing]],
  ['acmebank', 'Facebook', null, 0, []],
  ['acmebank-helpdesk', 'Reddit', 81, 2, [reasons.word, reasons.image]],
  ['acme-bank-login', 'Instagram', 93, 2, [reasons.word, reasons.char]],
  ['Acme Wallet', 'Google Play', 77, 1, [reasons.package]],
  ['acmebank_team', 'X', 39, 1, [reasons.spacing]],
  ['acme_bank_uk', 'Instagram', 55, 1, [reasons.word]],
  ['com.acme.mobile', 'App Store', null, 0, []],
  ['acmebank.vip', 'Facebook', 87, 2, [reasons.char]],
  ['acme_bank_alerts', 'Telegram', 69, 1, [reasons.word]],
  ['Acme Bank Rewards', 'Google Play', 90, 2, [reasons.package, reasons.image]],
  ['acmebankglobal', 'LinkedIn', 44, 1, [reasons.word]],
  ['acme-bank-verify', 'Instagram', 86, 2, [reasons.word, reasons.image]],
  ['acme.bank.app', 'App Store', 72, 1, [reasons.package]],
  ['acmebank_foundation', 'Facebook', null, 0, []],
  ['acmebank-secure-login', 'TikTok', 94, 2, [reasons.word, reasons.char]],
  ['com.acme.banking', 'Google Play', 65, 1, [reasons.package]],
  ['acmebank support', 'X', 58, 1, [reasons.spacing]],
] as const;

export const detections: Detection[] = names.map((row, index) => {
  const [asset_name, platform_or_store, score, tier, reason_codes] = row;
  return {
    id: `det-${index + 1}`,
    asset_type: platform_or_store.includes('Play') || platform_or_store.includes('Store') ? 'app' : 'profile',
    asset_name,
    platform_or_store,
    brand_id: 'brand-acme',
    brand_match: 'Acme Bank',
    score,
    tier,
    official: tier === 0,
    reason_codes: [...reason_codes],
    provenance: index < 5 ? 'live' : index < 15 ? 'seeded' : index < 24 ? 'public' : 'synthetic',
    detected_at: new Date(Date.now() - index * 1000 * 60 * 47).toISOString(),
    status: tier === 2 ? 'New' : tier === 1 ? 'Investigating' : 'Resolved',
  };
});

export const brand: Brand = {
  id: 'brand-acme', name: 'Acme Bank', domains: ['acmebank.com', 'acmebank.co.uk'],
  handles: ['@acmebank', '@acmebank_help'], packages: ['com.acme.mobile', 'com.acme.wallet'],
  developers: ['Acme Bank Ltd', 'Acme Digital'], thresholds: { review: 45, escalate: 80 },
  allowlist: [{ value: '@acmebank_fans', type: 'Fan', note: 'Community account' }, { value: 'acmebank.foundation', type: 'Partner', note: 'Verified foundation' }],
};

export const cases: Case[] = [
  { id: 'case-1042', detectionId: 'det-1', title: 'acme_bank_help impersonation', status: 'Open', tier: 2, type: 'profile', owner: 'A. Patel', updated: '12 min ago', notes: 'High-confidence support impersonation targeting customers.' },
  { id: 'case-1041', detectionId: 'det-2', title: 'com.acme.mobile.pro rogue app', status: 'In review', tier: 2, type: 'app', owner: 'M. Chen', updated: '1 hr ago', notes: 'Package mirrors the mobile banking app and requests contacts.' },
  { id: 'case-1038', detectionId: 'det-4', title: 'acme-support social profile', status: 'Open', tier: 1, type: 'profile', owner: 'J. Williams', updated: '3 hrs ago', notes: 'Needs manual review before escalation.' },
];

export const chartData = [
  { day: 'Mon', detections: 18 }, { day: 'Tue', detections: 24 }, { day: 'Wed', detections: 21 }, { day: 'Thu', detections: 33 }, { day: 'Fri', detections: 29 }, { day: 'Sat', detections: 41 }, { day: 'Sun', detections: 36 },
];
