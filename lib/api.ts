/** Minimal helpers shared by the API route handlers. */

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** JSON success response. */
export function ok<T>(data: T, status = 200): Response {
  return Response.json(data, { status });
}

/** JSON error response. */
export function fail(message: string, status = 400, extra?: object): Response {
  return Response.json({ error: message, ...extra }, { status });
}

/**
 * Wrap a handler so unexpected failures become a 500 JSON response
 * instead of an unhandled rejection.
 */
export function handleError(error: unknown): Response {
  if (error instanceof ApiError) {
    return fail(error.message, error.status);
  }
  console.error("[api] unhandled error:", error);
  return fail("Internal server error", 500);
}

/** Read and parse a JSON request body, rejecting invalid payloads. */
export async function readJson(request: Request): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    if (body === null || typeof body !== "object" || Array.isArray(body)) {
      throw new ApiError(400, "Request body must be a JSON object");
    }
    return body as Record<string, unknown>;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(400, "Invalid JSON body");
  }
}

/** Coerce an unknown value to a trimmed string, or null. */
export function asString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/** Coerce an unknown value to a finite number, or null. */
export function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

/** Very permissive email shape check — the HTML `type=email` already gates most input. */
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Normalise a Kenyan phone number to `07XXXXXXXX` / `01XXXXXXXX` form. */
export function normalisePhone(value: string): string | null {
  const digits = value.replace(/[^\d]/g, "");
  if (/^0[17]\d{8}$/.test(digits)) return digits;
  if (/^254[17]\d{8}$/.test(digits)) return `0${digits.slice(3)}`;
  if (/^7\d{8}$/.test(digits)) return `0${digits}`;
  if (/^1\d{8}$/.test(digits)) return `0${digits}`;
  return null;
}
