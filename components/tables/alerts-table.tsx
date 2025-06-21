'use client'
import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle, Search } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '../ui/separator';

export const AlertsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const alerts = [
    {
      id: 1,
      panelNo: "PNL-001",
      device: "iot-001",
      alertType: "Temperature",
      message: "Temperature Spike Detected",
      status: "active",
      priority: "critical",
      timestamp: "2024-06-03 15:00:00"
    },
    {
      id: 2,
      panelNo: "PNL-002",
      device: "iot-042",
      alertType: "Battery",
      message: "Low Battery Level",
      status: "acknowledged",
      priority: "warning",
      timestamp: "2024-06-03 14:55:00"
    },
    {
      id: 3,
      panelNo: "PNL-003",
      device: "iot-014",
      alertType: "Signal",
      message: "Signal Loss Detected",
      status: "active",
      priority: "warning",
      timestamp: "2024-06-03 14:50:00"
    },
    {
      id: 4,
      panelNo: "PNL-004",
      device: "iot-077",
      alertType: "Firmware",
      message: "Firmware Update Completed",
      status: "resolved",
      priority: "info",
      timestamp: "2024-06-03 14:45:00"
    },
    {
      id: 5,
      panelNo: "PNL-005",
      device: "iot-008",
      alertType: "Humidity",
      message: "Humidity Threshold Exceeded",
      status: "investigating",
      priority: "critical",
      timestamp: "2024-06-03 14:40:00"
    },
    {
      id: 6,
      panelNo: "PNL-006",
      device: "iot-029",
      alertType: "System",
      message: "Device Restarted Unexpectedly",
      status: "resolved",
      priority: "info",
      timestamp: "2024-06-03 14:35:00"
    }
  ];

  const getPriorityBadge = (priority: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | null | undefined> | null | undefined) => {
    switch (priority) {
      case 'critical':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Critical
          </Badge>
        );
      case 'warning':
        return (
          <Badge variant="secondary" className="flex items-center gap-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <AlertCircle className="w-3 h-3" />
            Warning
          </Badge>
        );
      case 'info':
        return (
          <Badge variant="outline" className="flex items-center gap-1 text-blue-600 border-blue-200">
            <Info className="w-3 h-3" />
            Info
          </Badge>
        );
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | null | undefined> | null | undefined) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-red-500 hover:bg-red-600">Active</Badge>;
      case 'acknowledged':
        return <Badge className="bg-orange-500 hover:bg-orange-600">Acknowledged</Badge>;
      case 'investigating':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Investigating</Badge>;
      case 'resolved':
        return (
          <Badge className="bg-green-500 hover:bg-green-600 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Resolved
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Filter alerts based on search term across all relevant fields
  const filteredAlerts = alerts.filter((alert) =>
    [
      alert.panelNo,
      alert.device,
      alert.alertType,
      alert.message,
      alert.status,
      alert.priority
    ].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const SearchBar = () => (
    <div className="relative w-64">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search alerts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  );

  return (
    <Card className="gap-0 p-0 rounded-lg flex flex-col justify-between overflow-hidden">
      <CardHeader className="flex items-center justify-between p-2">
        <CardTitle>Alerts</CardTitle>
        <SearchBar />
      </CardHeader>
      <Separator />
      <CardContent className="p-2 w-full flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b">
              <th className="text-left p-2 font-medium">Panel No</th>
              <th className="text-left p-2 font-medium">Device</th>
              <th className="text-left p-2 font-medium">Alert Type</th>
              <th className="text-left p-2 font-medium">Message</th>
              <th className="text-left p-2 font-medium">Status</th>
              <th className="text-left p-2 font-medium">Priority</th>
              <th className="text-right p-2 font-medium">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.slice(0, 5).map((alert) => (
              <tr key={alert.id} className="border-b hover:bg-muted/50 transition-colors">
                <td className="p-2 font-mono text-xs">{alert.panelNo}</td>
                <td className="p-2 font-mono text-xs">{alert.device}</td>
                <td className="p-2 text-xs">{alert.alertType}</td>
                <td className="p-2 text-xs text-muted-foreground truncate">{alert.message}</td>
                <td className="p-2">{getStatusBadge(alert.status)}</td>
                <td className="p-2">{getPriorityBadge(alert.priority)}</td>
                <td className="p-2 text-right font-mono text-xs">
                  {alert.timestamp.split(' ')[1]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
      <Separator />
      <CardFooter className="text-xs text-muted-foreground text-center p-2">
        Showing {filteredAlerts.length > 5 ? 'latest 5' : filteredAlerts.length} of {filteredAlerts.length} IoT alerts
      </CardFooter>
    </Card>
  );
};