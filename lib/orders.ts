/**
 * Client-side calls to the order and payment API routes.
 */

import type { ShippingDetails } from "./checkout";

export type CartLineInput = { productId: string; quantity: number };

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type Order = {
  id: string;
  status: string;
  currency: string;
  subtotal: number;
  total: number;
  items: OrderItem[];
  createdAt: string;
};

export type Payment = {
  id: string;
  orderId: string;
  method: "mpesa" | "card";
  status: string;
  amount: number;
  currency: string;
  reference: string;
  createdAt: string;
};

async function post<T>(url: string, payload: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.error ?? `Request to ${url} failed (${res.status})`);
  }
  return data as T;
}

export async function createOrder(input: {
  items: CartLineInput[];
  shipping: ShippingDetails;
  userId?: string;
}): Promise<Order> {
  const data = await post<{ order: Order }>("/api/orders", input);
  return data.order;
}

export async function createPayment(input: {
  orderId: string;
  method: "mpesa" | "card";
  amount: number;
  phone?: string;
}): Promise<Payment> {
  const data = await post<{ payment: Payment }>("/api/payments", input);
  return data.payment;
}
