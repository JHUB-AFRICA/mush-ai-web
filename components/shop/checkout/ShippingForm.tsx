"use client";

import { useState } from "react";
import { Truck } from "lucide-react";

interface ShippingFormProps {
  onSubmit: (data: any) => void;
}

export default function ShippingForm({ onSubmit }: ShippingFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    county: "",
    town: "",
    address: "",
    pickupOption: "jkuat" as "jkuat" | "delivery",
  });

  const counties = [
    "Nairobi", "Kiambu", "Nakuru", "Mombasa", "Kisumu", "Uasin Gishu", 
    "Machakos", "Kajiado", "Meru", "Nyeri", "Other"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest p-5 shadow-sm">
        <h2 className="font-headline-sm text-base font-bold text-on-surface mb-4 flex items-center gap-2">
          <Truck size={18} className="text-primary" />
          Contact Information
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
              className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-on-surface mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="07XX XXX XXX"
              required
              className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-on-surface mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-surface-container-high/80 bg-surface-container-lowest p-5 shadow-sm">
        <h2 className="font-headline-sm text-base font-bold text-on-surface mb-4">
          Collection Method
        </h2>
        <div className="space-y-3">
          <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
            formData.pickupOption === "jkuat" 
              ? "border-primary bg-primary/5" 
              : "border-surface-container-high hover:border-primary/40"
          }`}>
            <input
              type="radio"
              name="pickupOption"
              value="jkuat"
              checked={formData.pickupOption === "jkuat"}
              onChange={handleChange}
              className="mt-0.5 accent-primary"
            />
            <div>
              <p className="text-sm font-semibold text-on-surface">Pick up at JKUAT / Juja Innovation Farm</p>
              <p className="text-xs text-on-surface-variant mt-0.5">Free pickup - Cold chain storage available</p>
            </div>
          </label>
          
          <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
            formData.pickupOption === "delivery" 
              ? "border-primary bg-primary/5" 
              : "border-surface-container-high hover:border-primary/40"
          }`}>
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
              <p className="text-xs text-on-surface-variant mt-0.5">Delivery within Nairobi and surrounding areas</p>
            </div>
          </label>
        </div>

        <div className="mt-4 pt-4 border-t border-surface-container-high/60">
          <p className="text-xs text-on-surface-variant mb-3">
            * Even for pickup, please provide your details below
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
                required
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="">Select County</option>
                {counties.map((county) => (
                  <option key={county} value={county}>{county}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-on-surface mb-1">
                Town/Area *
              </label>
              <input
                type="text"
                name="town"
                value={formData.town}
                onChange={handleChange}
                placeholder="e.g., Juja, Westlands"
                required
                className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3 py-2 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-on-surface mb-1">
                Additional Details / ID/Contact for Pickup *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g., ID Number, or any special instructions"
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
