"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays, differenceInDays, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface AlertData {
  id: number;
  transformerId: string;
  alertType: "Overload" | "Overtemperature" | "Oil Level Low" | "Insulation Fault";
  timestamp: string;
  description: string;
  severity: "Low" | "Medium" | "High";
}

export const AlertsAndFaultsTable: React.FC = () => {
  const [view, setView] = useState<"daily" | "range">("daily");
  const [singleDate, setSingleDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [data, setData] = useState<AlertData[]>([]);

  // Sample data
  const alertData: AlertData[] = [
    { id: 1, transformerId: "TRF001", alertType: "Overload", timestamp: "2025-06-20", description: "Load exceeded 90%", severity: "High" },
    { id: 2, transformerId: "TRF002", alertType: "Overtemperature", timestamp: "2025-06-19", description: "Winding temp at 90°C", severity: "Medium" },
    { id: 3, transformerId: "TRF003", alertType: "Oil Level Low", timestamp: "2025-06-18", description: "Oil level below threshold", severity: "High" },
    { id: 4, transformerId: "TRF004", alertType: "Insulation Fault", timestamp: "2025-06-17", description: "Detected insulation issue", severity: "Medium" },
    { id: 5, transformerId: "TRF005", alertType: "Overtemperature", timestamp: "2025-06-16", description: "Oil temp at 80°C", severity: "Low" },
  ];

  // Filter data based on view
  useEffect(() => {
    if (view === "daily") {
      setData(
        alertData.filter(
          (event) => event.timestamp === format(singleDate, "yyyy-MM-dd")
        )
      );
    } else {
      const startDate = format(dateRange.from, "yyyy-MM-dd");
      const endDate = format(dateRange.to, "yyyy-MM-dd");
      setData(
        alertData.filter(
          (event) => event.timestamp >= startDate && event.timestamp <= endDate
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
        <h3 className="text-lg font-semibold">Alerts & Faults</h3>
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
              <th className="text-left p-2 font-medium">Transformer ID</th>
              <th className="text-left p-2 font-medium">Alert Type</th>
              <th className="text-left p-2 font-medium">Timestamp</th>
              <th className="text-left p-2 font-medium">Description</th>
              <th className="text-left p-2 font-medium">Severity</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-2 text-center text-xs font-mono text-muted-foreground">
                  No alerts for selected {view === "daily" ? "date" : "range"}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="p-2 text-xs font-mono">{item.transformerId}</td>
                  <td className="p-2 text-xs font-mono">{item.alertType}</td>
                  <td className="p-2 text-xs font-mono">{item.timestamp}</td>
                  <td className="p-2 text-xs font-mono">{item.description}</td>
                  <td className="p-2 text-xs font-mono">
                    <span
                      className={
                        item.severity === "High"
                          ? "text-red-600"
                          : item.severity === "Medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }
                    >
                      {item.severity}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-muted-foreground text-center">
        Showing alerts for {view === "daily" ? format(singleDate, "LLL dd, yyyy") : `${format(dateRange.from, "LLL dd, yyyy")} - ${format(dateRange.to, "LLL dd, yyyy")}`}
      </div>
    </Card>
  );
};