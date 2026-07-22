import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui/button-link";

const navItems = [
  { href: "/jobs", label: "آگهی‌ها" },
  { href: "#market", label: "بازار کار" },
  { href: "#pro", label: "پلن پرو" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur-sm supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground"
        >
          جاب‌گراف
        </Link>

        <nav
          aria-label="ناوبری اصلی"
          className="hidden items-center gap-1 md:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink variant="ghost" size="sm" href="/login">
            ورود
          </ButtonLink>
          <ButtonLink size="sm" href="/jobs">
            مشاهده آگهی‌ها
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
