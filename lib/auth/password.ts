import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

/**
 * Scrypt-based password hashing using Node's built-in crypto — no extra
 * dependency needed. Stored as `scrypt$salt$hash` (all base64url).
 */

const KEY_LENGTH = 64;
const COST = 16384; // N
const BLOCK_SIZE = 8; // r
const PARALLELISM = 1; // p

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const derived = scryptSync(password, salt, KEY_LENGTH, {
    N: COST,
    r: BLOCK_SIZE,
    p: PARALLELISM,
    maxmem: 128 * 1024 * 1024,
  });
  return `scrypt$${salt.toString("base64url")}$${derived.toString("base64url")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;

  const salt = Buffer.from(parts[1], "base64url");
  const expected = Buffer.from(parts[2], "base64url");
  if (salt.length === 0 || expected.length === 0) return false;

  const derived = scryptSync(password, salt, expected.length, {
    N: COST,
    r: BLOCK_SIZE,
    p: PARALLELISM,
    maxmem: 128 * 1024 * 1024,
  });

  return derived.length === expected.length && timingSafeEqual(derived, expected);
}
