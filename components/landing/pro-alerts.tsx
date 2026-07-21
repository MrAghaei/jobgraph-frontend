import Link from "next/link";
import { Bell, Mail, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/landing/section-shell";

const proFeatures = [
  {
    icon: Zap,
    title: "هشدار تلگرام",
    description:
      "آگهی منطبق با معیار شما ظرف چند دقیقه پس از انتشار، مستقیم در تلگرام.",
  },
  {
    icon: Mail,
    title: "خلاصه ایمیل",
    description:
      "گزارش روزانه یا هفتگی از آگهی‌های جدید — بدون نیاز به چک کردن مداوم سایت.",
  },
  {
    icon: Bell,
    title: "تحلیل عمیق‌تر",
    description:
      "هم‌رخدادی مهارت‌ها، روند فریم‌ورک‌ها و توزیع حقوق در پلن پرو.",
  },
] as const;

export function ProAlerts() {
  return (
    <SectionShell id="pro">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-6">
          <h2 className="max-w-lg text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            زودتر از بقیه بفهمید
          </h2>
          <p className="max-w-prose text-pretty text-base leading-7 text-muted-foreground">
            جستجوی رایگان برای کشف بازار کافی است. اما وقتی رقابت بالاست،
            چند دقیقه تأخیر می‌تواند همان تفاوت باشد. پلن پرو برای همین
            لحظه‌هاست.
          </p>
          <Button size="lg" className="h-11" render={<Link href="/signup" />}>
            شروع پلن پرو
          </Button>
        </div>

        <ul className="space-y-0 divide-y divide-border rounded-xl border border-border bg-card">
          {proFeatures.map((feature) => (
            <li key={feature.title} className="flex gap-4 p-5 md:p-6">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
                <feature.icon className="size-4" aria-hidden="true" />
              </span>
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
