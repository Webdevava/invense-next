"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays, differenceInDays, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface AnomalyData {
  id: number;
  location: string;
  anomalyType: "Pressure Drop" | "High Flow";
  timestamp: string;
  value: number;
  severity: "Low" | "Medium" | "High";
}

export const LeakAnomalyDetectionTable: React.FC = () => {
  const [view, setView] = useState<"daily" | "range">("daily");
  const [singleDate, setSingleDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [data, setData] = useState<AnomalyData[]>([]);

  // Sample data
  const anomalyData: AnomalyData[] = [
    { id: 1, location: "Building A Pipe 1", anomalyType: "Pressure Drop", timestamp: "2025-06-21", value: 2.5, severity: "High" },
    { id: 2, location: "Building B Pipe 2", anomalyType: "High Flow", timestamp: "2025-06-21", value: 150, severity: "Medium" },
    { id: 3, location: "Plant C Main Line", anomalyType: "Pressure Drop", timestamp: "2025-06-21", value: 1.8, severity: "Medium" },
    { id: 4, location: "Building A Pipe 3", anomalyType: "High Flow", timestamp: "2025-06-21", value: 200, severity: "High" },
    { id: 5, location: "Plant D Pipe 4", anomalyType: "Pressure Drop", timestamp: "2025-06-21", value: 1.2, severity: "Low" },
  ];

  // Filter data based on view
  useEffect(() => {
    if (view === "daily") {
      setData(
        anomalyData.filter(
          (event) => event.timestamp === format(singleDate, "yyyy-MM-dd")
        )
      );
    } else {
      const startDate = format(dateRange.from, "yyyy-MM-dd");
      const endDate = format(dateRange.to, "yyyy-MM-dd");
      setData(
        anomalyData.filter(
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
        <h3 className="text-lg font-semibold">Leak or Anomaly Detection</h3>
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
              <th className="text-left p-2 font-medium">Location</th>
              <th className="text-left p-2 font-medium">Anomaly Type</th>
              <th className="text-left p-2 font-medium">Timestamp</th>
              <th className="text-right p-2 font-medium">Value</th>
              <th className="text-left p-2 font-medium">Severity</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-2 text-center text-xs font-mono text-muted-foreground">
                  No anomalies for selected {view === "daily" ? "date" : "range"}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="p-2 text-xs font-mono">{item.location}</td>
                  <td className="p-2 text-xs font-mono">{item.anomalyType}</td>
                  <td className="p-2 text-xs font-mono">{item.timestamp}</td>
                  <td className="p-2 text-right text-xs font-mono">
                    {item.anomalyType === "Pressure Drop" ? `${item.value.toFixed(1)} bar` : `${item.value.toFixed(0)} L/min`}
                  </td>
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
        Showing anomalies for {view === "daily" ? format(singleDate, "LLL dd, yyyy") : `${format(dateRange.from, "LLL dd, yyyy")} - ${format(dateRange.to, "LLL dd, yyyy")}`}
      </div>
    </Card>
  );
};