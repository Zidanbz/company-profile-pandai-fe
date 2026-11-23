import fields from './fields.json';
export const contentFields = fields;
export const contentGroups: Record<string, string> = {
  settings: 'Identitas, SEO & Media Sosial', navigation: 'Navigasi', hero: 'Hero & Keunggulan', about: 'Tentang & Statistik',
  services: 'Tampilan Layanan', process: 'Proses Kerja', gallery: 'Galeri',
  partners: 'Judul Mitra & Klien', blog: 'Tampilan Blog', faq: 'FAQ',
  cta: 'Ajakan Konsultasi', contact: 'Kontak & Formulir', footer: 'Footer',
};
export const contentDefaults = Object.fromEntries(fields.map(f => [f.key, f.defaultValue]));
export function safeContentValue(key: string, value: string): string {
  const field = fields.find(f => f.key === key);
  if (!field) return value;
  if (field.type === 'image' || field.type === 'url') {
    if (!isSafeContentUrl(value, field.type === 'image')) return field.defaultValue;
  }
  return value;
}
export function isSafeContentUrl(value: string, image = false): boolean {
  if (!value) return true;
  if (/[\\\u0000-\u0020]/.test(value)) return false;
  if (value.startsWith('/') && !value.startsWith('//')) return true;
  if (!image && value.startsWith('#')) return true;
  try { return ['https:', 'http:'].includes(new URL(value).protocol); } catch { return false; }
}
