import { EnergyConsumptionChart } from "@/components/charts/consumption-chart";
import { PanelPowerDistributionTable } from "@/components/tables/panel-power-distribution-table";
import { TopKwhConsumptionTable } from "@/components/tables/top-kws-consumption-table";
import { AssetsTable } from "@/components/tables/assets-table";
import { PanelTable } from "@/components/tables/panel-table";
import { DownloadReport } from "@/components/dialogs/download-report";
import { Metadata } from "next";
import SectionHeader from "@/components/layouts/section-header";
import { StatsGrid } from "@/components/layouts/stats-grid";
import { AlertCircle, AlertTriangle, MapPin, Package } from 'lucide-react'

export const metadata: Metadata = {
  title: "Dashboard | EL-EXE",
  keywords: ["dashboard", "analytics", "energy consumption", "power distribution"],
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
        title="Water Dashboard"
        description="Overview of basic stats alerts etc of selected org."
        actions={<DownloadReport/>}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-4">
          <EnergyConsumptionChart />
          <PanelPowerDistributionTable />
          <TopKwhConsumptionTable />
        </div>
        <div className="flex flex-col space-y-4">
          <PanelTable />
          <AssetsTable />
        </div>
      </div>
    </div>
  );
}
