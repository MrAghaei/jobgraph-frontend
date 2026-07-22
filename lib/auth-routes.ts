const PROTECTED_PREFIXES = ["/pro", "/dashboard", "/saved-jobs"] as const;

const PUBLIC_EXACT = new Set([
  "/",
  "/login",
  "/signup",
  "/register",
  "/auth/callback",
  "/jobs",
  "/analytics/public",
]);

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function isPublicPath(pathname: string): boolean {
  if (PUBLIC_EXACT.has(pathname)) return true;
  if (pathname.startsWith("/jobs/")) return true;
  return !isProtectedPath(pathname);
}

export function loginUrlWithRedirect(pathname: string): string {
  const redirect = encodeURIComponent(pathname);
  return `/login?redirect=${redirect}`;
}
