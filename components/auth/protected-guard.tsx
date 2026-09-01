"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { loginUrlWithRedirect } from "@/lib/auth-routes";
import { useAuthStore } from "@/store/use-auth-store";

function AuthLoadingSkeleton() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="w-full max-w-lg space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="h-32 animate-pulse rounded-xl bg-muted" />
          <div className="h-32 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}

function ProUpgradeBanner() {
  return (
    <div className="mx-auto max-w-lg space-y-4 rounded-xl border border-border bg-card p-6 text-center">
      <h2 className="text-xl font-semibold tracking-tight">پلن پرو</h2>
      <p className="text-sm leading-6 text-muted-foreground">
        برای دسترسی به این بخش به اشتراک پرو نیاز دارید. هشدار تلگرام،
        خلاصه ایمیل و تحلیل عمیق‌تر بازار.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <ButtonLink href="/pricing">ارتقا به پرو</ButtonLink>
        <ButtonLink variant="outline" href="/jobs">
          بازگشت به آگهی‌ها
        </ButtonLink>
      </div>
    </div>
  );
}

interface ProtectedGuardProps {
  children: React.ReactNode;
  requirePro?: boolean;
}

export function ProtectedGuard({
  children,
  requirePro = false,
}: ProtectedGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isInitializing, user } = useAuthStore();

  useEffect(() => {
    if (isInitializing) return;
    if (!isAuthenticated && typeof window !== "undefined") {
      router.replace(loginUrlWithRedirect(window.location.pathname));
    }
  }, [isAuthenticated, isInitializing, router]);

  if (isInitializing) {
    return <AuthLoadingSkeleton />;
  }

  if (!isAuthenticated) {
    return <AuthLoadingSkeleton />;
  }

  if (requirePro && !user?.isPro) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <ProUpgradeBanner />
      </div>
    );
  }

  return children;
}
