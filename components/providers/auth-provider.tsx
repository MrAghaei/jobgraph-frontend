"use client";

import { useEffect } from "react";
import { refreshSession } from "@/lib/api-client";
import { useAuthStore } from "@/store/use-auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setInitializing = useAuthStore((state) => state.setInitializing);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        await refreshSession();
      } finally {
        if (!cancelled) {
          setInitializing(false);
        }
      }
    }

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, [setInitializing]);

  return children;
}
