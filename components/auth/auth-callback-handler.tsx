"use client";

import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { refreshSession } from "@/lib/api-client";
import { useAuthStore, type User } from "@/store/use-auth-store";

function AuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function completeAuth() {
      const redirectTo = searchParams.get("redirect") ?? "/jobs";
      const accessToken = searchParams.get("accessToken");
      const userParam = searchParams.get("user");

      try {
        if (accessToken && userParam) {
          const user = JSON.parse(decodeURIComponent(userParam)) as User;
          setAuth(user, accessToken);
          if (!cancelled) router.replace(redirectTo);
          return;
        }

        const refreshed = await refreshSession();
        if (cancelled) return;

        if (refreshed) {
          router.replace(redirectTo);
        } else {
          setError("ورود با Google ناموفق بود. دوباره تلاش کنید.");
        }
      } catch {
        if (!cancelled) {
          setError("ورود با Google ناموفق بود. دوباره تلاش کنید.");
        }
      }
    }

    void completeAuth();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams, setAuth]);

  if (error) {
    return (
      <div className="space-y-4 text-center">
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
        <a
          href="/login"
          className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
        >
          بازگشت به ورود
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">در حال تکمیل ورود...</p>
    </div>
  );
}

export function AuthCallbackContent() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-8">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <AuthCallbackHandler />
    </Suspense>
  );
}
