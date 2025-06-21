"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays, differenceInDays, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface TankData {
  id: number;
  tankId: string;
  location: string;
  levelPercent: number;
  levelLiters: number;
  status: "Normal" | "Low" | "High";
}

export const TankLevelMonitoringTable: React.FC = () => {
  const [view, setView] = useState<"daily" | "range">("daily");
  const [singleDate, setSingleDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [data, setData] = useState<TankData[]>([]);

  // Sample data
  const tankData: TankData[] = [
    { id: 1, tankId: "TNK001", location: "Building A", levelPercent: 75, levelLiters: 7500, status: "Normal" },
    { id: 2, tankId: "TNK002", location: "Building B", levelPercent: 20, levelLiters: 2000, status: "Low" },
    { id: 3, tankId: "TNK003", location: "Plant C", levelPercent: 90, levelLiters: 9000, status: "High" },
    { id: 4, tankId: "TNK004", location: "Building A", levelPercent: 60, levelLiters: 6000, status: "Normal" },
    { id: 5, tankId: "TNK005", location: "Plant D", levelPercent: 45, levelLiters: 4500, status: "Normal" },
  ];

  // Generate data based on view
  useEffect(() => {
    if (view === "daily") {
      setData(tankData);
    } else {
      const aggregatedData = tankData.map((item) => {
        const newPercent = Math.min(100, Math.max(0, item.levelPercent * (0.9 + Math.random() * 0.2)));
        const newLiters = Math.round((newPercent / 100) * item.levelLiters * (0.9 + Math.random() * 0.2));
        return {
          ...item,
          levelPercent: Math.round(newPercent),
          levelLiters: newLiters,
          status: (newPercent < 30
            ? "Low"
            : newPercent > 80
            ? "High"
            : "Normal") as "Normal" | "Low" | "High",
        };
      });
      setData(aggregatedData);
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
        <h3 className="text-lg font-semibold">Tank Level Monitoring</h3>
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
              <th className="text-left p-2 font-medium">Tank ID</th>
              <th className="text-left p-2 font-medium">Location</th>
              <th className="text-right p-2 font-medium">Level (%)</th>
              <th className="text-right p-2 font-medium">Level (Liters)</th>
              <th className="text-left p-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                <td className="p-2 text-xs font-mono">{item.tankId}</td>
                <td className="p-2 text-xs font-mono">{item.location}</td>
                <td className="p-2 text-right text-xs font-mono">{item.levelPercent}</td>
                <td className="p-2 text-right text-xs font-mono">{item.levelLiters}</td>
                <td className="p-2 text-xs font-mono">
                  <span
                    className={
                      item.status === "Low"
                        ? "text-red-600"
                        : item.status === "High"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-muted-foreground text-center">
        Showing tank levels for {view === "daily" ? format(singleDate, "LLL dd, yyyy") : `${format(dateRange.from, "LLL dd, yyyy")} - ${format(dateRange.to, "LLL dd, yyyy")}`}
      </div>
    </Card>
  );
};