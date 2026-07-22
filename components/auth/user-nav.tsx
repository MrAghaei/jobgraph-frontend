"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { logout } from "@/lib/api-client";
import { useAuthStore } from "@/store/use-auth-store";
import { cn } from "@/lib/utils";

function getInitials(name?: string, email?: string): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  if (email) {
    return email.slice(0, 2).toUpperCase();
  }
  return "JG";
}

export function UserNav() {
  const router = useRouter();
  const { user, isAuthenticated, isInitializing } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (isInitializing) {
    return (
      <div
        className="size-8 animate-pulse rounded-full bg-muted"
        aria-hidden="true"
      />
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <ButtonLink variant="ghost" size="sm" href="/login">
        ورود
      </ButtonLink>
    );
  }

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await logout();
      setMenuOpen(false);
      router.push("/");
    } finally {
      setIsLoggingOut(false);
    }
  }

  const initials = getInitials(user.name, user.email);

  return (
    <div className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-label="منوی کاربر"
        className={cn(
          "flex size-8 items-center justify-center rounded-full border border-border bg-secondary text-xs font-semibold text-secondary-foreground transition-colors hover:bg-muted",
          menuOpen && "ring-3 ring-ring/30",
        )}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {initials}
      </button>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label="بستن منو"
            onClick={() => setMenuOpen(false)}
          />
          <div
            role="menu"
            className="absolute end-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-sm"
          >
            <div className="border-b border-border px-3 py-2">
              <p className="truncate text-sm font-medium text-foreground">
                {user.name ?? user.email}
              </p>
              {user.name ? (
                <p className="truncate text-xs text-muted-foreground" dir="ltr">
                  {user.email}
                </p>
              ) : null}
            </div>

            <Link
              role="menuitem"
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
              onClick={() => setMenuOpen(false)}
            >
              <User className="size-4" />
              پروفایل
            </Link>

            <Link
              role="menuitem"
              href="/pro/analytics"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
              onClick={() => setMenuOpen(false)}
            >
              {user.isPro ? "اشتراک پرو" : "ارتقا به پرو"}
            </Link>

            <button
              type="button"
              role="menuitem"
              disabled={isLoggingOut}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
              onClick={() => void handleLogout()}
            >
              <LogOut className="size-4" />
              {isLoggingOut ? "در حال خروج..." : "خروج"}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
