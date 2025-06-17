"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

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

interface AddDeviceDialogProps {
  projects: Project[];
  onAddDevice: (newDevice: Device) => void;
}

export default function AddDeviceDialog({
  projects,
  onAddDevice,
}: AddDeviceDialogProps) {
  const id = useId();
  const [projectId, setProjectId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [lat, setLat] = useState<string>("");
  const [lon, setLon] = useState<string>("");
  const [imei, setImei] = useState<string>("");
  const [simId, setSimId] = useState<string>("");
  const [modbusId, setModbusId] = useState<string>("");

  const handleSubmit = () => {
    if (!projectId || !name || !lat || !lon || !imei || !simId || !modbusId) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);

    if (isNaN(latNum) || isNaN(lonNum)) {
      toast.error("Latitude and Longitude must be valid numbers.");
      return;
    }

    if (latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180) {
      toast.error("Latitude must be between -90 and 90, and Longitude between -180 and 180.");
      return;
    }

    const newDevice: Device = {
      id: `D-${Date.now()}`,
      projectId,
      name,
      deviceId: `DID-${Date.now()}`,
      imei,
      simId,
      modbusId,
      lat: latNum,
      lon: lonNum,
      parameters: [],
    };

    onAddDevice(newDevice);
    setProjectId("");
    setName("");
    setLat("");
    setLon("");
    setImei("");
    setSimId("");
    setModbusId("");

    toast.success("Device added successfully.");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus />
          Add Device
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Add Device
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Enter details to add a new device, including project, name, location, and identifiers.
        </DialogDescription>
        <div className="overflow-y-auto">
          <div className="px-6 pt-4 pb-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${id}-project`}>Project Name</Label>
                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger id={`${id}-project`}>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-name`}>Device Name</Label>
                <Input
                  id={`${id}-name`}
                  placeholder="Device Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-lat`}>Latitude</Label>
                  <Input
                    id={`${id}-lat`}
                    placeholder="37.7749"
                    type="number"
                    step="any"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-lon`}>Longitude</Label>
                  <Input
                    id={`${id}-lon`}
                    placeholder="-122.4194"
                    type="number"
                    step="any"
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-imei`}>IMEI Number</Label>
                <Input
                  id={`${id}-imei`}
                  placeholder="123456789012345"
                  value={imei}
                  onChange={(e) => setImei(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-sim`}>SIM ID</Label>
                <Input
                  id={`${id}-sim`}
                  placeholder="SIM-1001"
                  value={simId}
                  onChange={(e) => setSimId(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-modbus`}>Modbus ID</Label>
                <Input
                  id={`${id}-modbus`}
                  placeholder="MID-1001"
                  value={modbusId}
                  onChange={(e) => setModbusId(e.target.value)}
                  required
                />
              </div>
            </form>
          </div>
        </div>
        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={handleSubmit}>
              Add Device
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}