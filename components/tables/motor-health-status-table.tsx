"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays, differenceInDays, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface MotorData {
  id: number;
  motorId: string;
  location: string;
  status: "Running" | "Stopped" | "Fault";
  healthScore: number;
  alerts: string;
  lastMaintenance: string;
}

export const MotorHealthStatusTable: React.FC = () => {
  const [view, setView] = useState<"daily" | "range">("daily");
  const [singleDate, setSingleDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [data, setData] = useState<MotorData[]>([]);

  // Sample data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const motorData: MotorData[] = [
    { id: 1, motorId: "MTR001", location: "Plant A", status: "Running", healthScore: 85, alerts: "None", lastMaintenance: "2025-05-15" },
    { id: 2, motorId: "MTR002", location: "Plant B", status: "Stopped", healthScore: 90, alerts: "Scheduled Maintenance", lastMaintenance: "2025-04-20" },
    { id: 3, motorId: "MTR003", location: "Plant C", status: "Fault", healthScore: 45, alerts: "Overheating Detected", lastMaintenance: "2025-03-10" },
    { id: 4, motorId: "MTR004", location: "Plant A", status: "Running", healthScore: 78, alerts: "Vibration Warning", lastMaintenance: "2025-06-01" },
    { id: 5, motorId: "MTR005", location: "Plant B", status: "Running", healthScore: 92, alerts: "None", lastMaintenance: "2025-05-25" },
    { id: 6, motorId: "MTR006", location: "Plant C", status: "Stopped", healthScore: 88, alerts: "None", lastMaintenance: "2025-04-30" },
  ];

  // Generate data based on view
  useEffect(() => {
    if (view === "daily") {
      setData(motorData);
    } else {
      const days = differenceInDays(dateRange.to, dateRange.from) + 1;
      const aggregatedData = motorData.map((item) => ({
        ...item,
        healthScore: Math.min(100, Math.max(0, Math.round(item.healthScore * (0.9 + Math.random() * 0.2)))),
        alerts: days > 7 ? `${item.alerts}${item.alerts === "None" ? "" : ", "}Periodic Check Recommended` : item.alerts,
      }));
      setData(aggregatedData);
    }
  }, [view, singleDate, dateRange, motorData]);

  // Handle date range selection with 31-day max constraint
  const handleRangeSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (!range?.from || !range?.to) return;
    const diff = differenceInDays(range.to, range.from);
    if (diff > 31) {
      setDateRange({ from: range.from, to: addDays(range.from, 31) });
    } else {
      setDateRange({ from: range.from, to: range.to });
    }
  };

  return (
    <Card className="space-y-2 gap-0 p-3 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Motor Health Status</h3>
        <Tabs value={view} onValueChange={(v) => setView(v as "daily" | "range")}>
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="range">Range</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex items-center gap-4 mb-4">
        {view === "daily" ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[200px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(singleDate, "LLL dd, yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={singleDate}
                onSelect={(date) => date && setSingleDate(date)}
                disabled={(date) => date > new Date() || date < subDays(new Date(), 365)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[280px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(dateRange.from, "LLL dd, yyyy")} - {format(dateRange.to, "LLL dd, yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleRangeSelect}
                disabled={(date) => date > new Date() || date < subDays(new Date(), 365)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      </div>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b">
              <th className="text-left p-2 font-medium">Motor ID</th>
              <th className="text-left p-2 font-medium">Location</th>
              <th className="text-left p-2 font-medium">Status</th>
              <th className="text-right p-2 font-medium">Health Score</th>
              <th className="text-left p-2 font-medium">Alerts</th>
              <th className="text-left p-2 font-medium">Last Maintenance</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                <td className="p-2 text-xs font-mono">{item.motorId}</td>
                <td className="p-2 text-xs font-mono">{item.location}</td>
                <td className="p-2 text-xs font-mono">
                  <span
                    className={
                      item.status === "Running"
                        ? "text-green-600"
                        : item.status === "Stopped"
                        ? "text-gray-600"
                        : "text-red-600"
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-2 text-right text-xs font-mono">{item.healthScore}</td>
                <td className="p-2 text-xs font-mono">{item.alerts}</td>
                <td className="p-2 text-xs font-mono">{item.lastMaintenance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-muted-foreground text-center">
        Showing motor health status for {view === "daily" ? format(singleDate, "LLL dd, yyyy") : `${format(dateRange.from, "LLL dd, yyyy")} - ${format(dateRange.to, "LLL dd, yyyy")}`}
      </div>
    </Card>
  );
};