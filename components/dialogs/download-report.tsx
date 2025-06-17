"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format, subDays, differenceInDays } from "date-fns";

export const DownloadReport = () => {
  const [view, setView] = useState<"daily" | "range">("daily");
  const [singleDate, setSingleDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [open, setOpen] = useState(false);

  // Sample data (replace with API data in production)
  const consumptionData = [
    { device: "Incomer PCC1", panel: "PCC 1", dailyKwh: 50.25 },
    { device: "LATHE 3", panel: "PCC 1", dailyKwh: 10.75 },
    { device: "POWER SOCKET 1", panel: "PCC 2", dailyKwh: 25.30 },
    { device: "EOT CRANE 1", panel: "PCC 3", dailyKwh: 15.60 },
    { device: "APFC - PCC1", panel: "PCC 1", dailyKwh: 30.45 },
    { device: "WET BLASTING", panel: "PCC 5", dailyKwh: 8.20 },
    { device: "PAINT BOOTH SMALL", panel: "PCC 6", dailyKwh: 12.90 },
    { device: "WET BLASTING 2", panel: "LT ROOM", dailyKwh: 40.15 },
  ];

  // Generate CSV content
  const generateCSV = () => {
    let data = consumptionData;
    let headers = ["Device", "Panel", "Daily kWh"];
    let filename = `energy-report-${format(singleDate, "yyyy-MM-dd")}.csv`;

    if (view === "range") {
      const days = differenceInDays(dateRange.to, dateRange.from) + 1;
      data = consumptionData.map((item) => ({
        ...item,
        dailyKwh: item.dailyKwh * days * (0.8 + Math.random() * 0.4),
      }));
      headers = ["Device", "Panel", "Total kWh"];
      filename = `energy-report-${format(dateRange.from, "yyyy-MM-dd")}-to-${format(dateRange.to, "yyyy-MM-dd")}.csv`;
    }

    const csvRows = [
      headers.join(","),
      ...data.map((item) =>
        `"${item.device}","${item.panel}",${item.dailyKwh.toFixed(2)}`
      ),
    ].join("\n");

    return { csvContent: csvRows, filename };
  };

  // Handle CSV download
  const handleDownload = () => {
    const { csvContent, filename } = generateCSV();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
    setOpen(false);
  };

  // Handle date range selection without limit
  const handleRangeSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (!range || !range.from || !range.to) return;
    setDateRange({ from: range.from, to: range.to });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="default" className="cursor-pointer">Download Report</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Download Energy Report</AlertDialogTitle>
          <AlertDialogDescription>
            Select a date or range to generate a CSV report of energy consumption.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4">
          <Tabs value={view} onValueChange={(v) => setView(v as "daily" | "range")}>
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="range">Range</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-4">
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
                    required={false}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDownload}>Download CSV</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};