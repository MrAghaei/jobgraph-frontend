import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { PricingActions } from "@/components/billing/pricing-actions";

export const metadata = {
  title: "پلن پرو — جاب‌گراف",
};

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl space-y-6 rounded-xl border border-border bg-card p-8">
          <h1 className="text-3xl font-semibold tracking-tight">پلن پرو</h1>
          <p className="text-sm leading-7 text-muted-foreground">
            هشدار تلگرام، خلاصه ایمیل، جستجوی ذخیره‌شده و تحلیل عمیق بازار.
          </p>
          <p className="font-mono text-2xl font-semibold">۹۹۰٬۰۰۰ ریال / ماه</p>
          <PricingActions />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
