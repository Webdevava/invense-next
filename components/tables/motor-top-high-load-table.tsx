"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays, differenceInDays, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface MotorLoadData {
  id: number;
  motorId: string;
  location: string;
  avgLoadKw: number;
  runningHours: number;
  riskLevel: "Low" | "Medium" | "High";
}

export const TopHighLoadMotorsTable: React.FC = () => {
  const [view, setView] = useState<"daily" | "range">("daily");
  const [singleDate, setSingleDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [data, setData] = useState<MotorLoadData[]>([]);

  // Sample data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const motorLoadData: MotorLoadData[] = [
    { id: 1, motorId: "MTR001", location: "Plant A", avgLoadKw: 15.5, runningHours: 20, riskLevel: "High" },
    { id: 2, motorId: "MTR002", location: "Plant B", avgLoadKw: 12.8, runningHours: 18, riskLevel: "Medium" },
    { id: 3, motorId: "MTR003", location: "Plant C", avgLoadKw: 10.2, runningHours: 16, riskLevel: "Medium" },
    { id: 4, motorId: "MTR004", location: "Plant A", avgLoadKw: 8.7, runningHours: 14, riskLevel: "Low" },
    { id: 5, motorId: "MTR005", location: "Plant B", avgLoadKw: 7.5, runningHours: 12, riskLevel: "Low" },
    { id: 6, motorId: "MTR006", location: "Plant C", avgLoadKw: 6.8, runningHours: 10, riskLevel: "Low" },
  ];

  // Generate data based on view
  useEffect(() => {
    if (view === "daily") {
      setData(motorLoadData.slice(0, 5)); // Top 5 for daily view
    } else {
      const days = differenceInDays(dateRange.to, dateRange.from) + 1;
      const aggregatedData = motorLoadData
        .map((item) => ({
          ...item,
          avgLoadKw: Number((item.avgLoadKw * (0.8 + Math.random() * 0.4)).toFixed(2)),
          runningHours: Math.round(item.runningHours * days * (0.8 + Math.random() * 0.4)),
          riskLevel:
            (item.avgLoadKw * days > 100 || item.runningHours * days > 150
              ? "High"
              : item.avgLoadKw * days > 50 || item.runningHours * days > 100
              ? "Medium"
              : "Low") as "Low" | "Medium" | "High",
        }))
        .sort((a, b) => b.avgLoadKw - a.avgLoadKw) // Sort by load
        .slice(0, 5); // Top 5
      setData(aggregatedData);
    }
  }, [view, singleDate, dateRange, motorLoadData]);

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
        <h3 className="text-lg font-semibold">Top 5 High Load/Running Motors</h3>
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
              <th className="text-right p-2 font-medium">Avg Load (kW)</th>
              <th className="text-right p-2 font-medium">Running Hours</th>
              <th className="text-left p-2 font-medium">Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                <td className="p-2 text-xs font-mono">{item.motorId}</td>
                <td className="p-2 text-xs font-mono">{item.location}</td>
                <td className="p-2 text-right text-xs font-mono">{item.avgLoadKw.toFixed(2)}</td>
                <td className="p-2 text-right text-xs font-mono">{item.runningHours}</td>
                <td className="p-2 text-xs font-mono">
                  <span
                    className={
                      item.riskLevel === "High"
                        ? "text-red-600"
                        : item.riskLevel === "Medium"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }
                  >
                    {item.riskLevel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-muted-foreground text-center">
        Showing top 5 high load/running motors for {view === "daily" ? format(singleDate, "LLL dd, yyyy") : `${format(dateRange.from, "LLL dd, yyyy")} - ${format(dateRange.to, "LLL dd, yyyy")}`}
      </div>
    </Card>
  );
};