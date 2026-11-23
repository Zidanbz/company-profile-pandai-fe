'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { contentApi } from '@/lib/api/content';
import { contentFields, contentDefaults, contentGroups, isSafeContentUrl } from '@/lib/content/catalog';
import { ImageUploadWithCrop } from './ImageUploadWithCrop';

export function WebsiteContentEditor({ initialGroup = 'hero' }: { initialGroup?: string }) {
  const [group, setGroup] = useState(initialGroup);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  async function load() {
    setLoading(true); setError('');
    try {
      const result = await contentApi.getAll();
      const next = { ...contentDefaults, ...result.dictionary };
      setValues(next); setSaved(next);
    } catch (err) { setError(err instanceof Error ? err.message : 'Gagal memuat konten.'); }
    finally { setLoading(false); }
  }
  useEffect(() => { void load(); }, []);
  const fields = contentFields.filter(f => f.group === group);
  const dirty = contentFields.some(f => values[f.key] !== saved[f.key]);
  useEffect(() => {
    function beforeUnload(event: BeforeUnloadEvent) { if (dirty) { event.preventDefault(); event.returnValue = ''; } }
    window.addEventListener('beforeunload', beforeUnload);
    return () => window.removeEventListener('beforeunload', beforeUnload);
  }, [dirty]);
  async function save(event: React.FormEvent) {
    event.preventDefault(); setError(''); setNotice('');
    const changed = contentFields.filter(f => values[f.key] !== saved[f.key]);
    if (!changed.length) return;
    for (const field of changed) {
      if (['url', 'image'].includes(field.type) && !isSafeContentUrl(values[field.key], field.type === 'image')) {
        setGroup(field.group); setError(`Tautan tidak valid: ${field.label}`); return;
      }
    }
    setSaving(true);
    try {
      await contentApi.bulkUpdate(changed.map(f => ({ key: f.key, value: values[f.key], group: f.group })));
      setSaved({ ...values }); setNotice('Konten berhasil disimpan. Muat ulang website publik untuk melihat perubahan.');
    } catch (err) { setError(err instanceof Error ? err.message : 'Gagal menyimpan. Perubahan Anda masih tersedia.'); }
    finally { setSaving(false); }
  }
  if (loading) return <p role="status">Memuat konten website Pandai…</p>;
  if (!Object.keys(values).length) return <div role="alert"><p>{error}</p><button onClick={load}>Coba lagi</button></div>;
  return <div className="max-w-6xl mx-auto space-y-6 pb-16">
    <div><h1 className="text-2xl font-bold">Konten Website Pandai</h1>
      <p className="text-slate-500 mt-2">Edit teks, gambar, statistik, FAQ, dan tujuan tombol sesuai bagian website. Perubahan tersimpan setelah menekan Simpan.</p>
      <Link href="/" target="_blank" className="text-blue-600 underline">Lihat website ↗</Link>
    </div>
    <div className="flex flex-wrap gap-2" aria-label="Bagian website">{Object.entries(contentGroups).map(([key,label]) =>
      <button key={key} type="button" disabled={saving} aria-pressed={group === key} onClick={() => { setGroup(key); setNotice(''); }} className={`px-4 py-2 rounded-xl border text-sm ${group === key ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-900'}`}>{label}</button>
    )}</div>
    <form onSubmit={save} className="space-y-5">
      <h2 className="text-xl font-bold">{contentGroups[group]}</h2>
      {group === 'services' && <p>Tambah, hapus, urutkan, dan aktifkan kartu melalui <Link href="/admin/services" className="text-blue-600 underline">menu Layanan</Link>.</p>}
      {group === 'blog' && <p>Artikel beranda mengikuti artikel terbit terbaru dari <Link href="/admin/posts" className="text-blue-600 underline">menu Blog</Link>.</p>}
      {group === 'partners' && <p>Kelola logo, urutan, dan status tampil melalui <Link href="/admin/partners" className="text-blue-600 underline">menu Mitra &amp; Client</Link>.</p>}
      {fields.map((field, index) => <div key={field.key} className="p-5 rounded-xl border bg-white dark:bg-slate-900 space-y-2">
        {field.type === 'image' ? <ImageUploadWithCrop label={`${index + 1}. ${field.label}`} value={values[field.key]} onChange={url => setValues(v => ({ ...v, [field.key]: url }))} onDelete={() => setValues(v => ({ ...v, [field.key]: '' }))} minWidth={200} minHeight={100} aspectRatio={field.key === "site_logo" ? 4/1 : field.key === "site_favicon" ? 1 : 16/9} aspectRatioLabel={field.key === "site_logo" ? "4:1" : field.key === "site_favicon" ? "1:1" : "16:9"} previewAspectClass="aspect-video max-w-md" /> : <>
          <label htmlFor={field.key} className="block text-sm font-semibold">{index + 1}. {field.label}</label>
          <textarea id={field.key} rows={field.defaultValue.length > 120 ? 4 : 2} maxLength={10000} disabled={saving} value={values[field.key]} onChange={e => setValues(v => ({ ...v, [field.key]: e.target.value }))} className="w-full rounded-lg border p-3 bg-transparent" />
          {field.type === 'url' && <p className="text-xs text-slate-500">Gunakan https://, alamat halaman /…, atau anchor #….</p>}
        </>}
      </div>)}
      <div className="sticky bottom-0 bg-white dark:bg-slate-950 border rounded-xl p-4 space-y-2">
        {error && <p role="alert" className="text-red-600">{error}</p>}
        {notice && <p role="status" className="text-green-600">{notice}</p>}
        <button disabled={saving || !dirty} className="bg-blue-600 text-white px-6 py-3 rounded-xl disabled:opacity-50">{saving ? 'Menyimpan…' : 'Simpan Semua Perubahan'}</button>
        {dirty && <span className="ml-3 text-sm">Ada perubahan yang belum disimpan.</span>}
      </div>
    </form>
  </div>;
}
