'use client'
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const MaintenanceTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const maintenanceTasks = [
    {
      id: 1,
      deviceId: "iot-001",
      task: "Firmware Update",
      severity: "critical",
      status: "pending",
      lastChecked: "2024-06-03 12:00:00",
      nextDue: "2024-06-05 12:00:00"
    },
    {
      id: 2,
      deviceId: "iot-002",
      task: "Battery Check",
      severity: "warning",
      status: "in_progress",
      lastChecked: "2024-06-02 10:30:00",
      nextDue: "2024-06-04 10:30:00"
    },
    {
      id: 3,
      deviceId: "iot-003",
      task: "Sensor Calibration",
      severity: "info",
      status: "completed",
      lastChecked: "2024-06-01 08:00:00",
      nextDue: "2024-06-30 08:00:00"
    },
    {
      id: 4,
      deviceId: "iot-004",
      task: "Connectivity Test",
      severity: "warning",
      status: "pending",
      lastChecked: "2024-06-03 11:00:00",
      nextDue: "2024-06-06 11:00:00"
    },
    {
      id: 5,
      deviceId: "iot-005",
      task: "Security Patch",
      severity: "critical",
      status: "in_progress",
      lastChecked: "2024-06-03 09:15:00",
      nextDue: "2024-06-04 09:15:00"
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
      case 'pending':
        return <Badge className="bg-red-500 hover:bg-red-600">Pending</Badge>;
      case 'in_progress':
        return <Badge className="bg-orange-500 hover:bg-orange-600">In Progress</Badge>;
      case 'completed':
        return (
          <Badge className="bg-green-500 hover:bg-green-600 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Completed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Filter tasks based on search term
  const filteredTasks = maintenanceTasks.filter((task) =>
    [task.deviceId, task.task, task.status].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Card className="space-y-2 gap-0 p-3 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Device Maintenance</h3>
        <Input
          type="text"
          placeholder="Search tasks..."
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
              <th className="text-left p-2 font-medium">Task</th>
              <th className="text-left p-2 font-medium">Severity</th>
              <th className="text-left p-2 font-medium">Status</th>
              <th className="text-right p-2 font-medium">Last Checked</th>
              {/* <th className="text-right p-2 font-medium">Next Due</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className="border-b hover:bg-muted/50 transition-colors">
                <td className="p-2 font-mono text-xs">{task.deviceId}</td>
                <td className="text-xs text-muted-foreground truncate p-2">{task.task}</td>
                <td className="p-2">{getSeverityBadge(task.severity)}</td>
                <td className="p-2">{getStatusBadge(task.status)}</td>
                <td className="p-2 text-right text-xs font-mono">{task.lastChecked.split(' ')[1]}</td>
                {/* <td className="p-2 text-right text-xs font-mono">{task.nextDue.split(' ')[1]}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        Showing {filteredTasks.length} maintenance tasks
      </div>
    </Card>
  );
};