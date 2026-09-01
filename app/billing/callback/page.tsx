import { Suspense } from "react";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { BillingCallback } from "@/components/billing/billing-callback";

export const metadata = {
  title: "نتیجه پرداخت — جاب‌گراف",
};

export default function BillingCallbackPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <Suspense
          fallback={
            <p className="font-mono text-sm text-muted-foreground">
              در حال بارگذاری…
            </p>
          }
        >
          <BillingCallback />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
