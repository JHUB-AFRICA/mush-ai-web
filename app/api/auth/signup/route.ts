import { handleError, ok, readJson } from "@/lib/api";
import { createUser } from "@/lib/auth/users";

/**
 * POST /api/auth/signup — create a new account.
 *
 * Intentionally exposes no login handler; auth is handled elsewhere.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await readJson(request);
    const user = await createUser({
      name: body.name,
      email: body.email,
      password: body.password,
      phone: body.phone,
    });

    return ok({ user }, 201);
  } catch (error) {
    return handleError(error);
  }
}
