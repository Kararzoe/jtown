"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/lib/api";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.getProfile().then(userData => {
        setUser(userData);
        setLoading(false);
      }).catch(() => {
        localStorage.removeItem("token");
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await api.login({ email, password });
    if (data.token) {
      localStorage.setItem("token", data.token);
      setUser(data);
      return data;
    }
    throw new Error(data.message || "Login failed");
  };

  const sendLoginCode = async (email: string) => {
    const data = await api.sendLoginCode(email);
    if (!data.success) {
      throw new Error(data.message || "Failed to send verification code");
    }
    return data;
  };

  const verifyLoginCode = async (email: string, code: string) => {
    const data = await api.verifyLoginCode(email, code);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setUser(data);
      return data;
    }
    throw new Error(data.message || "Invalid verification code");
  };

  const register = async (userData: any) => {
    const data = await api.register(userData);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setUser(data);
      return data;
    }
    throw new Error(data.message || "Registration failed");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, sendLoginCode, verifyLoginCode }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
