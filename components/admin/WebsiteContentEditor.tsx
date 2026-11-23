"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileText,
  Globe,
  ImageIcon,
  LayoutTemplate,
  Loader2,
  RotateCcw,
  Save,
  Search,
} from "lucide-react";
import { contentApi } from "@/lib/api/content";
import {
  contentFields,
  contentDefaults,
  isSafeContentUrl,
} from "@/lib/content/catalog";
import {
  editorLabels,
  editorSections,
  getEditorBlocks,
} from "@/lib/content/editor-layout";
import { ImageUploadWithCrop } from "./ImageUploadWithCrop";

const control =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 disabled:opacity-60";
const panel =
  "rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900";
const orderedGroups = [
  "hero",
  "about",
  "services",
  "process",
  "gallery",
  "partners",
  "blog",
  "faq",
  "cta",
  "contact",
  "navigation",
  "footer",
  "settings",
];
const fieldByKey = new Map(contentFields.map((field) => [field.key, field]));

export function WebsiteContentEditor({
  initialGroup,
}: {
  initialGroup?: string;
}) {
  const [group, setGroup] = useState(
    initialGroup && editorSections[initialGroup] ? initialGroup : "",
  );
  const [values, setValues] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [openBlock, setOpenBlock] = useState("");
  const [discarding, setDiscarding] = useState(false);
  const [invalidKey, setInvalidKey] = useState("");
  const dirtyFields = contentFields.filter(
    (field) => values[field.key] !== saved[field.key],
  );
  const groupChanges = dirtyFields.filter((field) => field.group === group);
  const dirty = dirtyFields.length > 0;
  const section = editorSections[group];
  const blocks = getEditorBlocks(group);
  const normalizedQuery = query.trim().toLocaleLowerCase("id");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const result = await contentApi.getAll();
      const next = { ...contentDefaults, ...result.dictionary };
      setValues(next);
      setSaved(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat konten.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load();
  }, []);
  useEffect(() => {
    function beforeUnload(event: BeforeUnloadEvent) {
      if (dirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    }
    function guardNavigation(event: MouseEvent) {
      const link = (event.target as Element).closest?.("a");
      if (!dirty || !link || link.target === "_blank" || event.defaultPrevented)
        return;
      const url = new URL(link.href, window.location.href);
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      )
        return;
      if (
        !window.confirm(
          "Ada perubahan yang belum disimpan. Tinggalkan halaman ini?",
        )
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
    window.addEventListener("beforeunload", beforeUnload);
    document.addEventListener("click", guardNavigation, true);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      document.removeEventListener("click", guardNavigation, true);
    };
  }, [dirty]);
  useEffect(() => {
    if (invalidKey) document.getElementById(invalidKey)?.focus();
  }, [invalidKey, openBlock]);

  function selectGroup(next: string) {
    setGroup(next);
    setQuery("");
    setOpenBlock("");
    setError("");
    setNotice("");
    setInvalidKey("");
    setDiscarding(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function update(key: string, value: string) {
    setValues((previous) => ({ ...previous, [key]: value }));
    setNotice("");
    if (key === invalidKey) {
      setInvalidKey("");
      setError("");
    }
  }
  async function save(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setNotice("");
    setInvalidKey("");
    if (saving || !groupChanges.length) return;
    for (const field of groupChanges) {
      const value = values[field.key];
      const invalidUrl =
        ["url", "image"].includes(field.type) &&
        !isSafeContentUrl(value, field.type === "image");
      const invalidEmail =
        field.key === "contact_email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (invalidUrl || invalidEmail || value.length > 10000) {
        setQuery("");
        setOpenBlock(
          blocks.find((block) => block.keys.includes(field.key))?.id ?? "",
        );
        setInvalidKey(field.key);
        setError(
          `${editorLabels[field.key] || field.label}: ${invalidEmail ? "masukkan alamat email yang valid." : invalidUrl ? "tautan tidak valid." : "maksimal 10.000 karakter."}`,
        );
        return;
      }
    }
    // Snapshot only the fields sent, so drafts in other sections stay unsaved.
    const changes = groupChanges.map((field) => ({
      key: field.key,
      value: values[field.key],
      group: field.group,
    }));
    setSaving(true);
    try {
      await contentApi.bulkUpdate(changes);
      setSaved((previous) => ({
        ...previous,
        ...Object.fromEntries(changes.map((item) => [item.key, item.value])),
      }));
      setNotice(
        `Perubahan ${section.title.toLowerCase()} sudah terbit di website.`,
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal menyimpan. Perubahan Anda tetap tersedia.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return (
      <div
        role="status"
        className={`${panel} flex min-h-64 flex-col items-center justify-center gap-3 text-sm text-slate-500`}
      >
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        Memuat konten website…
      </div>
    );
  if (!Object.keys(values).length)
    return (
      <div className={`${panel} p-8`}>
        <p role="alert" className="text-red-600">
          {error}
        </p>
        <button
          type="button"
          onClick={load}
          className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Coba lagi
        </button>
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl space-y-7 pb-6 scroll-mt-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            <Globe className="h-4 w-4" />
            Website Pandai
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Konten website
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Pilih bagian yang ingin diperbarui. Edit seperlunya, lalu simpan
            untuk menerbitkan perubahan.
          </p>
        </div>
        <Link
          href={section ? `/#${section.anchor}` : "/"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
        >
          Lihat website
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </header>

      {!section ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-blue-50 p-5 text-sm dark:bg-blue-950/40">
            <div className="flex items-center gap-3">
              <LayoutTemplate className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
              <p className="text-slate-700 dark:text-slate-300">
                Mulai dari satu bagian. Perubahan yang belum disimpan tetap
                tersedia selama berpindah bagian di halaman ini.
              </p>
            </div>
            {dirty && (
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                {dirtyFields.length} perubahan belum disimpan
              </span>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {orderedGroups.map((key, index) => {
              const item = editorSections[key];
              const count = dirtyFields.filter(
                (field) => field.group === key,
              ).length;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => selectGroup(key)}
                  className={`${panel} group flex flex-col p-5 text-left transition hover:border-blue-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20`}
                >
                  <div className="mb-5 flex w-full items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-sm font-semibold text-slate-500 transition group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-slate-800 dark:group-hover:bg-blue-950">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {count ? (
                      <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                        {count} perubahan
                      </span>
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                    )}
                  </div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="mt-1.5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    Edit bagian
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[210px_minmax(0,1fr)]">
          <aside className="min-w-0 space-y-4 xl:sticky xl:top-24">
            <button
              type="button"
              disabled={saving}
              onClick={() => selectGroup("")}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Semua bagian
            </button>
            <nav
              aria-label="Bagian konten website"
              className="flex gap-1.5 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900 xl:flex-col xl:overflow-visible"
            >
              {orderedGroups.map((key) => {
                const count = dirtyFields.filter(
                  (field) => field.group === key,
                ).length;
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={saving}
                    aria-current={key === group ? "true" : undefined}
                    onClick={() => selectGroup(key)}
                    className={`flex shrink-0 items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition disabled:opacity-50 ${key === group ? "bg-blue-50 font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300" : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"}`}
                  >
                    <span>{editorSections[key].title}</span>
                    {count > 0 && (
                      <span
                        aria-label={`${count} perubahan belum disimpan`}
                        className="h-2 w-2 shrink-0 rounded-full bg-amber-500"
                      />
                    )}
                  </button>
                );
              })}
            </nav>
            <p className="hidden px-2 text-xs leading-5 text-slate-400 xl:block">
              Titik oranye menandai bagian yang memiliki perubahan belum
              disimpan.
            </p>
          </aside>

          <form onSubmit={save} noValidate className="min-w-0 space-y-4">
            <div className={`${panel} p-5 sm:p-6`}>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <span>Konten website</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-blue-600 dark:text-blue-400">
                  {section.title}
                </span>
              </div>
              <h2 className="mt-3 text-xl font-bold">{section.title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {section.description}
              </p>
              <div className="relative mt-5">
                <Search className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  aria-label="Cari isian dalam bagian ini"
                  type="search"
                  placeholder="Cari isian di bagian ini…"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className={`${control} pl-10`}
                />
              </div>
            </div>

            {section.related && (
              <Link
                href={section.related.href}
                className="flex items-center justify-between gap-4 rounded-2xl border border-blue-100 bg-blue-50/70 px-5 py-4 transition hover:bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30"
              >
                <div>
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                    {section.related.label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {section.related.description}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-blue-600" />
              </Link>
            )}

            <fieldset disabled={saving} className="min-w-0 space-y-3">
              {blocks.map((block, index) => {
                const fields = block.keys
                  .map((key) => fieldByKey.get(key))
                  .filter(
                    (field): field is (typeof contentFields)[number] => !!field,
                  )
                  .filter(
                    (field) =>
                      !normalizedQuery ||
                      `${editorLabels[field.key]} ${field.label} ${values[field.key]} ${block.title}`
                        .toLocaleLowerCase("id")
                        .includes(normalizedQuery),
                  );
                if (!fields.length) return null;
                const expanded =
                  !!normalizedQuery ||
                  (openBlock ? openBlock === block.id : index === 0);
                const changed = block.keys.filter(
                  (key) => values[key] !== saved[key],
                ).length;
                const blockId = `content-block-${group}-${block.id}`;
                return (
                  <section key={`${group}-${block.id}`} className={panel}>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={blockId}
                      onClick={() =>
                        setOpenBlock(expanded ? "__closed" : block.id)
                      }
                      className="flex w-full items-center gap-3 rounded-2xl p-5 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${expanded ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300" : "bg-slate-50 text-slate-400 dark:bg-slate-800"}`}
                      >
                        {fields.some((field) => field.type === "image") ? (
                          <ImageIcon className="h-4 w-4" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold">
                          {block.title}
                        </span>
                        <span className="mt-0.5 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                          {block.description}
                        </span>
                      </span>
                      {changed > 0 && (
                        <span
                          className="h-2 w-2 shrink-0 rounded-full bg-amber-500"
                          aria-label={`${changed} perubahan`}
                        />
                      )}
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-slate-400 transition ${expanded ? "rotate-180" : ""}`}
                      />
                    </button>
                    {expanded && (
                      <div
                        id={blockId}
                        className="grid gap-5 border-t border-slate-100 p-5 dark:border-slate-800 sm:grid-cols-2 sm:p-6"
                      >
                        {fields.map((field) => {
                          const label = editorLabels[field.key] || field.label;
                          const multiline =
                            field.defaultValue.length > 100 ||
                            [
                              "contact_address",
                              "seo_meta_description",
                            ].includes(field.key);
                          const changedField =
                            values[field.key] !== saved[field.key];
                          return (
                            <div
                              key={field.key}
                              className={
                                multiline || field.type === "image"
                                  ? "sm:col-span-2"
                                  : ""
                              }
                            >
                              {field.type === "image" ? (
                                <ImageUploadWithCrop
                                  label={label}
                                  value={values[field.key]}
                                  onChange={(url) => update(field.key, url)}
                                  onDelete={() => update(field.key, "")}
                                  minWidth={200}
                                  minHeight={100}
                                  aspectRatio={
                                    field.key === "site_logo"
                                      ? 4 / 1
                                      : field.key === "site_favicon"
                                        ? 1
                                        : 16 / 9
                                  }
                                  aspectRatioLabel={
                                    field.key === "site_logo"
                                      ? "4:1"
                                      : field.key === "site_favicon"
                                        ? "1:1"
                                        : "16:9"
                                  }
                                  previewAspectClass="aspect-video max-w-sm"
                                />
                              ) : (
                                <>
                                  <label
                                    htmlFor={field.key}
                                    className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"
                                  >
                                    {label}
                                    {changedField && (
                                      <span
                                        className="h-1.5 w-1.5 rounded-full bg-amber-500"
                                        aria-label="Diubah"
                                      />
                                    )}
                                  </label>
                                  {multiline ? (
                                    <textarea
                                      id={field.key}
                                      rows={3}
                                      maxLength={10000}
                                      aria-invalid={
                                        invalidKey === field.key || undefined
                                      }
                                      aria-describedby={
                                        invalidKey === field.key
                                          ? "content-error"
                                          : undefined
                                      }
                                      value={values[field.key]}
                                      onChange={(event) =>
                                        update(field.key, event.target.value)
                                      }
                                      className={`${control} resize-y leading-6`}
                                    />
                                  ) : (
                                    <input
                                      id={field.key}
                                      type={
                                        field.key === "contact_email"
                                          ? "email"
                                          : field.key === "contact_phone"
                                            ? "tel"
                                            : "text"
                                      }
                                      maxLength={10000}
                                      aria-invalid={
                                        invalidKey === field.key || undefined
                                      }
                                      aria-describedby={
                                        invalidKey === field.key
                                          ? "content-error"
                                          : field.type === "url"
                                            ? `${field.key}-hint`
                                            : undefined
                                      }
                                      value={values[field.key]}
                                      onChange={(event) =>
                                        update(field.key, event.target.value)
                                      }
                                      className={control}
                                    />
                                  )}
                                  {field.type === "url" && (
                                    <p
                                      id={`${field.key}-hint`}
                                      className="mt-1.5 text-xs leading-5 text-slate-400"
                                    >
                                      Gunakan https://…, halaman /…, atau bagian
                                      #….
                                    </p>
                                  )}
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </section>
                );
              })}
            </fieldset>

            {normalizedQuery &&
              !blocks.some((block) =>
                block.keys.some((key) => {
                  const field = fieldByKey.get(key);
                  return (
                    field &&
                    `${editorLabels[key]} ${field.label} ${values[key]} ${block.title}`
                      .toLocaleLowerCase("id")
                      .includes(normalizedQuery)
                  );
                }),
              ) && (
                <div className={`${panel} p-8 text-center`}>
                  <Search className="mx-auto mb-3 h-6 w-6 text-slate-300" />
                  <p className="text-sm font-medium">
                    Tidak ada isian yang cocok.
                  </p>
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="mt-3 text-sm text-blue-600"
                  >
                    Hapus pencarian
                  </button>
                </div>
              )}

            <div className="sticky bottom-4 z-10 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg shadow-slate-900/5 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
              {error && (
                <p
                  id="content-error"
                  role="alert"
                  className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
                >
                  {error}
                </p>
              )}
              {notice && (
                <p
                  role="status"
                  className="mb-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  {notice}
                </p>
              )}
              {discarding ? (
                <div
                  role="alertdialog"
                  aria-label="Batalkan perubahan bagian ini"
                  className="flex flex-wrap items-center justify-between gap-3"
                >
                  <p className="text-sm">
                    Batalkan semua perubahan di bagian{" "}
                    {section.title.toLowerCase()}?
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setDiscarding(false)}
                      className="rounded-lg border px-3 py-2 text-sm"
                    >
                      Kembali
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setValues((previous) => ({
                          ...previous,
                          ...Object.fromEntries(
                            contentFields
                              .filter((field) => field.group === group)
                              .map((field) => [field.key, saved[field.key]]),
                          ),
                        }));
                        setDiscarding(false);
                        setInvalidKey("");
                        setError("");
                        setNotice("");
                      }}
                      className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white"
                    >
                      Ya, batalkan
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-medium">
                      {groupChanges.length ? (
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                      ) : (
                        <Check className="h-4 w-4 text-emerald-500" />
                      )}
                      {groupChanges.length
                        ? `${groupChanges.length} perubahan belum disimpan`
                        : "Tidak ada perubahan baru"}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Hanya bagian {section.title.toLowerCase()} yang akan
                      disimpan.
                      {dirtyFields.length > groupChanges.length
                        ? " Bagian lain masih memiliki perubahan."
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={saving || !groupChanges.length}
                      onClick={() => setDiscarding(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-40 dark:hover:bg-slate-800"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Batalkan
                    </button>
                    <button
                      type="submit"
                      disabled={saving || !groupChanges.length}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {saving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      {saving ? "Menyimpan…" : "Simpan bagian ini"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
