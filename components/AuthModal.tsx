"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, Phone, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthModal({ isOpen, onClose }: any) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({ email: "", password: "", name: "", phone: "" });
  const { login, register } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        await login(formData.email, formData.password);
      } else {
        await register(formData);
      }
      onClose();
    } catch (error: any) {
      alert(error.message || "Authentication failed");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ pointerEvents: 'none' }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl" style={{ pointerEvents: 'auto' }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{mode === "login" ? "Welcome Back" : "Create Account"}</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "register" && (
                  <>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                        <UserIcon className="w-4 h-4" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600"
                >
                  {mode === "login" ? "Login" : "Create Account"}
                </button>
              </form>

              <div className="mt-4 text-center text-sm">
                {mode === "login" ? (
                  <>
                    <p>
                      Don't have an account?{" "}
                      <button onClick={() => setMode("register")} className="text-primary-600 font-semibold">
                        Sign up
                      </button>
                    </p>
                    <p className="mt-2">
                      <a href="/forgot-password" className="text-primary-600 font-semibold">
                        Forgot Password?
                      </a>
                    </p>
                  </>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button onClick={() => setMode("login")} className="text-primary-600 font-semibold">
                      Login
                    </button>
                  </p>
                )}
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">Or continue with</p>
                <div className="grid grid-cols-3 gap-3">
                  <button className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <span className="text-2xl">🔵</span>
                  </button>
                  <button className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <span className="text-2xl">🔴</span>
                  </button>
                  <button className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <span className="text-2xl">⚫</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
