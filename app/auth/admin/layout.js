"use client";

import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const { currentUser } = useCurrentUser();

  const router = useRouter();

  useEffect(() => {
    if (!currentUser || currentUser.role !== "ADMIN") {
      router.push("/");
    }
  }, [currentUser]);

  return children;
}
