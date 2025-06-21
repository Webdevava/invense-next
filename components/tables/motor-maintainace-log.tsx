"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays, differenceInDays, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface MaintenanceEvent {
  id: number;
  motorId: string;
  eventType: "Fault" | "Warning" | "Maintenance";
  eventDate: string;
  description: string;
  resolved: boolean;
}

export const MaintenanceLogTable: React.FC = () => {
  const [view, setView] = useState<"daily" | "range">("daily");
  const [singleDate, setSingleDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [data, setData] = useState<MaintenanceEvent[]>([]);

  // Sample data
  const maintenanceData: MaintenanceEvent[] = [
    { id: 1, motorId: "MTR001", eventType: "Fault", eventDate: "2025-06-21", description: "Overheating detected", resolved: true },
    { id: 2, motorId: "MTR002", eventType: "Maintenance", eventDate: "2025-06-21", description: "Routine inspection", resolved: true },
    { id: 3, motorId: "MTR003", eventType: "Warning", eventDate: "2025-06-21", description: "High vibration", resolved: false },
    { id: 4, motorId: "MTR004", eventType: "Fault", eventDate: "2025-06-21", description: "Bearing failure", resolved: true },
    { id: 5, motorId: "MTR005", eventType: "Maintenance", eventDate: "2025-05-21", description: "Lubrication", resolved: true },
    { id: 6, motorId: "MTR006", eventType: "Warning", eventDate: "2025-05-21", description: "Unusual noise", resolved: false },
  ];

  // Filter data based on view
  useEffect(() => {
    if (view === "daily") {
      setData(
        maintenanceData.filter(
          (event) => event.eventDate === format(singleDate, "yyyy-MM-dd")
        )
      );
    } else {
      const startDate = format(dateRange.from, "yyyy-MM-dd");
      const endDate = format(dateRange.to, "yyyy-MM-dd");
      setData(
        maintenanceData.filter(
          (event) =>
            event.eventDate >= startDate && event.eventDate <= endDate
        )
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, singleDate, dateRange]);

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
        <h3 className="text-lg font-semibold">Maintenance Log / Fault History</h3>
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
              <th className="text-left p-2 font-medium">Event Type</th>
              <th className="text-left p-2 font-medium">Date</th>
              <th className="text-left p-2 font-medium">Description</th>
              <th className="text-left p-2 font-medium">Resolved</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-2 text-center text-xs font-mono text-muted-foreground">
                  No events for selected {view === "daily" ? "date" : "range"}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="p-2 text-xs font-mono">{item.motorId}</td>
                  <td className="p-2 text-xs font-mono">
                    <span
                      className={
                        item.eventType === "Fault"
                          ? "text-red-600"
                          : item.eventType === "Warning"
                          ? "text-yellow-600"
                          : "text-blue-600"
                      }
                    >
                      {item.eventType}
                    </span>
                  </td>
                  <td className="p-2 text-xs font-mono">{item.eventDate}</td>
                  <td className="p-2 text-xs font-mono">{item.description}</td>
                  <td className="p-2 text-xs font-mono">
                    <span className={item.resolved ? "text-green-600" : "text-red-600"}>
                      {item.resolved ? "Yes" : "No"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-muted-foreground text-center">
        Showing maintenance events for {view === "daily" ? format(singleDate, "LLL dd, yyyy") : `${format(dateRange.from, "LLL dd, yyyy")} - ${format(dateRange.to, "LLL dd, yyyy")}`}
      </div>
    </Card>
  );
};