"use client";

import ProtectedRoutes from "@/components/authentication/ProtectedRoutes";

export default function ProtectedLayout({ children }) {
  return <ProtectedRoutes>{children}</ProtectedRoutes>;
}
