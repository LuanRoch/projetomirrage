"use client";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPage = () => {
  const { currentUser } = useCurrentUser();

  const router = useRouter();

  useEffect(() => {
    if (!currentUser || currentUser.role !== "ADMIN") {
      router.push("/");
    }
  }, [currentUser]);

  return (
    <div className="container mx-auto py-8 px-4 lg:py-16">
      <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <AreaChartComponent />

        <BarChartComponent />

        <PieChartComponent />
      </div>
    </div>
  );
};

export default AdminPage;
