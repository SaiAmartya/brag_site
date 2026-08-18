"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Created on submit, not on render, so this page prerenders without
    // Supabase environment variables present at build time.
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Check your email for the magic link!" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-void flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-carbon border border-steel p-8 rounded-lg"
        >
          <h1 className="text-2xl font-display text-bone mb-6 text-center">Admin Access</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-mono text-ash mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-void border border-steel rounded px-4 py-3 text-bone focus:outline-none focus:border-electric transition-colors"
                placeholder="email@example.com"
                required
              />
            </div>

            {message && (
              <div
                className={`p-3 rounded text-sm ${
                  message.type === "success"
                    ? "bg-matrix/10 text-matrix border border-matrix/20"
                    : "bg-coral/10 text-coral border border-coral/20"
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Magic Link"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
