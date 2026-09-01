"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchBasicAnalytics } from "@/lib/jobs-api";
import { formatFaNumber } from "@/lib/landing-data";

export function PublicAnalyticsView() {
  const query = useQuery({
    queryKey: ["analytics-basic"],
    queryFn: fetchBasicAnalytics,
  });

  if (query.isLoading) {
    return (
      <p className="font-mono text-sm text-muted-foreground">در حال بارگذاری…</p>
    );
  }

  if (query.isError || !query.data) {
    return (
      <p className="text-sm text-destructive">بارگذاری شاخص‌ها ناموفق بود.</p>
    );
  }

  const { activeJobsLast30Days, topTechnologies, generatedAt } = query.data;
  const chartData = topTechnologies.map((item) => ({
    name: item.name,
    count: item.count,
  }));

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">آگهی فعال ۳۰ روز</p>
          <p className="mt-2 font-mono text-2xl font-semibold">
            {formatFaNumber(activeJobsLast30Days)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">به‌روزرسانی</p>
          <p className="mt-2 font-mono text-sm">
            {new Date(generatedAt).toLocaleString("fa-IR")}
          </p>
        </div>
      </div>

      <div className="h-80 rounded-xl border border-border bg-card p-4">
        <p className="mb-4 text-sm font-medium">ده مهارت پرتقاضا</p>
        {chartData.length === 0 ? (
          <p className="text-sm text-muted-foreground">هنوز داده کافی نیست.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                width={90}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Bar dataKey="count" fill="var(--foreground)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
