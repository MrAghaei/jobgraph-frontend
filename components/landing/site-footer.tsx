import Link from "next/link";

const footerLinks = [
  { href: "/jobs", label: "آگهی‌ها" },
  { href: "#market", label: "بازار کار" },
  { href: "#pro", label: "پلن پرو" },
  { href: "/login", label: "ورود" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-base font-semibold text-foreground">جاب‌گراف</p>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            یک جا برای پیدا کردن آگهی‌های تکنولوژی و خواندن بازار کار ایران.
          </p>
        </div>

        <nav aria-label="پاورقی">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
