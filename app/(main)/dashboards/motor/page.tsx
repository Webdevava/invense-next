// import { PanelPowerDistributionTable } from "@/components/tables/panel-power-distribution-table";
import { DownloadReport } from "@/components/dialogs/download-report";
import { Metadata } from "next";
import SectionHeader from "@/components/layouts/section-header";
import { StatsGrid } from "@/components/layouts/stats-grid";
import { AlertCircle, AlertTriangle, MapPin, Package } from "lucide-react";
import DeviceInfoWrapper from "@/components/dashboard/DeviceInfoWrapper";
import { MotorHealthStatusTable } from "@/components/tables/motor-health-status-table";
import { MaintenanceLogTable } from "@/components/tables/motor-maintainace-log";
import { TopHighLoadMotorsTable } from "@/components/tables/motor-top-high-load-table";
import EquipmentCard from "@/components/cards/motor-card";

export const metadata: Metadata = {
  title: "Dashboard | EL-EXE",
  keywords: [
    "dashboard",
    "analytics",
    "energy consumption",
    "power distribution",
  ],
  description: "View your dashboard overview and analytics",
  openGraph: {
    type: "website",
    url: "https://example.com",
    title: "Dashboard | EL-EXE",
    description: "My Website Description",
    siteName: "Dashboard | EL-EXE",
    images: [{ url: "https://example.com/og.png" }],
  },
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Energy Dashboard"
        description="Overview of basic stats alerts etc of selected org."
        actions={<DownloadReport />}
      />

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
      {/* <Separator/> */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full flex-1">
          <DeviceInfoWrapper />
        </div>
       <div className="w-full flex-1">
         <EquipmentCard type="motor" />
       </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-4">
          <MaintenanceLogTable />
          <TopHighLoadMotorsTable />
        </div>
        <div className="flex flex-col space-y-4">
          {/* <PanelTable /> */}
          {/* <PanelAssetsTable /> */}
          <MotorHealthStatusTable/>
        </div>
      </div>
    </div>
  );
}
