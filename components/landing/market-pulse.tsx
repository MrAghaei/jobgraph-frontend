import { SectionShell } from "@/components/landing/section-shell";
import { formatFaNumber, marketStats } from "@/lib/landing-data";

export function MarketPulse() {
  const maxShare = Math.max(...marketStats.topSkills.map((s) => s.share));

  return (
    <SectionShell
      id="market"
      tone="muted"
      className="bg-primary dark:bg-primary/30"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="max-w-lg text-balance text-3xl font-semibold tracking-tight text-primary-foreground md:text-4xl">
              نبض بازار، نه شعار بازاریابی
            </h2>
            <p className="max-w-prose text-pretty text-base leading-7 text-primary-foreground/75">
              تعداد آگهی‌های فعال، مهارت‌های پرتقاضا و سهم دورکاری — داده‌ای که
              به انتخاب شغل بعدی‌تان کمک می‌کند.
            </p>
          </div>

          <dl className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-1">
              <dt className="text-sm text-primary-foreground/75">آگهی فعال</dt>
              <dd className="font-mono text-3xl font-medium tracking-tight text-primary-foreground">
                {formatFaNumber(marketStats.activeJobs)}
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-sm text-primary-foreground/75">جدید امروز</dt>
              <dd className="font-mono text-3xl font-medium tracking-tight text-primary-foreground">
                {formatFaNumber(marketStats.newToday)}
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-sm text-primary-foreground/75">
                سهم دورکاری
              </dt>
              <dd className="font-mono text-3xl font-medium tracking-tight text-primary-foreground">
                {formatFaNumber(marketStats.remoteShare)}٪
              </dd>
            </div>
          </dl>

          <p className="font-mono text-xs text-primary-foreground/60">
            آخرین به‌روزرسانی · {formatFaNumber(marketStats.updatedMinutesAgo)}{" "}
            دقیقه پیش
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 md:p-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                پرتقاضاترین مهارت‌ها
              </p>
              <p className="text-xs text-muted-foreground">۳۰ روز گذشته</p>
            </div>
          </div>

          <ul className="space-y-4" aria-label="نمودار مهارت‌های پرتقاضا">
            {marketStats.topSkills.map((skill) => (
              <li key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-foreground">
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {formatFaNumber(skill.share)}٪
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-foreground transition-[width] duration-500 ease-out motion-reduce:transition-none"
                    style={{ width: `${(skill.share / maxShare) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
