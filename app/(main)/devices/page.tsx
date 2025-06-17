"use client";

import { useState } from "react";
import { ArrowUpRight, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import SectionHeader from "@/components/layouts/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddDeviceDialog from "@/components/dialogs/add-device";
import AddParameterDialog from "@/components/dialogs/add-parameter";

interface Project {
  id: string;
  name: string;
}

interface Parameter {
  id: string;
  name: string;
  key: string;
  value: string;
  deviceType: "gauge" | "text" | "on/off";
  minValue?: number;
  maxValue?: number;
  unit?: string;
}

interface Device {
  id: string;
  projectId: string;
  name: string;
  deviceId: string;
  imei: string;
  simId: string;
  modbusId: string;
  lat: number;
  lon: number;
  parameters: Parameter[];
}

const initialProjects: Project[] = [
  { id: "P-1001", name: "Solar Energy Initiative" },
  { id: "P-1002", name: "Water Conservation System" },
  { id: "P-1003", name: "Smart Industrial Grid" },
  { id: "P-1004", name: "Textile Automation Project" },
  { id: "P-1005", name: "Steel Production Monitoring" },
];

const initialDevices: Device[] = [
  {
    id: "D-1001",
    projectId: "P-1001",
    name: "Chandrapur Solar Monitor",
    deviceId: "DID-1001",
    imei: "123456789012301",
    simId: "SIM-1001",
    modbusId: "MID-1001",
    lat: 19.9615,
    lon: 79.2961,
    parameters: [
      {
        id: "PAR-1001",
        name: "Solar Power Output",
        key: "power",
        value: "450",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 1000,
        unit: "W",
      },
    ],
  },
  {
    id: "D-1002",
    projectId: "P-1002",
    name: "Raipur Water Sensor",
    deviceId: "DID-1002",
    imei: "123456789012302",
    simId: "SIM-1002",
    modbusId: "MID-1002",
    lat: 21.2514,
    lon: 81.6296,
    parameters: [
      {
        id: "PAR-1002",
        name: "Water Flow Rate",
        key: "flow",
        value: "12",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 50,
        unit: "L/min",
      },
    ],
  },
  {
    id: "D-1003",
    projectId: "P-1003",
    name: "Kolkata Grid Controller",
    deviceId: "DID-1003",
    imei: "123456789012303",
    simId: "SIM-1003",
    modbusId: "MID-1003",
    lat: 22.5726,
    lon: 88.3639,
    parameters: [
      {
        id: "PAR-1003",
        name: "Voltage Level",
        key: "voltage",
        value: "220",
        deviceType: "gauge",
        minValue: 180,
        maxValue: 250,
        unit: "V",
      },
    ],
  },
  {
    id: "D-1004",
    projectId: "P-1001",
    name: "Jamnagar Solar Tracker",
    deviceId: "DID-1004",
    imei: "123456789012304",
    simId: "SIM-1004",
    modbusId: "MID-1004",
    lat: 22.4707,
    lon: 70.0577,
    parameters: [
      {
        id: "PAR-1004",
        name: "Panel Angle",
        key: "angle",
        value: "30",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 90,
        unit: "°",
      },
    ],
  },
  {
    id: "D-1005",
    projectId: "P-1005",
    name: "Bhilai Furnace Monitor",
    deviceId: "DID-1005",
    imei: "123456789012305",
    simId: "SIM-1005",
    modbusId: "MID-1005",
    lat: 21.1938,
    lon: 81.3509,
    parameters: [
      {
        id: "PAR-1005",
        name: "Temperature",
        key: "temp",
        value: "1200",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 2000,
        unit: "°C",
      },
    ],
  },
  {
    id: "D-1006",
    projectId: "P-1003",
    name: "Pune Motor Controller",
    deviceId: "DID-1006",
    imei: "123456789012306",
    simId: "SIM-1006",
    modbusId: "MID-1006",
    lat: 18.5204,
    lon: 73.8567,
    parameters: [
      {
        id: "PAR-1006",
        name: "Motor Speed",
        key: "speed",
        value: "1500",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 3000,
        unit: "RPM",
      },
    ],
  },
  {
    id: "D-1007",
    projectId: "P-1002",
    name: "Vizag Water Pump",
    deviceId: "DID-1007",
    imei: "123456789012307",
    simId: "SIM-1007",
    modbusId: "MID-1007",
    lat: 17.6868,
    lon: 83.2185,
    parameters: [
      {
        id: "PAR-1007",
        name: "Pressure",
        key: "pressure",
        value: "5",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 10,
        unit: "bar",
      },
    ],
  },
  {
    id: "D-1008",
    projectId: "P-1005",
    name: "Ludhiana Casting Sensor",
    deviceId: "DID-1008",
    imei: "123456789012308",
    simId: "SIM-1008",
    modbusId: "MID-1008",
    lat: 30.9010,
    lon: 75.8573,
    parameters: [
      {
        id: "PAR-1008",
        name: "Mold Temperature",
        key: "mold_temp",
        value: "800",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 1000,
        unit: "°C",
      },
    ],
  },
  {
    id: "D-1009",
    projectId: "P-1004",
    name: "Surat Loom Monitor",
    deviceId: "DID-1009",
    imei: "123456789012309",
    simId: "SIM-1009",
    modbusId: "MID-1009",
    lat: 21.1702,
    lon: 72.8311,
    parameters: [
      {
        id: "PAR-1009",
        name: "Loom Speed",
        key: "loom_speed",
        value: "200",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 500,
        unit: "SPM",
      },
    ],
  },
  {
    id: "D-1010",
    projectId: "P-1002",
    name: "Kochi Chemical Sensor",
    deviceId: "DID-1010",
    imei: "123456789012310",
    simId: "SIM-1010",
    modbusId: "MID-1010",
    lat: 9.9312,
    lon: 76.2673,
    parameters: [
      {
        id: "PAR-1010",
        name: "pH Level",
        key: "ph",
        value: "7",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 14,
        unit: "",
      },
    ],
  },
  {
    id: "D-1011",
    projectId: "P-1005",
    name: "Jamshedpur Steel Sensor",
    deviceId: "DID-1011",
    imei: "123456789012311",
    simId: "SIM-1011",
    modbusId: "MID-1011",
    lat: 22.8046,
    lon: 86.2029,
    parameters: [
      {
        id: "PAR-1011",
        name: "Steel Thickness",
        key: "thickness",
        value: "2",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 10,
        unit: "mm",
      },
    ],
  },
  {
    id: "D-1012",
    projectId: "P-1003",
    name: "Nagpur Grid Stabilizer",
    deviceId: "DID-1012",
    imei: "123456789012312",
    simId: "SIM-1012",
    modbusId: "MID-1012",
    lat: 21.1458,
    lon: 79.0882,
    parameters: [
      {
        id: "PAR-1012",
        name: "Current Load",
        key: "current",
        value: "50",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 100,
        unit: "A",
      },
    ],
  },
  {
    id: "D-1013",
    projectId: "P-1001",
    name: "Bengaluru Solar Inverter",
    deviceId: "DID-1013",
    imei: "123456789012313",
    simId: "SIM-1013",
    modbusId: "MID-1013",
    lat: 12.9716,
    lon: 77.5946,
    parameters: [
      {
        id: "PAR-1013",
        name: "Inverter Efficiency",
        key: "efficiency",
        value: "95",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 100,
        unit: "%",
      },
    ],
  },
  {
    id: "D-1014",
    projectId: "P-1004",
    name: "Ahmedabad Plastic Sensor",
    deviceId: "DID-1014",
    imei: "123456789012314",
    simId: "SIM-1014",
    modbusId: "MID-1014",
    lat: 23.0225,
    lon: 72.5714,
    parameters: [
      {
        id: "PAR-1014",
        name: "Extrusion Rate",
        key: "extrusion",
        value: "100",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 200,
        unit: "kg/h",
      },
    ],
  },
  {
    id: "D-1015",
    projectId: "P-1003",
    name: "Noida Power Monitor",
    deviceId: "DID-1015",
    imei: "123456789012315",
    simId: "SIM-1015",
    modbusId: "MID-1015",
    lat: 28.5355,
    lon: 77.3910,
    parameters: [
      {
        id: "PAR-1015",
        name: "Power Consumption",
        key: "consumption",
        value: "300",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 500,
        unit: "kW",
      },
    ],
  },
  {
    id: "D-1016",
    projectId: "P-1002",
    name: "Haridwar Water Analyzer",
    deviceId: "DID-1016",
    imei: "123456789012316",
    simId: "SIM-1016",
    modbusId: "MID-1016",
    lat: 29.9457,
    lon: 78.1642,
    parameters: [
      {
        id: "PAR-1016",
        name: "Turbidity",
        key: "turbidity",
        value: "5",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 100,
        unit: "NTU",
      },
    ],
  },
  {
    id: "D-1017",
    projectId: "P-1005",
    name: "Rourkela Alloy Sensor",
    deviceId: "DID-1017",
    imei: "123456789012317",
    simId: "SIM-1017",
    modbusId: "MID-1017",
    lat: 22.2604,
    lon: 84.8536,
    parameters: [
      {
        id: "PAR-1017",
        name: "Alloy Composition",
        key: "composition",
        value: "Fe: 70%",
        deviceType: "text",
        unit: "",
      },
    ],
  },
  {
    id: "D-1018",
    projectId: "P-1002",
    name: "Indore Food Sensor",
    deviceId: "DID-1018",
    imei: "123456789012318",
    simId: "SIM-1018",
    modbusId: "MID-1018",
    lat: 22.7196,
    lon: 75.8577,
    parameters: [
      {
        id: "PAR-1018",
        name: "Humidity",
        key: "humidity",
        value: "60",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 100,
        unit: "%",
      },
    ],
  },
  {
    id: "D-1019",
    projectId: "P-1003",
    name: "Ranchi Mining Monitor",
    deviceId: "DID-1019",
    imei: "123456789012319",
    simId: "SIM-1019",
    modbusId: "MID-1019",
    lat: 23.3441,
    lon: 85.3096,
    parameters: [
      {
        id: "PAR-1019",
        name: "Vibration Level",
        key: "vibration",
        value: "0.5",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 2,
        unit: "mm/s",
      },
    ],
  },
  {
    id: "D-1020",
    projectId: "P-1004",
    name: "Madurai Textile Sensor",
    deviceId: "DID-1020",
    imei: "123456789012320",
    simId: "SIM-1020",
    modbusId: "MID-1020",
    lat: 9.9252,
    lon: 78.1198,
    parameters: [
      {
        id: "PAR-1020",
        name: "Thread Tension",
        key: "tension",
        value: "100",
        deviceType: "gauge",
        minValue: 0,
        maxValue: 200,
        unit: "N",
      },
    ],
  },
];

export default function DeviceManagementPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;


  // Filter devices based on search term
  const filteredDevices = devices.filter((device) => {
    const name = device.name.toLowerCase();
    const deviceId = device.deviceId.toLowerCase();
    const imei = device.imei.toLowerCase();
    const modbusId = device.modbusId.toLowerCase();
    const projectName =
      initialProjects
        .find((proj) => proj.id === device.projectId)
        ?.name.toLowerCase() || "";
    return (
      name.includes(searchTerm.toLowerCase()) ||
      deviceId.includes(searchTerm.toLowerCase()) ||
      imei.includes(searchTerm.toLowerCase()) ||
      modbusId.includes(searchTerm.toLowerCase()) ||
      projectName.includes(searchTerm.toLowerCase())
    );
  });

  // Calculate pagination
  const totalItems = filteredDevices.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDevices = filteredDevices.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddDevice = (newDevice: Device) => {
    setDevices((prev) => [...prev, newDevice]);
  };

  const handleDeleteDevice = (deviceId: string) => {
    setDevices((prev) => prev.filter((device) => device.id !== deviceId));
  };

  const handleAddParameter = (deviceId: string, newParameter: Parameter) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId
          ? { ...device, parameters: [...device.parameters, newParameter] }
          : device
      )
    );
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="DEVICE MANAGEMENT"
        description="Manage your organization's devices — add, edit, or remove devices with ease."
        actions={
          <>
            <Input
              placeholder="Search devices..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
            <div className="h-8 border-l" />
            <AddDeviceDialog
              projects={initialProjects}
              onAddDevice={handleAddDevice}
            />
          </>
        }
      />

      <Card className="p-0 gap-0 border-none bg-transparent">
        <CardContent className="p-0 rounded-lg bg-card border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableHead>Sr. No.</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Device ID</TableHead>
                <TableHead>IMEI Number</TableHead>
                <TableHead>MID</TableHead>
                <TableHead className="text-center">Parameter</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
              {paginatedDevices.map((device, index) => (
                <TableRow
                  key={device.id}
                  className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
                >
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell className="font-medium p-0">
                    <Link
                      href={`/devices/${device.deviceId}`}
                      className="text-primary hover:underline flex w-full h-13 hover:bg-accent items-center justify-center"
                    >
                      <span className="flex">
                        {device.name}
                        <ArrowUpRight size={20} />
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell>{device.deviceId}</TableCell>
                  <TableCell>{device.imei}</TableCell>
                  <TableCell>{device.modbusId}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <AddParameterDialog
                        deviceId={device.id}
                        onAddParameter={handleAddParameter}
                      />
                      <Button size="icon" variant="ghost" title="Edit Device">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button size="icon" variant="ghost" title="Edit Device">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        title="Delete Device"
                        onClick={() => handleDeleteDevice(device.id)}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between items-center pt-4">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} devices
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}