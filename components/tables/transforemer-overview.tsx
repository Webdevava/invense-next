"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays, differenceInDays, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface TransformerData {
  id: number;
  transformerId: string;
  location: string;
  ratedCapacity: number;
  currentLoadPercent: number;
  status: "Online" | "Offline" | "Faulty";
  lastInspectionDate: string;
}

export const TransformerOverviewTable: React.FC = () => {
  const [view, setView] = useState<"daily" | "range">("daily");
  const [singleDate, setSingleDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [data, setData] = useState<TransformerData[]>([]);

  // Sample data
  const transformerData: TransformerData[] = [
    { id: 1, transformerId: "TRF001", location: "Substation A", ratedCapacity: 5000, currentLoadPercent: 70, status: "Online", lastInspectionDate: "2025-06-21" },
    { id: 2, transformerId: "TRF002", location: "Substation B", ratedCapacity: 3000, currentLoadPercent: 85, status: "Online", lastInspectionDate: "2025-06-21" },
    { id: 3, transformerId: "TRF003", location: "Plant C", ratedCapacity: 4000, currentLoadPercent: 95, status: "Faulty", lastInspectionDate: "2025-06-21" },
    { id: 4, transformerId: "TRF004", location: "Substation D", ratedCapacity: 6000, currentLoadPercent: 60, status: "Online", lastInspectionDate: "2025-06-21" },
    { id: 5, transformerId: "TRF005", location: "Plant E", ratedCapacity: 3500, currentLoadPercent: 50, status: "Offline", lastInspectionDate: "2025-06-21" },
  ];

  // Generate data based on view
  useEffect(() => {
    if (view === "daily") {
      setData(transformerData);
    } else {
      const aggregatedData = transformerData.map((item) => ({
        ...item,
        currentLoadPercent: Math.min(100, Math.max(0, Math.round(item.currentLoadPercent * (0.9 + Math.random() * 0.2)))),
        status:
          Math.random() < 0.1
            ? item.status === "Faulty"
              ? "Online"
              : "Faulty"
            : item.status,
      }));
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
        <h3 className="text-lg font-semibold">Transformer Overview</h3>
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
                {format(dateRange.from, "LLL dd, yyyy")} - {format(dateRange.to, "LLL dd, yyyy")})
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
              <th className="text-left p-2 font-medium">Location</th>
              <th className="text-right p-2 font-medium">Rated Capacity (kVA)</th>
              <th className="text-right p-2 font-medium">Current Load (%)</th>
              <th className="text-left p-2 font-medium">Status</th>
              <th className="text-left p-2 font-medium">Last Inspection</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                <td className="p-2 text-xs font-mono">{item.transformerId}</td>
                <td className="p-2 text-xs font-mono">{item.location}</td>
                <td className="p-2 text-right text-xs font-mono">{item.ratedCapacity}</td>
                <td className="p-2 text-right text-xs font-mono">{item.currentLoadPercent}</td>
                <td className="p-2 text-xs font-mono">
                  <span
                    className={
                      item.status === "Online"
                        ? "text-green-600"
                        : item.status === "Offline"
                        ? "text-gray-600"
                        : "text-red-600"
                    }
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-2 text-xs font-mono">{item.lastInspectionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-muted-foreground text-center">
        Showing transformer overview for {view === "daily" ? format(singleDate, "LLL dd, yyyy") : `${format(dateRange.from, "LLL dd, yyyy")} - ${format(dateRange.to, "LLL dd, yyyy")}`}
      </div>
    </Card>
  );
};