"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFaNumber } from "@/lib/landing-data";
import {
  fetchJobFilters,
  fetchJobs,
  type WorkType,
} from "@/lib/jobs-api";

const WORK_TYPES: { value: WorkType | ""; label: string }[] = [
  { value: "", label: "همه نوع همکاری" },
  { value: "REMOTE", label: "دورکار" },
  { value: "HYBRID", label: "هیبرید" },
  { value: "ONSITE", label: "حضوری" },
];

function workTypeLabel(value: WorkType | null): string {
  if (value === "REMOTE") return "دورکار";
  if (value === "HYBRID") return "هیبرید";
  if (value === "ONSITE") return "حضوری";
  return "";
}

const selectClass =
  "h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30";

export function JobsBoard() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const search = params.get("q") ?? params.get("search") ?? "";
  const category = params.get("category") ?? "";
  const city = params.get("city") ?? "";
  const workType = (params.get("workType") ?? "") as WorkType | "";
  const page = Math.max(1, Number(params.get("page") ?? 1));

  const filtersQuery = useQuery({
    queryKey: ["job-filters"],
    queryFn: fetchJobFilters,
  });

  const jobsQuery = useQuery({
    queryKey: ["jobs", { search, category, city, workType, page }],
    queryFn: () =>
      fetchJobs({
        search: search || undefined,
        category: category || undefined,
        city: city || undefined,
        workType: workType || undefined,
        page,
        limit: 20,
      }),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "page") next.delete("page");
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  const meta = jobsQuery.data?.meta;
  const jobs = jobsQuery.data?.data ?? [];

  return (
    <div className="space-y-6">
      <form
        role="search"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const q = new FormData(form).get("q");
          setParam("q", typeof q === "string" ? q.trim() : "");
        }}
      >
        <label htmlFor="job-search" className="sr-only">
          جستجوی آگهی
        </label>
        <div className="relative sm:col-span-2 lg:col-span-2">
          <Search
            className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="job-search"
            name="q"
            type="search"
            defaultValue={search}
            placeholder="نقش، شرکت یا مهارت..."
            className="h-11 w-full rounded-xl border border-border bg-background ps-10 pe-4 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
          />
        </div>
        <select
          aria-label="دسته‌بندی"
          className={selectClass}
          value={category}
          onChange={(event) => setParam("category", event.target.value)}
        >
          <option value="">همه دسته‌ها</option>
          {(filtersQuery.data?.categories ?? []).map((item) => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
          ))}
        </select>
        <select
          aria-label="شهر"
          className={selectClass}
          value={city}
          onChange={(event) => setParam("city", event.target.value)}
        >
          <option value="">همه شهرها</option>
          {(filtersQuery.data?.cities ?? []).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <select
            aria-label="نوع همکاری"
            className={`${selectClass} flex-1`}
            value={workType}
            onChange={(event) => setParam("workType", event.target.value)}
          >
            {WORK_TYPES.map((item) => (
              <option key={item.value || "all"} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <Button type="submit" className="h-11 shrink-0">
            جستجو
          </Button>
        </div>
      </form>

      {jobsQuery.isLoading ? (
        <p className="font-mono text-sm text-muted-foreground">در حال بارگذاری…</p>
      ) : jobsQuery.isError ? (
        <p className="text-sm text-destructive">
          بارگذاری آگهی‌ها ناموفق بود. دوباره تلاش کنید.
        </p>
      ) : jobs.length === 0 ? (
        <p className="rounded-xl border border-border bg-card px-4 py-10 text-center text-sm text-muted-foreground">
          آگهی منطبقی پیدا نشد.
        </p>
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border bg-card">
          {jobs.map((job) => (
            <li key={job.id} className="px-4 py-4 sm:px-5">
              <article className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1.5">
                  <h2 className="text-base font-semibold text-foreground">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {job.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {job.company.name}
                    {job.city ? ` · ${job.city}` : ""}
                    {workTypeLabel(job.workType)
                      ? ` · ${workTypeLabel(job.workType)}`
                      : ""}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.tags.slice(0, 6).map((tag) => (
                      <span
                        key={tag.id}
                        className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-start">
                  <p className="font-mono text-sm font-medium text-foreground">
                    {job.salaryRange ?? "—"}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {new Date(job.postedAt).toLocaleDateString("fa-IR")}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      {meta && meta.totalPages > 1 ? (
        <div className="flex items-center justify-between gap-4 text-sm">
          <p className="font-mono text-muted-foreground">
            {formatFaNumber(meta.total)} آگهی · صفحه {formatFaNumber(meta.page)} از{" "}
            {formatFaNumber(meta.totalPages)}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={page <= 1}
              onClick={() => setParam("page", String(page - 1))}
            >
              قبلی
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={page >= meta.totalPages}
              onClick={() => setParam("page", String(page + 1))}
            >
              بعدی
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
