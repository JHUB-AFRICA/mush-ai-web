"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Truck,
  AlertCircle,
  CheckCircle2,
  Loader2,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";
import type { ShippingDetails } from "@/lib/checkout";
import {
  validateEmail,
  validateKenyanPhone,
  sanitizePhoneInput,
} from "@/lib/validation";

interface ShippingFormProps {
  onSubmit: (data: ShippingDetails) => void;
}

export default function ShippingForm({ onSubmit }: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingDetails>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    county: "",
    town: "",
    address: "",
    pickupOption: "jkuat",
  });

  const [errors, setErrors] = useState<{
    phone?: string;
    email?: string;
    county?: string;
    town?: string;
    address?: string;
  }>({});

  const [touched, setTouched] = useState<{
    phone?: boolean;
    email?: boolean;
    county?: boolean;
    town?: boolean;
    address?: boolean;
  }>({});

  const [emailChecking, setEmailChecking] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const counties = [
    "Nairobi", "Kiambu", "Nakuru", "Mombasa", "Kisumu", "Uasin Gishu",
    "Machakos", "Kajiado", "Meru", "Nyeri", "Other"
  ];

  /**
   * Calls the server endpoint /api/validate-email to perform DNS MX
   * and disposable domain checks on the email address.
   */
  const verifyEmailWithServer = async (emailToVerify: string): Promise<boolean> => {
    const syntax = validateEmail(emailToVerify);
    if (!syntax.isValid) {
      setErrors((prev) => ({ ...prev, email: syntax.error }));
      setEmailVerified(false);
      return false;
    }

    setEmailChecking(true);
    try {
      const res = await fetch(
        `/api/validate-email?email=${encodeURIComponent(emailToVerify)}`
      );
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.isValid) {
        const errorMsg =
          data?.error ?? "This email domain does not appear to accept emails.";
        setErrors((prev) => ({ ...prev, email: errorMsg }));
        setEmailVerified(false);
        return false;
      }

      setErrors((prev) => ({ ...prev, email: undefined }));
      setEmailVerified(true);
      return true;
    } catch {
      // In case of network interruption, allow syntax check to pass gracefully
      setErrors((prev) => ({ ...prev, email: undefined }));
      setEmailVerified(true);
      return true;
    } finally {
      setEmailChecking(false);
    }
  };

  const handleBlur = (field: "phone" | "email" | "county" | "town" | "address") => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === "email") {
      const syntax = validateEmail(formData.email);
      if (syntax.isValid) {
        verifyEmailWithServer(formData.email);
      } else {
        setErrors((prev) => ({ ...prev, email: syntax.error }));
        setEmailVerified(false);
      }
    } else {
      runValidationFor(field, formData[field]);
    }
  };

  const runValidationFor = (
    field: "phone" | "email" | "county" | "town" | "address",
    value: string
  ): boolean => {
    let err: string | undefined;

    if (field === "email") {
      const result = validateEmail(value);
      if (!result.isValid) err = result.error;
    } else if (field === "phone") {
      const result = validateKenyanPhone(value);
      if (!result.isValid) err = result.error;
    } else if (field === "county" && formData.pickupOption === "delivery") {
      if (!value.trim()) err = "Please select your delivery county.";
    } else if (field === "town" && formData.pickupOption === "delivery") {
      if (!value.trim()) err = "Please enter your town or delivery area.";
    } else if (field === "address" && formData.pickupOption === "delivery") {
      if (!value.trim()) err = "Please enter your delivery street or building.";
    }

    setErrors((prev) => ({ ...prev, [field]: err }));
    return !err;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let sanitizedValue = value;
    if (name === "phone") {
      sanitizedValue = sanitizePhoneInput(value);
    }

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));

    if (name === "email") {
      setEmailVerified(false);
      if (touched.email) {
        runValidationFor("email", sanitizedValue);
      }
    } else if (name === "phone") {
      if (touched.phone) {
        runValidationFor("phone", sanitizedValue);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      phone: true,
      email: true,
      county: formData.pickupOption === "delivery",
      town: formData.pickupOption === "delivery",
      address: formData.pickupOption === "delivery",
    });

    const phoneResult = validateKenyanPhone(formData.phone);
    if (!phoneResult.isValid) {
      setErrors((prev) => ({ ...prev, phone: phoneResult.error }));
      return;
    }

    // If delivery is chosen, validate destination fields
    if (formData.pickupOption === "delivery") {
      const isCountyValid = runValidationFor("county", formData.county);
      const isTownValid = runValidationFor("town", formData.town);
      const isAddressValid = runValidationFor("address", formData.address);
      if (!isCountyValid || !isTownValid || !isAddressValid) {
        return;
      }
    }

    // Always run DNS MX & disposable domain verification before advancing to payment
    setSubmitting(true);
    const isEmailValid = await verifyEmailWithServer(formData.email);
    setSubmitting(false);

    if (!isEmailValid) {
      return;
    }

    // For JKUAT pickup, automatically set standard pickup hub info
    const finalPayload: ShippingDetails = {
      ...formData,
      phone: phoneResult.normalizedLocal || formData.phone,
      county:
        formData.pickupOption === "jkuat"
          ? "Kiambu"
          : formData.county,
      town:
        formData.pickupOption === "jkuat"
          ? "Juja"
          : formData.town,
      address:
        formData.pickupOption === "jkuat"
          ? "JKUAT Main Campus, Juja Innovation Farm (Collection Point)"
          : formData.address,
    };

    onSubmit(finalPayload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. Customer Contact Details */}
      <div className="rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest p-5 shadow-sm">
        <h2 className="font-headline-sm text-base font-bold text-on-surface mb-4 flex items-center gap-2">
          <Truck size={18} className="text-primary" />
          Customer Information
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-on-surface mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="e.g. Wanjiru"
              className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-on-surface mb-1">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="e.g. Kamau"
              className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-xs font-medium text-on-surface mb-1">
              Phone Number (M-Pesa) *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={() => handleBlur("phone")}
              placeholder="e.g. 0712 345 678"
              required
              className={`w-full rounded-xl border bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none transition-colors ${
                touched.phone && errors.phone
                  ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                  : "border-surface-container-high focus:border-primary focus:ring-1 focus:ring-primary"
              }`}
            />
            {touched.phone && errors.phone ? (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                <AlertCircle size={13} />
                {errors.phone}
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-on-surface-variant">
                Used for M-Pesa STK push and order dispatch updates
              </p>
            )}
          </div>

          {/* Email Field with live DNS validation */}
          <div>
            <label className="block text-xs font-medium text-on-surface mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                placeholder="e.g. name@example.com"
                required
                className={`w-full rounded-xl border bg-surface-container-lowest px-3 py-2 pr-9 text-sm text-on-surface outline-none transition-colors ${
                  touched.email && errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                    : touched.email && emailVerified && !errors.email
                    ? "border-green-600 focus:border-green-600"
                    : "border-surface-container-high focus:border-primary focus:ring-1 focus:ring-primary"
                }`}
              />
              {emailChecking && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                  <Loader2 size={16} className="animate-spin" />
                </span>
              )}
              {!emailChecking && touched.email && emailVerified && !errors.email && (
                <CheckCircle2
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 pointer-events-none"
                />
              )}
            </div>

            {touched.email && errors.email ? (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                <AlertCircle size={13} />
                {errors.email}
              </p>
            ) : emailChecking ? (
              <p className="mt-1 text-[11px] text-primary flex items-center gap-1">
                Verifying email domain validity…
              </p>
            ) : touched.email && emailVerified ? (
              <p className="mt-1 text-[11px] text-green-600 flex items-center gap-1">
                ✓ Valid email domain
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-on-surface-variant">
                Order confirmation and receipt will be sent here
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 2. Collection Method */}
      <div className="rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest p-5 shadow-sm">
        <h2 className="font-headline-sm text-base font-bold text-on-surface mb-4">
          Collection Method
        </h2>
        <div className="space-y-3">
          <label
            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              formData.pickupOption === "jkuat"
                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                : "border-surface-container-high hover:border-primary/40"
            }`}
          >
            <input
              type="radio"
              name="pickupOption"
              value="jkuat"
              checked={formData.pickupOption === "jkuat"}
              onChange={handleChange}
              className="mt-0.5 accent-primary"
            />
            <div>
              <p className="text-sm font-semibold text-on-surface">
                Pick up at JKUAT / Juja Innovation Farm
              </p>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Free collection • Cold chain storage available
              </p>
            </div>
          </label>

          <label
            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              formData.pickupOption === "delivery"
                ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                : "border-surface-container-high hover:border-primary/40"
            }`}
          >
            <input
              type="radio"
              name="pickupOption"
              value="delivery"
              checked={formData.pickupOption === "delivery"}
              onChange={handleChange}
              className="mt-0.5 accent-primary"
            />
            <div>
              <p className="text-sm font-semibold text-on-surface">Delivery</p>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Dispatch to your doorstep within Nairobi, Kiambu, and surrounding areas
              </p>
            </div>
          </label>
        </div>

        {/* Dynamic Section: JKUAT Pickup Info (No redundant inputs required) */}
        {formData.pickupOption === "jkuat" && (
          <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-start gap-3 text-on-surface">
              <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-on-surface">Collection Point:</p>
                <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                  JKUAT Main Campus, Juja Innovation Farm (Department of Agriculture), Juja, Kiambu County
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-on-surface pt-2 border-t border-primary/10">
              <Clock size={18} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-xs text-on-surface">Collection Hours:</p>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Monday – Friday: 8:00 AM – 5:00 PM
                </p>
              </div>
            </div>

            <p className="text-[11px] font-medium text-emerald-800 pt-1">
              ✓ No address needed for pickup. Just present your Order ID or phone number when collecting.
            </p>
          </div>
        )}

        {/* Dynamic Section: Delivery Destination Details (Only when Delivery is chosen) */}
        {formData.pickupOption === "delivery" && (
          <div className="mt-4 pt-4 border-t border-surface-container-high/60 animate-in fade-in duration-200">
            <p className="text-xs font-semibold text-on-surface mb-3">
              Delivery Destination
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  County *
                </label>
                <select
                  name="county"
                  value={formData.county}
                  onChange={handleChange}
                  onBlur={() => handleBlur("county")}
                  required
                  className={`w-full rounded-xl border bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none transition-colors ${
                    touched.county && errors.county
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                      : "border-surface-container-high focus:border-primary focus:ring-1 focus:ring-primary"
                  }`}
                >
                  <option value="">Select County</option>
                  {counties.map((county) => (
                    <option key={county} value={county}>
                      {county}
                    </option>
                  ))}
                </select>
                {touched.county && errors.county && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                    <AlertCircle size={13} />
                    {errors.county}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-on-surface mb-1">
                  Town / Area *
                </label>
                <input
                  type="text"
                  name="town"
                  value={formData.town}
                  onChange={handleChange}
                  onBlur={() => handleBlur("town")}
                  placeholder="e.g. Westlands, Kilimani, Juja, Thika"
                  required
                  className={`w-full rounded-xl border bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none transition-colors ${
                    touched.town && errors.town
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                      : "border-surface-container-high focus:border-primary focus:ring-1 focus:ring-primary"
                  }`}
                />
                {touched.town && errors.town && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                    <AlertCircle size={13} />
                    {errors.town}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-on-surface mb-1">
                  Street / Building / House Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={() => handleBlur("address")}
                  placeholder="e.g. Kimathi Way, Eagle Plaza, 2nd Floor, Apt 4B"
                  required
                  className={`w-full rounded-xl border bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none transition-colors ${
                    touched.address && errors.address
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                      : "border-surface-container-high focus:border-primary focus:ring-1 focus:ring-primary"
                  }`}
                />
                {touched.address && errors.address && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                    <AlertCircle size={13} />
                    {errors.address}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Return Policy Notice */}
      <div className="rounded-2xl border border-surface-container-high/80 bg-surface-container-low/60 p-4 text-xs text-on-surface-variant space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-on-surface text-sm">
          <ShieldCheck size={16} className="text-primary" />
          <span>Buyer Protection &amp; Return Policy</span>
        </div>
        <p className="text-[11px] leading-relaxed text-on-surface-variant">
          Fresh mushrooms and live spawn can be reported within 24–48 hours of collection or delivery if damaged. Approved refunds are credited directly to your M-Pesa number. By continuing, you agree to SmartMushroom’s{" "}
          <Link
            href="/terms"
            target="_blank"
            className="text-primary font-semibold underline hover:text-primary-container"
          >
            Terms of Service &amp; Return Policy
          </Link>.
        </p>
      </div>

      {/* 4. Submit Button */}
      <button
        type="submit"
        disabled={submitting || emailChecking}
        className="w-full rounded-xl bg-primary hover:bg-primary-container text-on-primary py-3 text-sm font-bold shadow-md transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Verifying Details…</span>
          </>
        ) : (
          "Continue to Payment"
        )}
      </button>
    </form>
  );
}
