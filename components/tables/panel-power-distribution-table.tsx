"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays, differenceInDays, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";

type PanelData = {
  id: number;
  panel: string;
  totalKwh: number | string;
  avgKw: number | string;
  avgAmp: number | string;
  avgPf: number | string;
};

export const PanelPowerDistributionTable = () => {
  const [view, setView] = useState<"daily" | "range">("daily");
  const [singleDate, setSingleDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [data, setData] = useState<PanelData[]>([]);

  // Sample data
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const panelData = [
    { id: 1, panel: "PCC 1", totalKwh: 150.25, avgKw: 6.26, avgAmp: 23.69, avgPf: 1.00 },
    { id: 2, panel: "PCC 2", totalKwh: 180.50, avgKw: 7.52, avgAmp: 53.71, avgPf: 0.96 },
    { id: 3, panel: "PCC 3", totalKwh: 90.75, avgKw: 3.78, avgAmp: 7.24, avgPf: 0.94 },
    { id: 4, panel: "PCC4", totalKwh: 200.00, avgKw: 8.33, avgAmp: 11.38, avgPf: 1.00 },
    { id: 5, panel: "PCC 5",
      totalKwh: 120.30,
      avgKw: 5.01,
      avgAmp: 11.38,
      avgPf: 1.00
    },
    { id: 6, panel: "LT ROOM", totalKwh: 274.43, avgKw: 11.43, avgAmp: 399.12, avgPf: 0.95 },
  ];

  // Generate data based on view
  useEffect(() => {
    if (view === "daily") {
      // For daily view, use data as-is
      setData(panelData);
    } else {
      // For range view, aggregate or simulate data
      const days = differenceInDays(dateRange.to, dateRange.from) + 1;
      const aggregatedData = panelData.map((item) => ({
        ...item,
        totalKwh: (item.totalKwh * days * (0.8 + Math.random() * 0.4)).toFixed(2),
        avgKw: (item.avgKw * (0.8 + Math.random() * 0.4)).toFixed(2),
        avgAmp: (item.avgAmp * (0.8 + Math.random() * 0.4)).toFixed(2),
        avgPf: item.avgPf,
      }));
      setData(aggregatedData);
    }
  }, [view, singleDate, dateRange, panelData]);

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
        <h3 className="text-lg font-semibold">Panel Power Distribution</h3>
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
              <th className="text-left p-2 font-medium">Panel</th>
              <th className="text-right p-2 font-medium">Total kWh</th>
              <th className="text-right p-2 font-medium">Avg kW</th>
              <th className="text-right p-2 font-medium">Avg Amp</th>
              <th className="text-right p-2 font-medium">Avg PF</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                <td className="p-2 text-xs font-mono">{item.panel}</td>
                <td className="p-2 text-right text-xs font-mono">{Number(item.totalKwh).toFixed(2)}</td>
                <td className="p-2 text-right text-xs font-mono">{Number(item.avgKw).toFixed(2)}</td>
                <td className="p-2 text-right text-xs font-mono">{Number(item.avgAmp).toFixed(2)}</td>
                <td className="p-2 text-right text-xs font-mono">{Number(item.avgPf).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-muted-foreground text-center">
        Showing power distribution for {view === "daily" ? format(singleDate, "LLL dd, yyyy") : `${format(dateRange.from, "LLL dd, yyyy")} - ${format(dateRange.to, "LLL dd, yyyy")}`}
      </div>
    </Card>
  );
};