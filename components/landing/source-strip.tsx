import { sources } from "@/lib/landing-data";

export function SourceStrip() {
  return (
    <div className="border-y border-border bg-secondary/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          داده از منابع اصلی بازار کار ایران جمع‌آوری می‌شود
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {sources.map((source) => (
            <li
              key={source.slug}
              className="text-sm font-medium text-foreground/80"
            >
              {source.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
