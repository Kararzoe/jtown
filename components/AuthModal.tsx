"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, Phone, User as UserIcon, KeyRound } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthModal({ isOpen, onClose }: any) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [step, setStep] = useState<"credentials" | "verify">("credentials");
  const [formData, setFormData] = useState({ email: "", password: "", name: "", phone: "", code: "" });
  const { register, sendLoginCode, verifyLoginCode, verifySignup } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        if (step === "credentials") {
          await sendLoginCode(formData.email);
          setStep("verify");
        } else {
          await verifyLoginCode(formData.email, formData.code);
          resetAndClose();
        }
      } else {
        if (step === "credentials") {
          const res = await register(formData);
          if (res.requiresVerification) {
            setStep("verify");
          } else {
            resetAndClose();
          }
        } else {
          await verifySignup(formData.email, formData.code);
          resetAndClose();
        }
      }
    } catch (error: any) {
      alert(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    onClose();
    setStep("credentials");
    setFormData({ email: "", password: "", name: "", phone: "", code: "" });
  };

  const handleBack = () => {
    setStep("credentials");
    setFormData({ ...formData, code: "" });
  };

  const getButtonText = () => {
    if (loading) return "Please wait...";
    if (step === "verify") return "Verify Code";
    if (mode === "login") return "Send Verification Code";
    return "Create Account";
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
                <h2 className="text-2xl font-bold">
                  {step === "verify"
                    ? "Verify Email"
                    : mode === "login"
                    ? "Welcome Back"
                    : "Create Account"}
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {step === "verify" ? (
                  <>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      We've sent a 6-digit code to <strong>{formData.email}</strong>
                    </p>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                        <KeyRound className="w-4 h-4" />
                        Verification Code
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:border-primary-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 text-center text-2xl tracking-widest"
                        placeholder="000000"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-sm text-primary-600 hover:underline"
                    >
                      ← Back
                    </button>
                  </>
                ) : (
                  <>
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

                    {mode === "register" && (
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
                    )}
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-primary-500 text-white rounded-lg font-bold hover:bg-primary-600 disabled:opacity-50"
                >
                  {getButtonText()}
                </button>
              </form>

              <div className="mt-4 text-center text-sm">
                {mode === "login" ? (
                  <p>
                    Don't have an account?{" "}
                    <button onClick={() => { setMode("register"); setStep("credentials"); }} className="text-primary-600 font-semibold">
                      Sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button onClick={() => { setMode("login"); setStep("credentials"); }} className="text-primary-600 font-semibold">
                      Login
                    </button>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
