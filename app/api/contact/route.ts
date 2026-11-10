import { queryOne } from "@/lib/db";
import { asString, fail, handleError, isEmail, ok, readJson } from "@/lib/api";
import { verifyEmailServer } from "@/lib/email-verifier";

const MAX_MESSAGE_LENGTH = 5000;

/**
 * POST /api/contact — store a message from the contact form.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await readJson(request);

    const name = asString(body.name);
    const email = asString(body.email)?.toLowerCase();
    const subject = asString(body.subject);
    const message = asString(body.message);

    if (!name) return fail("Name is required");
    if (!email) return fail("A valid email address is required");

    const emailCheck = await verifyEmailServer(email);
    if (!emailCheck.isValid) {
      return fail(emailCheck.error ?? "A valid email address is required");
    }

    if (!subject) return fail("Subject is required");
    if (!message) return fail("Message is required");
    if (message.length > MAX_MESSAGE_LENGTH) {
      return fail(`Message must be ${MAX_MESSAGE_LENGTH} characters or fewer`);
    }

    const row = await queryOne<{ id: string }>(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [name, email, subject, message],
    );

    return ok({ received: true, id: row?.id ?? null }, 201);
  } catch (error) {
    return handleError(error);
  }
}
