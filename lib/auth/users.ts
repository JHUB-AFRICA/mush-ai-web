import { queryOne } from "@/lib/db";
import { ApiError, asString, isEmail } from "@/lib/api";
import { hashPassword } from "@/lib/auth/password";

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
};

type UserRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  password_hash: string;
};

export function toPublicUser(row: UserRow): PublicUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    ...(row.phone ? { phone: row.phone } : {}),
  };
}

/** Validate the signup payload and persist a new user. */
export async function createUser(input: {
  name: unknown;
  email: unknown;
  password: unknown;
  phone?: unknown;
}): Promise<PublicUser> {
  const name = asString(input.name);
  const email = asString(input.email)?.toLowerCase();
  const password = asString(input.password);
  const phone = asString(input.phone);

  if (!name) throw new ApiError(400, "Name is required");
  if (!email || !isEmail(email)) throw new ApiError(400, "A valid email is required");
  if (!password || password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters");
  }

  const existing = await queryOne("SELECT 1 FROM users WHERE email = $1", [email]);
  if (existing) throw new ApiError(409, "An account with this email already exists");

  const row = await queryOne<UserRow>(
    `INSERT INTO users (name, email, phone, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, phone, password_hash`,
    [name, email, phone, hashPassword(password)],
  );

  if (!row) throw new ApiError(500, "Could not create account");
  return toPublicUser(row);
}
