import { apiClient } from "@/lib/api-client";

export type WorkType = "REMOTE" | "HYBRID" | "ONSITE";
export type JobStatus = "ACTIVE" | "EXPIRED";

export interface JobCompany {
  id: string;
  name: string;
  website: string | null;
  logoUrl: string | null;
}

export interface JobTag {
  id: string;
  name: string;
  slug: string;
}

export interface JobListItem {
  id: string;
  title: string;
  company: JobCompany;
  location: string | null;
  city: string | null;
  salaryRange: string | null;
  experienceLevel: string | null;
  workType: WorkType | null;
  category: string | null;
  source: string | null;
  sourceUrl: string | null;
  postedAt: string;
  status: JobStatus;
  tags: JobTag[];
}

export interface JobDetail extends JobListItem {
  description: string;
  datePosted: string;
  expiredAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedJobs {
  data: JobListItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface JobFilters {
  categories: { key: string; label: string }[];
  cities: string[];
  workTypes?: WorkType[];
}

export interface JobsQuery {
  search?: string;
  category?: string;
  city?: string;
  workType?: WorkType;
  page?: number;
  limit?: number;
}

export interface BasicAnalytics {
  activeJobsLast30Days: number;
  topTechnologies: { name: string; count: number }[];
  generatedAt: string;
}

export interface CooccurrenceRow {
  tag: string;
  companions: { name: string; percent: number }[];
}

export interface TrendPoint {
  month: string;
  tags: { name: string; share: number }[];
}

export interface SalaryBucket {
  experience: string;
  location: string;
  samples: number;
  p25: number;
  p50: number;
  p75: number;
}

export interface SavedSearch {
  id: string;
  name: string;
  keyword: string | null;
  category: string | null;
  city: string | null;
  workType: WorkType | null;
  experience: string | null;
  alerts: {
    id: string;
    channel: "TELEGRAM" | "EMAIL";
    cadence: "INSTANT" | "DAILY" | "WEEKLY";
    enabled: boolean;
  }[];
}

export interface BillingSubscription {
  userId: string;
  role: string;
  status: string;
  periodStart: string | null;
  periodEnd: string | null;
  gateway: string | null;
  features: string[];
}

function toQuery(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;
    search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export function fetchJobs(query: JobsQuery) {
  return apiClient<PaginatedJobs>(
    `/jobs${toQuery({
      search: query.search,
      category: query.category,
      city: query.city,
      workType: query.workType,
      page: query.page,
      limit: query.limit,
    })}`,
  );
}

export function fetchJobFilters() {
  return apiClient<JobFilters>("/jobs/filters");
}

export function fetchJob(id: string) {
  return apiClient<JobDetail>(`/jobs/${id}`);
}

export function fetchBasicAnalytics() {
  return apiClient<BasicAnalytics>("/analytics/basic");
}

export async function fetchCooccurrence(): Promise<CooccurrenceRow[]> {
  const payload = await apiClient<{ rows: CooccurrenceRow[] }>(
    "/analytics/pro/cooccurrence",
  );
  return payload.rows;
}

export async function fetchTrends(): Promise<TrendPoint[]> {
  const payload = await apiClient<{ months: TrendPoint[] }>(
    "/analytics/pro/trends",
  );
  return payload.months;
}

export async function fetchSalary(): Promise<SalaryBucket[]> {
  const payload = await apiClient<{ buckets: SalaryBucket[] }>(
    "/analytics/pro/salary",
  );
  return payload.buckets;
}

export function fetchBillingSubscription() {
  return apiClient<BillingSubscription>("/billing/subscription");
}

export async function requestZarinpalPayment() {
  const data = await apiClient<{ startUrl: string; authority: string }>(
    "/billing/zarinpal/request",
    { method: "POST" },
  );
  return { url: data.startUrl, authority: data.authority };
}

export function fetchSavedSearches() {
  return apiClient<SavedSearch[]>("/saved-searches");
}

export function createSavedSearch(body: {
  name: string;
  keyword?: string;
  category?: string;
  city?: string;
  workType?: WorkType;
  experience?: string;
}) {
  return apiClient<SavedSearch>("/saved-searches", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function deleteSavedSearch(id: string) {
  return apiClient<{ ok: boolean }>(`/saved-searches/${id}`, {
    method: "DELETE",
  });
}

export function addAlert(
  savedSearchId: string,
  channel: "TELEGRAM" | "EMAIL",
  cadence: "INSTANT" | "DAILY" | "WEEKLY",
) {
  return apiClient(`/saved-searches/${savedSearchId}/alerts`, {
    method: "POST",
    body: JSON.stringify({ channel, cadence }),
  });
}

export async function fetchTelegramLink() {
  const data = await apiClient<{
    connected: boolean;
    deepLink: string | null;
  }>("/telegram/link");
  return {
    url: data.deepLink,
    verified: data.connected,
    token: "",
  };
}
