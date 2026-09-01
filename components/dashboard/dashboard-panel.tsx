"use client";

import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  addAlert,
  createSavedSearch,
  deleteSavedSearch,
  fetchBillingSubscription,
  fetchSavedSearches,
  fetchTelegramLink,
  requestZarinpalPayment,
} from "@/lib/jobs-api";
import { useAuthStore } from "@/store/use-auth-store";

export function DashboardPanel() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const [name, setName] = useState("جستجوی من");
  const [keyword, setKeyword] = useState("");

  const billing = useQuery({
    queryKey: ["billing"],
    queryFn: fetchBillingSubscription,
  });
  const searches = useQuery({
    queryKey: ["saved-searches"],
    queryFn: fetchSavedSearches,
    enabled: Boolean(user?.isPro),
  });
  const telegram = useQuery({
    queryKey: ["telegram-link"],
    queryFn: fetchTelegramLink,
    enabled: Boolean(user?.isPro),
  });

  const createSearch = useMutation({
    mutationFn: () =>
      createSavedSearch({
        name,
        keyword: keyword || undefined,
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["saved-searches"] });
    },
  });

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    await createSearch.mutateAsync();
  }

  async function goPro() {
    const { url } = await requestZarinpalPayment();
    window.location.href = url;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-lg font-semibold">اشتراک</h2>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          وضعیت: {billing.data?.status ?? (user?.isPro ? "active" : "none")}
          {billing.data?.periodEnd
            ? ` · تا ${new Date(billing.data.periodEnd).toLocaleDateString("fa-IR")}`
            : ""}
        </p>
        {!user?.isPro ? (
          <Button className="mt-4" type="button" onClick={() => void goPro()}>
            ارتقا با زرین‌پال
          </Button>
        ) : null}
      </section>

      {user?.isPro ? (
        <>
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">جستجوهای ذخیره‌شده</h2>
            <form className="flex flex-col gap-3 sm:flex-row" onSubmit={onCreate}>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام"
                required
              />
              <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="کلمه کلیدی"
              />
              <Button type="submit" disabled={createSearch.isPending}>
                ذخیره
              </Button>
            </form>
            <ul className="divide-y divide-border rounded-xl border border-border bg-card">
              {(searches.data ?? []).map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {item.keyword ?? "بدون کلمه کلیدی"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        void addAlert(item.id, "TELEGRAM", "INSTANT").then(() =>
                          queryClient.invalidateQueries({
                            queryKey: ["saved-searches"],
                          }),
                        )
                      }
                    >
                      تلگرام فوری
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        void addAlert(item.id, "EMAIL", "DAILY").then(() =>
                          queryClient.invalidateQueries({
                            queryKey: ["saved-searches"],
                          }),
                        )
                      }
                    >
                      ایمیل روزانه
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        void deleteSavedSearch(item.id).then(() =>
                          queryClient.invalidateQueries({
                            queryKey: ["saved-searches"],
                          }),
                        )
                      }
                    >
                      حذف
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold">اتصال تلگرام</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {telegram.data?.verified
                ? "بات متصل است."
                : "با لینک زیر بات را استارت کنید."}
            </p>
            {telegram.data?.url ? (
              <a
                className="mt-4 inline-flex h-9 items-center rounded-4xl bg-primary px-3 text-sm text-primary-foreground"
                href={telegram.data.url}
                target="_blank"
                rel="noreferrer"
              >
                اتصال بات
              </a>
            ) : (
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                TELEGRAM_BOT_USERNAME تنظیم نشده است.
              </p>
            )}
          </section>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          جستجوهای ذخیره‌شده و هشدارها بعد از ارتقا به پرو فعال می‌شوند.
        </p>
      )}
    </div>
  );
}
