"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays, differenceInDays, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface DeviceData {
  id: number;
  deviceId: string;
  type: "Pump" | "Valve" | "Meter";
  location: string;
  status: "On" | "Off" | "Fault";
  lastDataTimestamp: string;
}

const DeviceOverviewTable: React.FC = () => {
  const [view, setView] = useState<"daily" | "range">("daily");
  const [singleDate, setSingleDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<{
      [x: string]: Date; from: Date; to: Date 
}>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [data, setData] = useState<DeviceData[]>([]);

  // Sample data
  const deviceData: DeviceData[] = [
    { id: 1, deviceId: "PMP001", type: "Pump", location: "Building A", status: "On", lastDataTimestamp: "2025-06-21 14:30:00" },
    { id: 2, deviceId: "VLV001", type: "Valve", location: "Building B", status: "Off", lastDataTimestamp: "2025-06-21 14:15:00" },
    { id: 3, deviceId: "MTR001", type: "Meter", location: "Plant C", status: "Fault", lastDataTimestamp: "2025-06-20 23:50:00" },
    { id: 4, deviceId: "PMP002", type: "Pump", location: "Plant D", status: "On", lastDataTimestamp: "2025-06-21 14:25:00" },
    { id: 5, deviceId: "VLV002", type: "Valve", location: "Building A", status: "On", lastDataTimestamp: "2025-06-21 13:45:00" },
  ];

  // Generate data based on view
  useEffect(() => {
    if (view === "daily") {
      setData(deviceData);
    } else {
      const aggregatedData = deviceData.map((item) => ({
        ...item,
        status:
          Math.random() < 0.1 ? (item.status === "Fault" ? "On" : "Fault") : item.status,
        lastDataTimestamp: format(
          new Date(
            dateRange.to.getTime() - Math.random() * (dateRange.to.getTime() - dateRange.from.getTime())
          ),
          "yyyy-MM-dd HH:mm:ss yyyy"
        ),
      }));
      setData(aggregatedData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, singleDate, dateRange]);

  // Handle date range selection with 31-day max constraint
  const handleRangeSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (!range?.from || !range?.to) return;
    const diff = differenceInDays(range.to!, range.from!);
    if (diff > 31) {
      setDateRange({ from: range!.from!, to: addDays(range!.from!, 31) });
    } else {
      setDateRange({ from: range!.from!, to: range!.to! });
    }
  };

  return (
    <Card className="space-y-2 gap-0 p-3 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Device Overview</h3>
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
              <th className="text-left p-2 font-medium">Device ID</th>
              <th className="text-left p-2 font-medium">Type</th>
              <th className="text-left p-2 font-medium">Location</th>
              <th className="text-left p-2 font-medium">Status</th>
              <th className="text-left p-2 font-medium">Last Data</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                <td className="p-2 text-xs font-mono">{item.deviceId}</td>
                <td className="p-2 text-xs font-mono">{item.type}</td>
                <td className="p-2 text-xs font-mono">{item.location}</td>
                <td className="p-2 text-xs font-mono">
                  <span
                    className={
                      item.status === "On"
                        ? "text-green-600"
                        : item.status === "Off"
                        ? "text-gray-600"
                        : "text-red-600"
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-2 text-xs font-mono">{item.lastDataTimestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-muted-foreground text-center">
        Showing device status for {view === "daily" ? format(singleDate, "LLL dd, yyyy") : `${format(dateRange.from, "LLL dd, yyyy")} - ${format(dateRange.to, "LLL dd, yyyy")}`}
      </div>
    </Card>
  );
};

export default DeviceOverviewTable;