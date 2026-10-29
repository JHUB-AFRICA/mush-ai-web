"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(email, password);
    setLoading(false);

    if (success) {
      router.push("/cart");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="font-headline-xl text-2xl sm:text-3xl font-extrabold text-on-surface">
          Sign In
        </h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          Sign in to complete your purchase
        </p>
      </div>

      <div className="rounded-2xl border border-surface-container-high bg-surface-container-lowest p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3.5 py-2.5 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-surface-container-high bg-surface-container-lowest px-3.5 py-2.5 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary hover:bg-primary-container text-on-primary py-2.5 text-sm font-bold shadow-md transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-on-surface-variant">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-primary font-semibold hover:underline">
            Sign up
          </Link>
        </div>
      </div>

      <div className="mt-4 text-center">
        <Link href="/cart" className="text-xs text-on-surface-variant hover:text-primary">
          ← Back to Cart
        </Link>
      </div>
    </div>
  );
}
