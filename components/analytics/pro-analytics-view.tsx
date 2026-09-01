"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  fetchCooccurrence,
  fetchSalary,
  fetchTrends,
} from "@/lib/jobs-api";
import { formatFaNumber } from "@/lib/landing-data";

export function ProAnalyticsView() {
  const co = useQuery({
    queryKey: ["analytics-co"],
    queryFn: fetchCooccurrence,
  });
  const trends = useQuery({
    queryKey: ["analytics-trends"],
    queryFn: fetchTrends,
  });
  const salary = useQuery({
    queryKey: ["analytics-salary"],
    queryFn: fetchSalary,
  });

  const trendTags = Array.from(
    new Set(
      (trends.data ?? []).flatMap((row) => row.tags.map((t) => t.name)),
    ),
  ).slice(0, 5);
  const trendChart = (trends.data ?? []).map((row) => {
    const point: Record<string, string | number> = { month: row.month };
    for (const tag of trendTags) {
      point[tag] = row.tags.find((t) => t.name === tag)?.share ?? 0;
    }
    return point;
  });

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">هم‌وقوعی مهارت‌ها</h2>
        {co.isLoading ? (
          <p className="font-mono text-sm text-muted-foreground">در حال بارگذاری…</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {(co.data ?? []).map((row) => (
              <div
                key={row.tag}
                className="rounded-xl border border-border bg-card p-4"
              >
                <p className="font-medium">{row.tag}</p>
                <ul className="mt-3 space-y-2">
                  {row.companions.map((pair) => (
                    <li
                      key={pair.name}
                      className="flex justify-between font-mono text-sm"
                    >
                      <span>{pair.name}</span>
                      <span>{formatFaNumber(pair.percent)}٪</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">سهم ماهانه مهارت‌ها</h2>
        <div className="h-80 rounded-xl border border-border bg-card p-4">
          {trendChart.length === 0 ? (
            <p className="text-sm text-muted-foreground">داده روند کافی نیست.</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                {trendTags.map((tag, index) => (
                  <Line
                    key={tag}
                    type="monotone"
                    dataKey={tag}
                    stroke={`var(--chart-${(index % 5) + 1})`}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">توزیع حقوق</h2>
        <div className="h-80 rounded-xl border border-border bg-card p-4">
          {(salary.data ?? []).length === 0 ? (
            <p className="text-sm text-muted-foreground">
              آگهی با حقوق شفاف کافی نیست.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salary.data?.slice(0, 12)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="experience" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="p50" fill="var(--foreground)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>
    </div>
  );
}
