import { queryOne } from "@/lib/db";
import { asString, fail, handleError, isEmail, ok, readJson } from "@/lib/api";
import { verifyEmailServer } from "@/lib/email-verifier";

/**
 * POST /api/newsletter — subscribe an email to the newsletter.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await readJson(request);
    const email = asString(body.email)?.toLowerCase();

    if (!email) {
      return fail("A valid email address is required");
    }

    const emailCheck = await verifyEmailServer(email);
    if (!emailCheck.isValid) {
      return fail(emailCheck.error ?? "A valid email address is required");
    }

    // `ON CONFLICT ... DO UPDATE` keeps this idempotent: subscribing twice
    // is a success, not a duplicate error.
    const row = await queryOne<{ id: string; created_at: Date }>(
      `INSERT INTO newsletter_subscribers (email)
       VALUES ($1)
       ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
       RETURNING id, created_at`,
      [email],
    );

    return ok({ subscribed: true, id: row?.id ?? null }, 201);
  } catch (error) {
    return handleError(error);
  }
}
