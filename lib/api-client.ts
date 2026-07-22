import { isProtectedPath, loginUrlWithRedirect } from "@/lib/auth-routes";
import { API_URL } from "@/lib/env";
import { useAuthStore, type User } from "@/store/use-auth-store";

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public fieldErrors?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

let refreshPromise: Promise<boolean> | null = null;

async function parseErrorResponse(
  response: Response,
): Promise<{ message: string; fieldErrors?: Record<string, string> }> {
  try {
    const data = (await response.json()) as {
      message?: string | string[];
      error?: string;
      errors?: Record<string, string | string[]>;
    };

    if (data.errors) {
      const fieldErrors: Record<string, string> = {};
      for (const [key, value] of Object.entries(data.errors)) {
        fieldErrors[key] = Array.isArray(value) ? value[0] : value;
      }
      const firstError = Object.values(fieldErrors)[0];
      return {
        message: firstError ?? "درخواست ناموفق بود.",
        fieldErrors,
      };
    }

    if (Array.isArray(data.message)) {
      return { message: data.message[0] ?? "درخواست ناموفق بود." };
    }

    return {
      message:
        data.message ?? data.error ?? "درخواست ناموفق بود. دوباره تلاش کنید.",
    };
  } catch {
    return { message: "درخواست ناموفق بود. دوباره تلاش کنید." };
  }
}

export async function refreshSession(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        useAuthStore.getState().clearAuth();
        return false;
      }

      const data = (await response.json()) as AuthResponse;
      useAuthStore.getState().setAuth(data.user, data.accessToken);
      return true;
    } catch {
      useAuthStore.getState().clearAuth();
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

function handleAuthFailure(): never {
  useAuthStore.getState().clearAuth();

  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;
    if (isProtectedPath(pathname)) {
      window.location.href = loginUrlWithRedirect(pathname);
    }
  }

  throw new ApiError(401, "نشست شما منقضی شده است.");
}

export async function apiClient<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const { accessToken } = useAuthStore.getState();
  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const requestInit: RequestInit = {
    ...options,
    headers,
    credentials: "include",
  };

  let response = await fetch(`${API_URL}${path}`, requestInit);

  const isAuthEndpoint =
    path.startsWith("/auth/login") ||
    path.startsWith("/auth/register") ||
    path.startsWith("/auth/refresh");

  if (response.status === 401 && !isAuthEndpoint) {
    const refreshed = await refreshSession();

    if (refreshed) {
      const newToken = useAuthStore.getState().accessToken;
      if (newToken) {
        headers.set("Authorization", `Bearer ${newToken}`);
      }
      response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
        credentials: "include",
      });
    } else {
      handleAuthFailure();
    }
  }

  if (!response.ok) {
    const { message, fieldErrors } = await parseErrorResponse(response);
    throw new ApiError(response.status, message, fieldErrors);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const data = await apiClient<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  useAuthStore.getState().setAuth(data.user, data.accessToken);
  return data;
}

export async function register(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const data = await apiClient<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  useAuthStore.getState().setAuth(data.user, data.accessToken);
  return data;
}

export async function logout(): Promise<void> {
  try {
    await apiClient<void>("/auth/logout", { method: "POST" });
  } finally {
    useAuthStore.getState().clearAuth();
  }
}

export function getGoogleAuthUrl(): string {
  return `${API_URL}/auth/google`;
}
