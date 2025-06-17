"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"

export const description = "A weekly data coverage chart showing hours of coverage per day"

// Normalize hours to opacity between 0.4 and 1
const getOpacity = (hours: number) => {
  const min = 10
  const max = 24
  const normalized = (hours - min) / (max - min)
  return (0.4 + normalized * 0.6).toFixed(2)
}

const chartData = [
  { day: "monday", hours: 18 },
  { day: "tuesday", hours: 22 },
  { day: "wednesday", hours: 20 },
  { day: "thursday", hours: 16 },
  { day: "friday", hours: 24 },
  { day: "saturday", hours: 14 },
  { day: "sunday", hours: 12 },
]

const chartConfig = {
  hours: {
    label: "Hours",
  },
  monday: {
    label: "Monday",
    color: "var(--chart-1)",
  },
  tuesday: {
    label: "Tuesday",
    color: "var(--chart-1)",
  },
  wednesday: {
    label: "Wednesday",
    color: "var(--chart-1)",
  },
  thursday: {
    label: "Thursday",
    color: "var(--chart-1)",
  },
  friday: {
    label: "Friday",
    color: "var(--chart-1)",
  },
  saturday: {
    label: "Saturday",
    color: "var(--chart-1)",
  },
  sunday: {
    label: "Sunday",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function WeeklyDataCoverageChart() {
  return (
    <Card className="gap-0 p-0">
      <CardHeader className="p-4">
        <CardTitle>Weekly Data Coverage</CardTitle>
        <CardDescription>Hours of data coverage per day</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 pb-8">
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <YAxis
              domain={[0, 24]}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}h`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="hours"
              radius={8}
              stroke="var(--primary)"
              strokeWidth={2}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              shape={(props: any) => {
                const opacity = getOpacity(props.payload.hours)
                return (
                  <Rectangle
                    {...props}
                    fill="var(--chart-1)"
                    fillOpacity={opacity}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <Separator />
      <CardFooter className="flex-col items-start gap-2 text-sm p-4">
        <div className="flex gap-2 leading-none font-medium">
          Best coverage on Friday with 24 hours <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing daily data coverage for the current week
        </div>
      </CardFooter>
    </Card>
  )
}
