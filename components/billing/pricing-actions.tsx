"use client";

import { Button } from "@/components/ui/button";
import { requestZarinpalPayment } from "@/lib/jobs-api";
import { useAuthStore } from "@/store/use-auth-store";
import { ButtonLink } from "@/components/ui/button-link";

export function PricingActions() {
  const { isAuthenticated, user } = useAuthStore();

  async function goPro() {
    const { url } = await requestZarinpalPayment();
    window.location.href = url;
  }

  if (user?.isPro) {
    return <ButtonLink href="/dashboard">مدیریت اشتراک</ButtonLink>;
  }

  if (!isAuthenticated) {
    return <ButtonLink href="/login?redirect=/pricing">ورود و ارتقا</ButtonLink>;
  }

  return (
    <Button type="button" onClick={() => void goPro()}>
      پرداخت با زرین‌پال
    </Button>
  );
}
