"use client";

import AdminChart from "./AdminChart";
import AdminTotalCardSection from "./AdminTotalCardSection";

export default function Admin() {
  return (
    <div className="flex flex-col gap-6">
      <AdminTotalCardSection />
      <AdminChart />
    </div>
  );
}
