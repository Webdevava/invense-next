import { AlertsTable } from "@/components/tables/alerts-table";
import { MaintenanceTable } from "@/components/tables/maintenance-table";
import { StatsGrid } from "@/components/layouts/stats-grid";
import { AlertCircle, AlertTriangle, MapPin, Package } from "lucide-react";
import DeviceInfoWrapper from "@/components/dashboard/DeviceInfoWrapper"; // Import the wrapper
import React from "react";

const Home = () => {
  return (
    <div className="space-y-6">
      {/* <SectionHeader
        title="Overview"
        description="Overview of basic stats alerts etc of selected org."
      /> */}
      <StatsGrid
        stats={[
          {
            title: "Sub Locations",
            value: "21",
            description: "Total no. of sub locations",
            icon: MapPin,
          },
          {
            title: "Assets",
            value: "8",
            description: "Total no. of assets",
            icon: Package,
          },
          {
            title: "Warnings",
            value: "3",
            description: "Total no. of warnings",
            icon: AlertTriangle,
          },
          {
            title: "Alerts",
            value: "5",
            description: "Total no. of alerts",
            icon: AlertCircle,
          },
        ]}
      />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full flex-1">
          <DeviceInfoWrapper />
        </div>
        <div className="w-full flex-1">
          <AlertsTable />
        </div>
      </div>
      <MaintenanceTable />
    </div>
  );
};

export default Home;
