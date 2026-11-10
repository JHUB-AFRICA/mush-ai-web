/**
 * Shipping details are collected on /checkout but only consumed on /payment,
 * which is a separate page (and therefore a separate React tree). We stash
 * the payload in sessionStorage so it survives that navigation.
 */

export type ShippingDetails = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  county: string;
  town: string;
  address: string;
  pickupOption: "jkuat" | "delivery";
};

const SHIPPING_KEY = "smartmushroom_shipping_v1";

export function saveShipping(shipping: ShippingDetails): void {
  try {
    sessionStorage.setItem(SHIPPING_KEY, JSON.stringify(shipping));
  } catch {
    // storage disabled — the checkout will fail loudly on submit instead
  }
} 

export function loadShipping(): ShippingDetails | null {
  try {
    const raw = sessionStorage.getItem(SHIPPING_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && parsed.firstName) {
      return parsed as ShippingDetails;
    }
  } catch {
    // corrupted payload
  }
  return null;
}

export function clearShipping(): void {
  try {
    sessionStorage.removeItem(SHIPPING_KEY);
  } catch {
  }
}
