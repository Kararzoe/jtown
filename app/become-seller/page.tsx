"use client";

import { useEffect } from "react";

export default function BecomeSellerPage() {
  useEffect(() => {
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLScQeA6mXI8-J-zjHMjGYEuaazp8evPjpB4hJEyeAoyfyEVqPw/viewform?usp=publish-editor";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Redirecting to registration form...</p>
    </div>
  );
}
