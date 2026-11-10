import { resolveMx } from "node:dns/promises";
import { EMAIL_REGEX } from "./validation";

/**
 * Common disposable / burner email domains.
 * These domains provide temporary inboxes commonly used to bypass verification.
 */
export const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "sharklasers.com",
  "trashmail.com",
  "trashmail.net",
  "yopmail.com",
  "dispostable.com",
  "getairmail.com",
  "throwawaymail.com",
  "fakeinbox.com",
  "fakemailgenerator.com",
  "temp-mail.org",
  "tempail.com",
  "mohmal.com",
  "generator.email",
  "crazymailing.com",
  "mytemp.email",
]);

/**
 * In-memory cache for validated domains (avoids querying DNS on every single request).
 * Key: domain (e.g. 'gmail.com') -> Value: { isValid: boolean, timestamp: number }
 */
const DOMAIN_CACHE = new Map<string, { isValid: boolean; timestamp: number }>();
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour

export type EmailVerificationResult = {
  isValid: boolean;
  error?: string;
  domain?: string;
  mxFound?: boolean;
};

/**
 * Perform server-side email verification:
 * 1. Syntax check (RFC 5322 regex).
 * 2. Disposable / burner domain blacklist.
 * 3. DNS MX (Mail Exchange) record lookup to verify the domain has active mail servers.
 */
export async function verifyEmailServer(
  email: string,
  timeoutMs = 2500
): Promise<EmailVerificationResult> {
  const trimmed = email.trim().toLowerCase();

  // 1. Syntax check
  if (!trimmed || !EMAIL_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: "Please provide a valid email address (e.g. name@example.com).",
    };
  }

  const atIndex = trimmed.lastIndexOf("@");
  if (atIndex === -1) {
    return { isValid: false, error: "Invalid email address format." };
  }

  const domain = trimmed.slice(atIndex + 1);

  // 2. Disposable domain check
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: false,
      domain,
      error: "Temporary or disposable email addresses are not accepted.",
    };
  }

  // 3. In-memory cache check
  const cached = DOMAIN_CACHE.get(domain);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    if (!cached.isValid) {
      return {
        isValid: false,
        domain,
        error: `The email domain "${domain}" cannot receive emails.`,
      };
    }
    return { isValid: true, domain, mxFound: true };
  }

  // 4. DNS MX lookup with timeout
  try {
    const mxRecordsPromise = resolveMx(domain);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("DNS_TIMEOUT")), timeoutMs)
    );

    const records = await Promise.race([mxRecordsPromise, timeoutPromise]);

    if (!records || records.length === 0) {
      DOMAIN_CACHE.set(domain, { isValid: false, timestamp: Date.now() });
      return {
        isValid: false,
        domain,
        error: `The email domain "${domain}" does not have active mail servers configured to receive emails.`,
      };
    }

    // Success: valid MX records found
    DOMAIN_CACHE.set(domain, { isValid: true, timestamp: Date.now() });
    return {
      isValid: true,
      domain,
      mxFound: true,
    };
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };

    // Standard DNS error codes when domain or MX does not exist
    if (error.code === "ENOTFOUND" || error.code === "ENODATA") {
      DOMAIN_CACHE.set(domain, { isValid: false, timestamp: Date.now() });
      return {
        isValid: false,
        domain,
        error: `The email domain "${domain}" does not exist or has no mail servers configured.`,
      };
    }

    // If DNS timed out or network connectivity prevented reaching the nameserver (e.g. offline dev / sandbox),
    // don't hard block legitimate users due to infrastructure issues; pass syntax check gracefully.
    console.warn(`[email-verifier] DNS check skipped for "${domain}":`, error.code || error.message);
    return {
      isValid: true,
      domain,
      mxFound: false,
    };
  }
}

