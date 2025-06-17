"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays, differenceInDays, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";

export const TopKwhConsumptionTable = () => {
  const [view, setView] = useState<"daily" | "range">("daily");
  const [singleDate, setSingleDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  type ConsumptionRow = {
    srNo: number;
    id: number;
    device: string;
    panel: string;
    dailyKwh: number | string;
  };
  const [data, setData] = useState<ConsumptionRow[]>([]);

  // Sample data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const consumptionData = [
    { id: 1, device: "Incomer PCC1", panel: "PCC 1", dailyKwh: 50.25 },
    { id: 2, device: "LATHE 3", panel: "PCC 1", dailyKwh: 10.75 },
    { id: 3, device: "POWER SOCKET 1", panel: "PCC 2", dailyKwh: 25.30 },
    { id: 4, device: "EOT CRANE 1", panel: "PCC 3", dailyKwh: 15.60 },
    { id: 5, device: "APFC - PCC1", panel: "PCC 1", dailyKwh: 30.45 },
    { id: 6, device: "WET BLASTING", panel: "PCC 5", dailyKwh: 8.20 },
    { id: 7, device: "PAINT BOOTH SMALL", panel: "PCC 6", dailyKwh: 12.90 },
    { id: 8, device: "WET BLASTING 2", panel: "LT ROOM", dailyKwh: 40.15 },
  ];

  // Generate data based on view
  useEffect(() => {
    if (view === "daily") {
      // For daily view, use data as-is or fetch for singleDate
      const sortedData = [...consumptionData]
        .sort((a, b) => Number(b.dailyKwh) - Number(a.dailyKwh))
        .slice(0, 5)
        .map((item, index) => ({ ...item, srNo: index + 1 }));
      setData(sortedData);
    } else {
      // For range view, aggregate or simulate data
      const days = differenceInDays(dateRange.to, dateRange.from) + 1;
      const aggregatedData = consumptionData.map((item) => ({
        ...item,
        dailyKwh: (item.dailyKwh * days * (0.8 + Math.random() * 0.4)).toFixed(2), // Simulate range data
      }));
      const sortedData = aggregatedData
        .sort((a, b) => Number(b.dailyKwh) - Number(a.dailyKwh))
        .slice(0, 5)
        .map((item, index) => ({ ...item, srNo: index + 1 }));
      setData(sortedData);
    }
  }, [view, singleDate, dateRange, consumptionData]);

  // Handle date range selection with 31-day max constraint
  const handleRangeSelect = (range: { from?: Date; to?: Date }) => {
    if (!range.from || !range.to) return;
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
        <h3 className="text-lg font-semibold">Top 5 kWh Consumptions</h3>
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
              <th className="text-left p-2 font-medium">Sr No.</th>
              <th className="text-left p-2 font-medium">Device</th>
              <th className="text-left p-2 font-medium">Panel</th>
              <th className="text-right p-2 font-medium">Daily kWh</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                <td className="p-2 text-xs font-mono">{item.srNo}</td>
                <td className="p-2 text-xs font-mono">{item.device}</td>
                <td className="p-2 text-xs font-mono">{item.panel}</td>
                <td className="p-2 text-right text-xs font-mono">{Number(item.dailyKwh).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-muted-foreground text-center">
        Showing top 5 kWh consumptions for {view === "daily" ? format(singleDate, "LLL dd, yyyy") : `${format(dateRange.from, "LLL dd, yyyy")} - ${format(dateRange.to, "LLL dd, yyyy")}`}
      </div>
    </Card>
  );
};