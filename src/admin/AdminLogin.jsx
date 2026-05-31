import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ShieldCheck, Lock, Eye, EyeOff, User, Loader2 } from "lucide-react";
import api from "../api/axios";

export default function AdminLogin({ setAuthStatus, triggerNotification }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Backend Login Handler ---
const handleLogin = async (e) => {
  e.preventDefault();
  setAuthError("");
  setIsSubmitting(true);

  try {
    // 1. Apne banaye huye 'api' instance ka use karein (axios ki jagah)
    // URL ab sirf "/auth/login" reh jayega kyunki baseURL interceptor mein set hai
    const res = await api.post("/auth/login", { username, password });

    if (res.data.success) {
      // 2. Backend se jo asli token aa raha hai, use save karein
      const token = res.data.token; 
      
      localStorage.setItem("admin_session_token", token);
      localStorage.setItem("isAdmin", "true");

      // 3. UI update karein
      setAuthStatus(true);
      triggerNotification("स्वागत है, एडमिन पोर्टल में प्रवेश सफल!");
    }
  } catch (err) {
    console.error("Login Error:", err);
    // Backend se aane wala specific error message dikhana
    setAuthError(
      err.response?.data?.message || "सर्वर से कनेक्ट नहीं हो पा रहा।"
    );
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#240a00] via-[#1b0700] to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md border border-white/10 w-full max-w-md rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl mx-auto flex items-center justify-center mb-4 text-amber-400 text-2xl font-bold">
            ॐ
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <ShieldCheck className="text-amber-500" size={24} /> एडमिन पैनल
          </h2>
          <p className="text-gray-400 text-[10px] mt-2 font-black uppercase tracking-[2px]">
            Pandit Ji Vedic Services
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {authError && (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center font-bold"
            >
              {authError}
            </motion.div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-gray-400 ml-1 tracking-widest">
              Username
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-3.5 text-gray-500"
                size={18}
              />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-amber-500 transition-all placeholder:text-gray-600"
                placeholder="Username दर्ज करें"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold text-gray-400 ml-1 tracking-widest">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-3.5 text-gray-500"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-11 text-sm text-white focus:outline-none focus:border-amber-500 transition-all placeholder:text-gray-600"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold py-4 rounded-xl text-sm shadow-xl hover:shadow-amber-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "लॉगिन करें"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
