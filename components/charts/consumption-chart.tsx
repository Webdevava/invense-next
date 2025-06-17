"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export const description = "A bar chart for energy consumption";

const regions = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"];

const chartConfig = {
  kwh: {
    label: "kWh",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

// Helper functions to replace date-fns
const formatDate = (date: Date, format: string) => {
  const options: Intl.DateTimeFormatOptions = {};
  if (format === "LLL dd, yyyy") {
    options.year = 'numeric';
    options.month = 'short';
    options.day = '2-digit';
  } else if (format === "MMM dd") {
    options.month = 'short';
    options.day = '2-digit';
  } else if (format === "MMM dd, yyyy") {
    options.year = 'numeric';
    options.month = 'short';
    options.day = '2-digit';
  } else if (format === "yyyy-MM-dd") {
    return date.toISOString().split('T')[0];
  }
  return date.toLocaleDateString('en-US', options);
};

const subDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const differenceInDays = (laterDate: Date, earlierDate: Date) => {
  const timeDiff = laterDate.getTime() - earlierDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export function EnergyConsumptionChart() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [region, setRegion] = useState(regions[0]);
  const [chartData, setChartData] = useState<{ date: string; kwh: number }[]>([]);

  // Generate sample data based on date range and region
  useEffect(() => {
    const generateData = () => {
      const days = differenceInDays(dateRange.to, dateRange.from) + 1;
      const data = [];
      for (let i = 0; i < days; i++) {
        const date = addDays(dateRange.from, i);
        data.push({
          date: formatDate(date, "yyyy-MM-dd"),
          kwh: Math.random() * 100 + 50, // Random kWh between 50 and 150
        });
      }
      return data;
    };

    setChartData(generateData());
  }, [dateRange, region]);

  // Calculate total and average kWh
  const totalKwh = chartData.reduce((sum, entry) => sum + entry.kwh, 0);
  const avgKwh = chartData.length > 0 ? (totalKwh / chartData.length).toFixed(2) : "0.00";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateSelect = (range: any) => {
    if (!range || !range.from || !range.to) return;
    const diff = differenceInDays(range.to, range.from);
    if (diff > 31) {
      setDateRange({ from: range.from, to: addDays(range.from, 31) });
    } else {
      setDateRange({ from: range.from, to: range.to });
    }
  };

  // Custom tooltip formatter to show date and kWh
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const formattedDate = formatDate(new Date(label), "MMM dd, yyyy");
      const kwhValue = payload[0].value.toFixed(2);
      return (
        <div className="bg-background border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium text-foreground">{formattedDate}</p>
          <p className="text-sm text-muted-foreground">
            <span className="inline-block w-3 h-3 bg-chart-1 rounded-sm mr-2"></span>
            {kwhValue} kWh
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="font-serif text-lg">Energy Consumption</CardTitle>
        <CardDescription>
          {formatDate(dateRange.from, "LLL dd, yyyy")} - {formatDate(dateRange.to, "LLL dd, yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-end gap-4 mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-fit justify-start text-left font-normal"
              >
                <span>
                  {formatDate(dateRange.from, "LLL dd, yyyy")} - {formatDate(dateRange.to, "LLL dd, yyyy")}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleDateSelect}
                disabled={(date) => date > new Date() || date < subDays(new Date(), 365)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a region" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Regions</SelectLabel>
                {regions.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => formatDate(new Date(value), "MMM dd")}
            />
            <ChartTooltip
              cursor={false}
              content={<CustomTooltipContent />}
            />
            <Bar dataKey="kwh" fill="var(--color-kwh)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total: {totalKwh.toFixed(2)} kWh | Avg: {avgKwh} kWh/day
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing energy consumption for {region} from {formatDate(dateRange.from, "LLL dd, yyyy")} to{" "}
          {formatDate(dateRange.to, "LLL dd, yyyy")}
        </div>
      </CardFooter>
    </Card>
  );
}

export default EnergyConsumptionChart;