"use client";

import { useState } from "react";
import { Truck, AlertCircle, CheckCircle2 } from "lucide-react";
import type { ShippingDetails } from "@/lib/checkout";
import {
  validateEmail,
  validateKenyanPhone,
  validateKenyanId,
  sanitizeIdInput,
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
    nationalId: "",
    county: "",
    town: "",
    address: "",
    pickupOption: "jkuat",
  });

  const [errors, setErrors] = useState<{
    phone?: string;
    email?: string;
    nationalId?: string;
  }>({});

  const [touched, setTouched] = useState<{
    phone?: boolean;
    email?: boolean;
    nationalId?: boolean;
  }>({});

  const counties = [
    "Nairobi", "Kiambu", "Nakuru", "Mombasa", "Kisumu", "Uasin Gishu",
    "Machakos", "Kajiado", "Meru", "Nyeri", "Other"
  ];

  const handleBlur = (field: "phone" | "email" | "nationalId") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    runValidationFor(field, formData[field]);
  };

  const runValidationFor = (
    field: "phone" | "email" | "nationalId",
    value: string
  ): boolean => {
    let err: string | undefined;

    if (field === "email") {
      const result = validateEmail(value);
      if (!result.isValid) err = result.error;
    } else if (field === "phone") {
      const result = validateKenyanPhone(value);
      if (!result.isValid) err = result.error;
    } else if (field === "nationalId") {
      const result = validateKenyanId(value);
      if (!result.isValid) err = result.error;
    }

    setErrors((prev) => ({ ...prev, [field]: err }));
    return !err;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let sanitizedValue = value;
    if (name === "nationalId") {
      sanitizedValue = sanitizeIdInput(value);
    } else if (name === "phone") {
      sanitizedValue = sanitizePhoneInput(value);
    }

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));

    // If already touched, validate live
    if (name === "phone" || name === "email" || name === "nationalId") {
      if (touched[name]) {
        runValidationFor(name, sanitizedValue);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all validated fields as touched
    setTouched({ phone: true, email: true, nationalId: true });

    const isEmailValid = runValidationFor("email", formData.email);
    const phoneResult = validateKenyanPhone(formData.phone);
    const isIdValid = runValidationFor("nationalId", formData.nationalId);

    if (!phoneResult.isValid) {
      setErrors((prev) => ({ ...prev, phone: phoneResult.error }));
    }

    if (!isEmailValid || !phoneResult.isValid || !isIdValid) {
      return;
    }

    // Pass cleaned and normalized phone number to ensure clean M-Pesa STK push
    onSubmit({
      ...formData,
      phone: phoneResult.normalizedLocal || formData.phone,
    });
  };

  const isIdLengthValid =
    formData.nationalId.length === 8 || formData.nationalId.length === 9;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest p-5 shadow-sm">
        <h2 className="font-headline-sm text-base font-bold text-on-surface mb-4 flex items-center gap-2">
          <Truck size={18} className="text-primary" />
          Customer Identification &amp; Contact
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

          {/* National ID Field */}
          <div className="sm:col-span-2 rounded-xl bg-surface-container-low/60 p-3.5 border border-surface-container-high/60">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-on-surface">
                Kenyan National ID Number *
              </label>
              <span className="text-[11px] font-medium text-on-surface-variant">
                {formData.nationalId.length}/9 digits
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={9}
                name="nationalId"
                value={formData.nationalId}
                onChange={handleChange}
                onBlur={() => handleBlur("nationalId")}
                placeholder="Enter 8 or 9-digit ID number"
                required
                className={`w-full rounded-xl border bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none transition-colors ${
                  touched.nationalId && errors.nationalId
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                    : touched.nationalId && isIdLengthValid
                    ? "border-green-600 focus:border-green-600"
                    : "border-surface-container-high focus:border-primary focus:ring-1 focus:ring-primary"
                }`}
              />
              {touched.nationalId && isIdLengthValid && !errors.nationalId && (
                <CheckCircle2
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 pointer-events-none"
                />
              )}
            </div>

            <p className="mt-1.5 text-[11px] text-on-surface-variant flex items-start gap-1">
              <span>ℹ️</span>
              <span>
                Standard Kenyan IDs have <strong>8 digits</strong>, while newer
                Maisha Namba / UPI cards have <strong>9 digits</strong>. Both are
                fully accepted.
              </span>
            </p>

            {touched.nationalId && errors.nationalId && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium">
                <AlertCircle size={13} />
                {errors.nationalId}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-xs font-medium text-on-surface mb-1">
              Kenyan Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={() => handleBlur("phone")}
              placeholder="07XX XXX XXX or 01XX XXX XXX"
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
                Used for M-Pesa STK push and delivery updates
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-medium text-on-surface mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              placeholder="you@example.com"
              required
              className={`w-full rounded-xl border bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none transition-colors ${
                touched.email && errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200"
                  : "border-surface-container-high focus:border-primary focus:ring-1 focus:ring-primary"
              }`}
            />
            {touched.email && errors.email ? (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                <AlertCircle size={13} />
                {errors.email}
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-on-surface-variant">
                Order confirmation and receipt will be sent here
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest p-5 shadow-sm">
        <h2 className="font-headline-sm text-base font-bold text-on-surface mb-4">
          Collection Method
        </h2>
        <div className="space-y-3">
          <label
            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              formData.pickupOption === "jkuat"
                ? "border-primary bg-primary/5"
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
                Free pickup - Cold chain storage available
              </p>
            </div>
          </label>

          <label
            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              formData.pickupOption === "delivery"
                ? "border-primary bg-primary/5"
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
                Delivery within Nairobi and surrounding areas
              </p>
            </div>
          </label>
        </div>

        <div className="mt-4 pt-4 border-t border-surface-container-high/60">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-on-surface mb-1">
                County *
              </label>
              <select
                name="county"
                value={formData.county}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="">Select County</option>
                {counties.map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </select>
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
                placeholder="e.g. Juja, Westlands, Thika"
                required
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-on-surface mb-1">
                {formData.pickupOption === "delivery"
                  ? "Street / Building / Delivery Address *"
                  : "Pickup Instructions / Additional Notes *"}
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder={
                  formData.pickupOption === "delivery"
                    ? "e.g. Kimathi Way, Block B, Apt 4"
                    : "e.g. Picking up on Friday morning"
                }
                required
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-primary hover:bg-primary-container text-on-primary py-3 text-sm font-bold shadow-md transition-colors"
      >
        Continue to Payment
      </button>
    </form>
  );
}
