import { NextRequest } from "next/server";
import { verifyEmailServer } from "@/lib/email-verifier";
import { fail, ok } from "@/lib/api";

/**
 * GET /api/validate-email?email=user@example.com
 *
 * Verifies email format, checks disposable domain blocklist,
 * and performs DNS MX lookup to ensure the domain can receive emails.
 */
export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return fail("Email query parameter is required", 400);
  }

  const result = await verifyEmailServer(email);

  if (!result.isValid) {
    return fail(result.error ?? "Invalid email address", 400, {
      domain: result.domain,
      isValid: false,
    });
  }

  return ok({
    isValid: true,
    domain: result.domain,
    mxFound: result.mxFound ?? true,
  });
}

