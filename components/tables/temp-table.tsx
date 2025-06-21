"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays, differenceInDays, addDays } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface TemperatureData {
  id: number;
  transformerId: string;
  location: string;
  oilTemperature: number;
  windingTemperature: number;
  status: "Normal" | "Warning" | "Critical";
}

export const TemperatureMonitoringTable: React.FC = () => {
  const [view, setView] = useState<"daily" | "range">("daily");
  const [singleDate, setSingleDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [data, setData] = useState<TemperatureData[]>([]);

  // Sample data
  const temperatureData: TemperatureData[] = [
    { id: 1, transformerId: "TRF001", location: "Substation A", oilTemperature: 65, windingTemperature: 70, status: "Normal" },
    { id: 2, transformerId: "TRF002", location: "Substation B", oilTemperature: 80, windingTemperature: 85, status: "Warning" },
    { id: 3, transformerId: "TRF003", location: "Plant C", oilTemperature: 95, windingTemperature: 100, status: "Critical" },
    { id: 4, transformerId: "TRF004", location: "Substation D", oilTemperature: 60, windingTemperature: 65, status: "Normal" },
    { id: 5, transformerId: "TRF005", location: "Plant E", oilTemperature: 75, windingTemperature: 80, status: "Normal" },
  ];

  // Generate data based on view
  useEffect(() => {
    if (view === "daily") {
      setData(temperatureData);
    } else {
      const aggregatedData = temperatureData.map((item) => {
        const newOilTemp = item.oilTemperature * (0.9 + Math.random() * 0.2);
        const newWindingTemp = item.windingTemperature * (0.9 + Math.random() * 0.2);
        return {
          ...item,
          oilTemperature: Number(newOilTemp.toFixed(1)),
          windingTemperature: Number(newWindingTemp.toFixed(1)),
          status:
            (newOilTemp > 90 || newWindingTemp > 95
              ? "Critical"
              : newOilTemp > 75 || newWindingTemp > 80
              ? "Warning"
              : "Normal") as "Normal" | "Warning" | "Critical",
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
        <h3 className="text-lg font-semibold">Temperature Monitoring</h3>
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
              <th className="text-left p-2 font-medium">Location</th>
              <th className="text-right p-2 font-medium">Oil Temp (°C)</th>
              <th className="text-right p-2 font-medium">Winding Temp (°C)</th>
              <th className="text-left p-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                <td className="p-2 text-xs font-mono">{item.transformerId}</td>
                <td className="p-2 text-xs font-mono">{item.location}</td>
                <td className="p-2 text-right text-xs font-mono">{item.oilTemperature.toFixed(1)}</td>
                <td className="p-2 text-right text-xs font-mono">{item.windingTemperature.toFixed(1)}</td>
                <td className="p-2 text-xs font-mono">
                  <span
                    className={
                      item.status === "Critical"
                        ? "text-red-600"
                        : item.status === "Warning"
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
        Showing temperature data for {view === "daily" ? format(singleDate, "LLL dd, yyyy") : `${format(dateRange.from, "LLL dd, yyyy")} - ${format(dateRange.to, "LLL dd, yyyy")}`}
      </div>
    </Card>
  );
};