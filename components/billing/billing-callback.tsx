"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { refreshSession } from "@/lib/api-client";

export function BillingCallback() {
  const params = useSearchParams();
  const router = useRouter();
  const status = params.get("status");

  useEffect(() => {
    void (async () => {
      await refreshSession();
      router.replace(status === "ok" ? "/dashboard" : "/pricing");
    })();
  }, [router, status]);

  return (
    <p className="font-mono text-sm text-muted-foreground">
      در حال نهایی‌کردن پرداخت…
    </p>
  );
}
