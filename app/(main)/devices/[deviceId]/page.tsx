"use client";
import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  AlertTriangle,
  MapPin,
  Package,
  Calendar,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import InfoWidget from "@/components/cards/info-widget";
import SectionHeader from "@/components/layouts/section-header";
import { StatsGrid } from "@/components/layouts/stats-grid";

interface DateTimePickerProps {
  date?: Date;
  onDateChange: (date?: Date) => void;
  placeholder: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  date,
  onDateChange,
  placeholder,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`w-full justify-start text-left font-normal ${
            !date && "text-muted-foreground"
          }`}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP p") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
        />
        {date && (
          <div className="p-3 border-t">
            <input
              type="time"
              className="w-full p-2 border rounded"
              value={date ? format(date, "HH:mm") : ""}
              onChange={(e) => {
                if (date && e.target.value) {
                  const [hours, minutes] = e.target.value.split(":");
                  const newDate = new Date(date);
                  newDate.setHours(parseInt(hours), parseInt(minutes));
                  onDateChange(newDate);
                }
              }}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

interface Event {
  id: number;
  timestamp: string;
  type: string;
  description: string;
}

const EventHistory: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setEvents([
        {
          id: 1,
          timestamp: "2025-06-16T10:30:00Z",
          type: "System Start",
          description: "Solar panel system initiated",
        },
        {
          id: 2,
          timestamp: "2025-06-16T11:15:00Z",
          type: "Power Output",
          description: "Peak power generation reached",
        },
        {
          id: 3,
          timestamp: "2025-06-16T12:45:00Z",
          type: "Maintenance",
          description: "Routine cleaning completed",
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <h1 className="text-lg mb-2">Event History</h1>
      <div className="space-y-4 bg-card p-4 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Start Date & Time
            </label>
            <DateTimePicker
              date={startDate}
              onDateChange={setStartDate}
              placeholder="Pick start date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              End Date & Time
            </label>
            <DateTimePicker
              date={endDate}
              onDateChange={setEndDate}
              placeholder="Pick end date"
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </div>

        {events.length > 0 && (
          <div className="bg-white rounded-lg border">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Event History</h3>
            </div>
            <div className="divide-y">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-4 flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{event.type}</div>
                    <div className="text-sm text-gray-600">
                      {event.description}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(event.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface Alert {
  id: number;
  timestamp: string;
  severity: string;
  type: string;
  description: string;
}

const AlertHistory: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAlerts([
        {
          id: 1,
          timestamp: "2025-06-16T09:15:00Z",
          severity: "High",
          type: "Temperature Alert",
          description: "Panel temperature exceeded 85°C",
        },
        {
          id: 2,
          timestamp: "2025-06-16T10:22:00Z",
          severity: "Medium",
          type: "Power Warning",
          description: "Output dropped below expected threshold",
        },
        {
          id: 3,
          timestamp: "2025-06-16T11:30:00Z",
          severity: "Low",
          type: "Maintenance Due",
          description: "Scheduled maintenance reminder",
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case "High":
        return "text-red-600 bg-red-50 border-red-200";
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Low":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div>
      <h1 className="text-lg mb-2">Alert History</h1>
      <div className="space-y-4 bg-card p-4 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Start Date & Time
            </label>
            <DateTimePicker
              date={startDate}
              onDateChange={setStartDate}
              placeholder="Pick start date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              End Date & Time
            </label>
            <DateTimePicker
              date={endDate}
              onDateChange={setEndDate}
              placeholder="Pick end date"
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </div>

        {alerts.length > 0 && (
          <div className="bg-white rounded-lg border">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Alert History</h3>
            </div>
            <div className="divide-y">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(
                          alert.severity
                        )}`}
                      >
                        {alert.severity}
                      </span>
                      <span className="font-medium">{alert.type}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(alert.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {alert.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DeviceDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("live-updates");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Handle URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", value);
    window.history.pushState({}, "", url);
  };

  return (
    <div className="space-y-6 min-h-screen">
      <SectionHeader
        title="Solar Panel"
        description="device-id: 653d43ddfsdf3dsd55"
      />

      <StatsGrid
        stats={[
          {
            title: "Sub Locations",
            value: "21",
            description: "Total no. of sub locations",
            icon: MapPin,
          },
          {
            title: "Assets",
            value: "8",
            description: "Total no. of assets",
            icon: Package,
          },
          {
            title: "Warnings",
            value: "3",
            description: "Total no. of warnings",
            icon: AlertTriangle,
          },
          {
            title: "Alerts",
            value: "5",
            description: "Total no. of alerts",
            icon: AlertCircle,
          },
        ]}
      />

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="gap-3">
          <TabsTrigger value="live-updates">Live Updates</TabsTrigger>
          <TabsTrigger value="event-history">Event History</TabsTrigger>
          <TabsTrigger value="alert-history">Alert History</TabsTrigger>
        </TabsList>

        <TabsContent value="live-updates" className="p-2">
          <div className="flex items-center justify-end mb-4">
            <Label htmlFor="expanded-mode" className="mr-2">
              Expanded Mode
            </Label>
            <Switch
              id="expanded-mode"
              checked={isExpanded}
              onCheckedChange={setIsExpanded}
            />
          </div>
          <div
            className={
              isExpanded
                ? "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4"
                : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            }
          >
            <InfoWidget
              name="Temperature"
              value="23.5"
              unit="°C"
              key="T001"
              type="text"
              timestamp="2025-06-16T10:47:20Z"
              isBig={isExpanded}
            />
            <InfoWidget
              name="CPU Usage"
              value={35}
              unit="%"
              key="CPU01"
              type="gauge"
              min={0}
              max={100}
              timestamp="2025-06-16T10:47:20Z"
              isBig={isExpanded}
            />
            <InfoWidget
              name="Memory"
              value={68}
              unit="%"
              key="MEM01"
              type="gauge"
              min={0}
              max={100}
              timestamp="2025-06-16T10:47:20Z"
              isBig={isExpanded}
            />
            <InfoWidget
              name="Storage"
              value={89}
              unit="%"
              key="DSK01"
              type="gauge"
              min={0}
              max={100}
              timestamp="2025-06-16T10:47:20Z"
              isBig={isExpanded}
            />
            <InfoWidget
              name="Main Power"
              key="PWR01"
              type="on/off"
              isActive={true}
              timestamp="2025-06-16T10:47:20Z"
              isBig={isExpanded}
            />
            <InfoWidget
              name="Backup System"
              key="PWR02"
              type="on/off"
              isActive={false}
              timestamp="2025-06-16T10:47:20Z"
              isBig={isExpanded}
            />
          </div>
        </TabsContent>

        <TabsContent value="event-history" className="p-2">
          <EventHistory />
        </TabsContent>

        <TabsContent value="alert-history" className="p-2">
          <AlertHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeviceDetails;