"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, RefreshCw } from "lucide-react";
import {
  analyticsApi,
  AnalyticsStatsResponse,
  DailyStat,
} from "@/lib/api/analytics";

const colors = ["#2563eb", "#14b8a6", "#818cf8", "#f59e0b", "#94a3b8"];
const card =
  "min-w-0 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5";
const number = (value: number) => value.toLocaleString("id-ID");
const empty = (
  <div className="flex h-40 items-center justify-center text-xs text-slate-400">
    Belum ada data pada periode ini.
  </div>
);

function TrafficChart({ days }: { days: DailyStat[] }) {
  if (!days.some((day) => day.pageViews > 0 || day.uniqueVisitors > 0))
    return empty;
  const left = 38,
    right = 698,
    top = 12,
    bottom = 155;
  const max = Math.max(
    4,
    ...days.flatMap((day) => [day.pageViews, day.uniqueVisitors]),
  );
  const ceiling = Math.ceil(max / 4) * 4;
  const x = (index: number) =>
    days.length === 1
      ? (left + right) / 2
      : left + (index * (right - left)) / (days.length - 1);
  const y = (value: number) => bottom - (value / ceiling) * (bottom - top);
  const line = (key: "pageViews" | "uniqueVisitors") =>
    days
      .map((day, index) => `${index ? "L" : "M"}${x(index)},${y(day[key])}`)
      .join(" ");
  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 720 184"
        role="img"
        aria-label="Grafik harian kunjungan halaman dan pengunjung unik"
        className="h-auto max-h-56 w-full min-w-[560px] text-slate-400"
      >
        <title>Tren kunjungan harian</title>
        <desc>
          {days
            .map(
              (day) =>
                `${day.label}: ${day.pageViews} kunjungan dan ${day.uniqueVisitors} pengunjung unik`,
            )
            .join("; ")}
        </desc>
        {[0, 1, 2, 3, 4].map((index) => {
          const value = (ceiling * index) / 4;
          return (
            <g key={index}>
              <line
                x1={left}
                x2={right}
                y1={y(value)}
                y2={y(value)}
                stroke="currentColor"
                strokeOpacity="0.15"
                strokeDasharray="3 4"
              />
              <text
                x={left - 10}
                y={y(value) + 3}
                textAnchor="end"
                fill="currentColor"
                fontSize="12"
              >
                {number(value)}
              </text>
            </g>
          );
        })}
        <path
          d={`${line("pageViews")} L${x(days.length - 1)},${bottom} L${x(0)},${bottom} Z`}
          fill="#2563eb"
          fillOpacity="0.06"
        />
        <path
          d={line("pageViews")}
          fill="none"
          stroke={colors[0]}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d={line("uniqueVisitors")}
          fill="none"
          stroke={colors[1]}
          strokeWidth="2.5"
          strokeDasharray="5 3"
          strokeLinejoin="round"
        />
        {days.map((day, index) => (
          <g
            key={day.date}
            tabIndex={0}
            aria-label={`${day.label}: ${day.pageViews} kunjungan, ${day.uniqueVisitors} pengunjung unik`}
          >
            <title>{`${day.label}: ${number(day.pageViews)} kunjungan · ${number(day.uniqueVisitors)} pengunjung unik`}</title>
            <circle
              cx={x(index)}
              cy={y(day.pageViews)}
              r="3"
              fill={colors[0]}
            />
            <circle
              cx={x(index)}
              cy={y(day.uniqueVisitors)}
              r="2.5"
              fill={colors[1]}
            />
            {(index % Math.max(1, Math.ceil(days.length / 7)) === 0 ||
              index === days.length - 1) && (
              <text
                x={x(index)}
                y="178"
                textAnchor="middle"
                fill="currentColor"
                fontSize="11"
              >
                {day.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

type BarItem = { label: string; count: number };
function BarChart({
  items,
  label,
  color = colors[0],
}: {
  items: BarItem[];
  label: string;
  color?: string;
}) {
  const maximum = Math.max(0, ...items.map((item) => item.count));
  if (!maximum) return empty;
  return (
    <div
      role="img"
      aria-label={`${label}: ${items.map((item) => `${item.label}, ${number(item.count)}`).join("; ")}`}
      className="flex min-h-40 flex-col justify-center gap-3.5 py-2"
    >
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
            <span
              title={item.label}
              className="min-w-0 truncate text-slate-600 dark:text-slate-300"
            >
              {item.label}
            </span>
            <span className="shrink-0 font-semibold tabular-nums text-slate-800 dark:text-slate-100">
              {number(item.count)}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(item.count / maximum) * 100}%`,
                backgroundColor: color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function DeviceChart({
  items,
}: {
  items: AnalyticsStatsResponse["deviceStats"];
}) {
  const total = items.reduce((sum, item) => sum + item.count, 0);
  if (!total) return empty;
  let offset = 0;
  const labels: Record<string, string> = {
    Desktop: "Desktop",
    Mobile: "Ponsel",
    Tablet: "Tablet",
  };
  return (
    <div className="flex min-h-40 flex-wrap items-center justify-center gap-5 py-2">
      <svg
        viewBox="0 0 144 144"
        role="img"
        aria-label="Distribusi perangkat pengunjung"
        className="h-32 w-32 shrink-0"
      >
        <title>Perangkat pengunjung</title>
        <circle
          cx="72"
          cy="72"
          r="54"
          fill="none"
          stroke="currentColor"
          strokeWidth="17"
          className="text-slate-100 dark:text-slate-800"
        />
        {items.map((item, index) => {
          const percentage = (item.count / total) * 100;
          const start = offset;
          offset += percentage;
          return (
            <circle
              key={item.device}
              tabIndex={0}
              cx="72"
              cy="72"
              r="54"
              pathLength="100"
              fill="none"
              stroke={colors[index % colors.length]}
              strokeWidth="17"
              strokeDasharray={`${percentage} ${100 - percentage}`}
              strokeDashoffset={-start}
              transform="rotate(-90 72 72)"
              aria-label={`${labels[item.device] || item.device}: ${number(item.count)} kunjungan, ${Math.round(percentage)} persen`}
            >
              <title>{`${labels[item.device] || item.device}: ${number(item.count)} (${Math.round(percentage)}%)`}</title>
            </circle>
          );
        })}
        <text
          x="72"
          y="72"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
          fontSize="21"
          fontWeight="700"
          className="text-slate-800 dark:text-slate-100"
        >
          {number(total)}
        </text>
        <text
          x="72"
          y="91"
          textAnchor="middle"
          fill="currentColor"
          fontSize="9"
          className="text-slate-400"
        >
          kunjungan
        </text>
      </svg>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={item.device} className="flex items-center gap-2 text-xs">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-slate-500 dark:text-slate-400">
              {labels[item.device] || item.device}
            </span>
            <span className="ml-auto pl-2 font-semibold tabular-nums">
              {Math.round((item.count / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AnalyticsDashboard() {
  const [period, setPeriod] = useState<"today" | "7d" | "30d">("7d");
  const [data, setData] = useState<AnalyticsStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const requestId = useRef(0);

  const loadStats = useCallback(
    async (selectedPeriod: "today" | "7d" | "30d") => {
      const currentRequest = ++requestId.current;
      setLoading(true);
      setError("");
      setData(null);
      try {
        const result = await analyticsApi.getStats(selectedPeriod);
        if (currentRequest === requestId.current) setData(result);
      } catch {
        if (currentRequest === requestId.current)
          setError("Analitik belum dapat dimuat. Coba lagi.");
      } finally {
        if (currentRequest === requestId.current) setLoading(false);
      }
    },
    [],
  );
  useEffect(() => {
    void loadStats(period);
    return () => {
      requestId.current++;
    };
  }, [period, loadStats]);

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Analitik</h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Ringkasan kunjungan website Pandai.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            aria-label="Periode analitik"
            className="flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900"
          >
            {(
              [
                ["today", "Hari ini"],
                ["7d", "7 hari"],
                ["30d", "30 hari"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={period === value}
                onClick={() => setPeriod(value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${period === value ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300" : "text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Muat ulang analitik"
            title="Muat ulang"
            disabled={loading}
            onClick={() => void loadStats(period)}
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </header>
      {error ? (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={() => void loadStats(period)}
            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white"
          >
            Coba lagi
          </button>
        </div>
      ) : loading ? (
        <div
          role="status"
          className={`${card} flex h-64 items-center justify-center gap-2 text-sm text-slate-500`}
        >
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
          Memuat grafik…
        </div>
      ) : data ? (
        <>
          <section className={card} aria-labelledby="traffic-title">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 id="traffic-title" className="text-sm font-semibold">
                Tren kunjungan
              </h2>
              <div className="flex flex-wrap gap-4 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  Kunjungan{" "}
                  <strong className="font-semibold text-slate-700 dark:text-slate-200">
                    {number(data.summary.totalViews)}
                  </strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-teal-500" />
                  Pengunjung unik{" "}
                  <strong className="font-semibold text-slate-700 dark:text-slate-200">
                    {number(data.summary.uniqueVisitors)}
                  </strong>
                </span>
              </div>
            </div>
            <TrafficChart days={data.dailyStats} />
          </section>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <section className={card} aria-labelledby="pages-title">
              <h2 id="pages-title" className="mb-2 text-sm font-semibold">
                Halaman populer
              </h2>
              <BarChart
                label="Grafik kunjungan lima halaman terpopuler"
                items={data.topPages
                  .slice(0, 5)
                  .map((item) => ({ label: item.path, count: item.views }))}
              />
            </section>
            <section className={card} aria-labelledby="devices-title">
              <h2 id="devices-title" className="mb-2 text-sm font-semibold">
                Perangkat
              </h2>
              <DeviceChart items={data.deviceStats} />
            </section>
            <section
              className={`${card} md:col-span-2 xl:col-span-1`}
              aria-labelledby="sources-title"
            >
              <h2 id="sources-title" className="mb-2 text-sm font-semibold">
                Sumber trafik
              </h2>
              <BarChart
                label="Grafik kunjungan lima sumber trafik terbanyak"
                color={colors[1]}
                items={data.referrerStats
                  .slice(0, 5)
                  .map((item) => ({ label: item.source, count: item.count }))}
              />
            </section>
          </div>
        </>
      ) : (
        <div role="status" className={card}>
          Data analitik belum tersedia.
        </div>
      )}
    </div>
  );
}
