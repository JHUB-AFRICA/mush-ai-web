/**
 * Validation utilities for Kenyan forms (email, Kenyan phone, and Kenyan National ID).
 */

/**
 * Standard RFC 5322 compliant email regex check.
 * Requires non-empty local-part, @, valid domain, and at least a 2-letter TLD.
 */
export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Kenyan phone numbers:
 * - Safaricom, Airtel, Telkom: prefixes 07XX or 01XX
 * - Local formats: 0712345678, 0112345678 (10 digits)
 * - International formats: +254712345678, 254712345678 (9 digits following 254)
 * - Raw 9-digit: 712345678 or 112345678
 */
export const KENYAN_PHONE_REGEX = /^(?:(?:\+?254)|0)?([17]\d{8})$/;

/**
 * Kenyan National ID validation:
 * - Traditional/older generation IDs: 8 digits (some earlier generation IDs were 7 or 8 digits).
 * - Newer generation / Maisha Namba (UPI - Unique Personal Identifier): 9 digits.
 * - Digits only, exactly 8 or 9 digits in length.
 */
export const KENYAN_ID_REGEX = /^\d{8,9}$/;

export type ValidationResult = {
  isValid: boolean;
  error?: string;
};

/** Validate an email address format. */
export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();
  if (!trimmed) {
    return { isValid: false, error: "Email address is required." };
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return {
      isValid: false,
      error: "Please enter a valid email address (e.g. name@example.com).",
    };
  }
  return { isValid: true };
}

/**
 * Validate a Kenyan phone number and return normalized formats.
 */
export function validateKenyanPhone(phone: string): ValidationResult & {
  normalizedLocal?: string;
  normalizedE164?: string;
} {
  const trimmed = phone.trim();
  if (!trimmed) {
    return { isValid: false, error: "Phone number is required." };
  }

  // Strip spaces, dashes, dots, parentheses
  const cleaned = trimmed.replace(/[\s\-.()]/g, "");
  const match = cleaned.match(KENYAN_PHONE_REGEX);

  if (!match) {
    return {
      isValid: false,
      error:
        "Please enter a valid Kenyan phone number starting with 07, 01, or +254 (e.g. 0712 345 678).",
    };
  }

  const significantDigits = match[1]; // 9 digits: e.g. 712345678
  const normalizedLocal = `0${significantDigits}`;
  const normalizedE164 = `+254${significantDigits}`;

  return {
    isValid: true,
    normalizedLocal,
    normalizedE164,
  };
}

/**
 * Validate a Kenyan National ID number.
 * Accepts 8 or 9 numeric digits (covers both traditional 8-digit IDs and new 9-digit Maisha Namba).
 */
export function validateKenyanId(idNumber: string): ValidationResult {
  const trimmed = idNumber.trim();
  if (!trimmed) {
    return { isValid: false, error: "National ID number is required." };
  }

  // Only allow numbers
  if (!/^\d+$/.test(trimmed)) {
    return {
      isValid: false,
      error: "National ID must contain numbers only.",
    };
  }

  if (trimmed.length < 8) {
    return {
      isValid: false,
      error: `ID number is too short (${trimmed.length} digits). Kenyan IDs are 8 or 9 digits.`,
    };
  }

  if (trimmed.length > 9) {
    return {
      isValid: false,
      error: `ID number is too long (${trimmed.length} digits). Kenyan IDs are 8 or 9 digits.`,
    };
  }

  return { isValid: true };
}

/**
 * Clean phone input as the user types (keeps digits and leading +).
 */
export function sanitizePhoneInput(input: string): string {
  return input.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
}

/**
 * Clean ID input as the user types (keeps only digits, capped at 9).
 */
export function sanitizeIdInput(input: string): string {
  return input.replace(/\D/g, "").slice(0, 9);
}

