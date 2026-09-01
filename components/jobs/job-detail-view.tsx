"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchJob } from "@/lib/jobs-api";
import { buttonVariants } from "@/components/ui/button";

export function JobDetailView({ id }: { id: string }) {
  const query = useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJob(id),
  });

  if (query.isLoading) {
    return (
      <p className="font-mono text-sm text-muted-foreground">در حال بارگذاری…</p>
    );
  }

  if (query.isError || !query.data) {
    return (
      <p className="text-sm text-destructive">آگهی پیدا نشد یا در دسترس نیست.</p>
    );
  }

  const job = query.data;

  return (
    <article className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          <Link href="/jobs" className="underline-offset-4 hover:underline">
            آگهی‌ها
          </Link>
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{job.title}</h1>
        <p className="text-sm text-muted-foreground">
          {job.company.name}
          {job.location ? ` · ${job.location}` : ""}
        </p>
      </div>

      <dl className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <dt className="text-xs text-muted-foreground">حقوق</dt>
          <dd className="mt-1 font-mono text-sm">{job.salaryRange ?? "—"}</dd>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <dt className="text-xs text-muted-foreground">سابقه</dt>
          <dd className="mt-1 font-mono text-sm">
            {job.experienceLevel ?? "—"}
          </dd>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <dt className="text-xs text-muted-foreground">منبع</dt>
          <dd className="mt-1 font-mono text-sm">{job.source ?? "—"}</dd>
        </div>
      </dl>

      <div className="flex flex-wrap gap-1.5">
        {job.tags.map((tag) => (
          <span
            key={tag.id}
            className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <pre className="whitespace-pre-wrap rounded-xl border border-border bg-card p-5 font-sans text-sm leading-7 text-foreground">
        {job.description}
      </pre>

      {job.sourceUrl ? (
        <a
          href={job.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          مشاهده و ارسال رزومه
        </a>
      ) : null}
    </article>
  );
}
