'use client'
import React, { useState } from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export const AlertsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const alerts = [
    {
      id: 1,
      title: "Temperature Spike",
      severity: "critical",
      status: "active",
      timestamp: "2024-06-03 15:00:00",
      source: "iot-001"
    },
    {
      id: 2,
      title: "Low Battery",
      severity: "warning",
      status: "acknowledged",
      timestamp: "2024-06-03 14:55:00",
      source: "iot-042"
    },
    {
      id: 3,
      title: "Signal Loss",
      severity: "warning",
      status: "active",
      timestamp: "2024-06-03 14:50:00",
      source: "iot-014"
    },
    {
      id: 4,
      title: "Firmware Update",
      severity: "info",
      status: "resolved",
      timestamp: "2024-06-03 14:45:00",
      source: "iot-077"
    },
    {
      id: 5,
      title: "Humidity Threshold",
      severity: "critical",
      status: "investigating",
      timestamp: "2024-06-03 14:40:00",
      source: "iot-008"
    },
    {
      id: 6,
      title: "Device Restarted",
      severity: "info",
      status: "resolved",
      timestamp: "2024-06-03 14:35:00",
      source: "iot-029"
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
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
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
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

  // Filter alerts based on search term
  const filteredAlerts = alerts.filter((alert) =>
    [alert.title, alert.source, alert.status].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Card className="space-y-2 gap-0 p-3 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">IoT Device Alerts</h3>
        <Input
          type="text"
          placeholder="Search alerts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-48 text-sm"
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b">
              <th className="text-left p-2 font-medium">Device</th>
              <th className="text-left p-2 font-medium">Alert</th>
              <th className="text-left p-2 font-medium">Severity</th>
              <th className="text-left p-2 font-medium">Status</th>
              <th className="text-right p-2 font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.slice(0, 5).map((alert) => (
              <tr key={alert.id} className="border-b hover:bg-muted/50 transition-colors">
                <td className="p-2 font-mono text-xs">{alert.source}</td>
                <td className="text-xs text-muted-foreground truncate p-2">{alert.title}</td>
                <td className="p-2">{getSeverityBadge(alert.severity)}</td>
                <td className="p-2">{getStatusBadge(alert.status)}</td>
                <td className="p-2 text-right font-mono text-xs">
                  {alert.timestamp.split(' ')[1]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        Showing {filteredAlerts.length > 5 ? 'latest 5' : filteredAlerts.length} of {filteredAlerts.length} IoT alerts
      </div>
    </Card>
  );
};