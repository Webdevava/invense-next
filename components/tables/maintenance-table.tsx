'use client'
import React, { useState } from 'react';
import { Wrench, CheckCircle, Clock, XCircle, Search } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '../ui/separator';

export const MaintenanceTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const maintenanceRecords = [
    {
      id: 1,
      panelNo: "PNL-001",
      device: "iot-001",
      type: "Calibration",
      status: "completed",
      scheduled: "2024-06-03 09:00:00",
      completed: "2024-06-03 11:30:00",
      technician: "John Doe",
      notes: "Adjusted sensor alignment"
    },
    {
      id: 2,
      panelNo: "PNL-002",
      device: "iot-042",
      type: "Battery Replacement",
      status: "scheduled",
      scheduled: "2024-06-04 14:00:00",
      completed: null,
      technician: "Jane Smith",
      notes: "Replace with high-capacity battery"
    },
    {
      id: 3,
      panelNo: "PNL-003",
      device: "iot-014",
      type: "Firmware Update",
      status: "in-progress",
      scheduled: "2024-06-03 13:00:00",
      completed: null,
      technician: "Mike Johnson",
      notes: "Updating to v2.3.1"
    },
    {
      id: 4,
      panelNo: "PNL-004",
      device: "iot-077",
      type: "Inspection",
      status: "completed",
      scheduled: "2024-06-02 10:00:00",
      completed: "2024-06-02 12:00:00",
      technician: "Sarah Brown",
      notes: "All components functional"
    },
    {
      id: 5,
      panelNo: "PNL-005",
      device: "iot-008",
      type: "Repair",
      status: "cancelled",
      scheduled: "2024-06-01 15:00:00",
      completed: null,
      technician: "Tom Wilson",
      notes: "Cancelled due to device replacement"
    },
    {
      id: 6,
      panelNo: "PNL-006",
      device: "iot-029",
      type: "Cleaning",
      status: "scheduled",
      scheduled: "2024-06-05 08:00:00",
      completed: null,
      technician: "Lisa Davis",
      notes: "Clean sensor lenses"
    }
  ];

  const getStatusBadge = (status: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | null | undefined> | null | undefined) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-500 hover:bg-green-600 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Completed
          </Badge>
        );
      case 'scheduled':
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Scheduled
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 flex items-center gap-1">
            <Wrench className="w-3 h-3" />
            In Progress
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-500 hover:bg-red-600 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Filter maintenance records based on search term across all relevant fields
  const filteredRecords = maintenanceRecords.filter((record) =>
    [
      record.panelNo,
      record.device,
      record.type,
      record.status,
      record.technician,
      record.notes
    ].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const SearchBar = () => (
    <div className="relative w-64">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search maintenance records..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  );

  return (
    <Card className="gap-0 p-0 rounded-lg flex flex-col justify-between overflow-hidden">
      <CardHeader className="flex items-center justify-between p-2">
        <CardTitle>Maintenance Records</CardTitle>
        <SearchBar />
      </CardHeader>
      <Separator />
      <CardContent className="p-2 w-full flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b">
              <th className="text-left p-2 font-medium">Panel No</th>
              <th className="text-left p-2 font-medium">Device</th>
              <th className="text-left p-2 font-medium">Type</th>
              <th className="text-left p-2 font-medium">Status</th>
              <th className="text-left p-2 font-medium">Scheduled</th>
              <th className="text-left p-2 font-medium">Completed</th>
              <th className="text-left p-2 font-medium">Technician</th>
              <th className="text-left p-2 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.slice(0, 5).map((record) => (
              <tr key={record.id} className="border-b hover:bg-muted/50 transition-colors">
                <td className="p-2 font-mono text-xs">{record.panelNo}</td>
                <td className="p-2 font-mono text-xs">{record.device}</td>
                <td className="p-2 text-xs">{record.type}</td>
                <td className="p-2">{getStatusBadge(record.status)}</td>
                <td className="p-2 font-mono text-xs">{record.scheduled.split(' ')[1]}</td>
                <td className="p-2 font-mono text-xs">{record.completed ? record.completed.split(' ')[1] : '-'}</td>
                <td className="p-2 text-xs">{record.technician}</td>
                <td className="p-2 text-xs text-muted-foreground truncate">{record.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
      <Separator />
      <CardFooter className="text-xs text-muted-foreground text-center p-2">
        Showing {filteredRecords.length > 5 ? 'latest 5' : filteredRecords.length} of {filteredRecords.length} maintenance records
      </CardFooter>
    </Card>
  );
};