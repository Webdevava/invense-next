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

interface AddParameterDialogProps {
  deviceId: string;
  onAddParameter: (deviceId: string, newParameter: Parameter) => void;
}

export default function AddParameterDialog({
  deviceId,
  onAddParameter,
}: AddParameterDialogProps) {
  const id = useId();
  const [name, setName] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [deviceType, setDeviceType] = useState<"gauge" | "text" | "on/off">("gauge");
  const [minValue, setMinValue] = useState<string>("");
  const [maxValue, setMaxValue] = useState<string>("");
  const [unit, setUnit] = useState<string>("");

  const handleSubmit = () => {
    if (!name || !key || !value || !deviceType) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (deviceType === "gauge") {
      const minNum = minValue ? parseFloat(minValue) : undefined;
      const maxNum = maxValue ? parseFloat(maxValue) : undefined;

      if (
        (minValue && (minNum === undefined || isNaN(minNum))) ||
        (maxValue && (maxNum === undefined || isNaN(maxNum)))
      ) {
        toast.error("Min and Max values must be valid numbers for gauge type.");
        return;
      }

      if (minNum !== undefined && maxNum !== undefined && minNum >= maxNum) {
        toast.error("Min value must be less than Max value.");
        return;
      }
    }

    const newParameter: Parameter = {
      id: `PAR-${Date.now()}`,
      name,
      key,
      value,
      deviceType,
      minValue: minValue ? parseFloat(minValue) : undefined,
      maxValue: maxValue ? parseFloat(maxValue) : undefined,
      unit: unit || undefined,
    };

    onAddParameter(deviceId, newParameter);
    setName("");
    setKey("");
    setValue("");
    setDeviceType("gauge");
    setMinValue("");
    setMaxValue("");
    setUnit("");

    toast.success("Parameter added successfully.");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" title="Add Parameter">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Add Parameter
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Enter details to add a new parameter for the device.
        </DialogDescription>
        <div className="overflow-y-auto">
          <div className="px-6 pt-4 pb-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${id}-name`}>Parameter Name</Label>
                <Input
                  id={`${id}-name`}
                  placeholder="Parameter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-key`}>Key</Label>
                <Input
                  id={`${id}-key`}
                  placeholder="key"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-value`}>Value</Label>
                <Input
                  id={`${id}-value`}
                  placeholder="Value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-device-type`}>Device Type</Label>
                <Select
                  value={deviceType}
                  onValueChange={(value: "gauge" | "text" | "on/off") => setDeviceType(value)}
                >
                  <SelectTrigger id={`${id}-device-type`}>
                    <SelectValue placeholder="Select device type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gauge">Gauge</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="on/off">On/Off</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {deviceType === "gauge" && (
                <>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`${id}-min`}>Min Value</Label>
                      <Input
                        id={`${id}-min`}
                        placeholder="0"
                        type="number"
                        step="any"
                        value={minValue}
                        onChange={(e) => setMinValue(e.target.value)}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`${id}-max`}>Max Value</Label>
                      <Input
                        id={`${id}-max`}
                        placeholder="100"
                        type="number"
                        step="any"
                        value={maxValue}
                        onChange={(e) => setMaxValue(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${id}-unit`}>Unit</Label>
                    <Input
                      id={`${id}-unit`}
                      placeholder="Unit (e.g., W, L/min)"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </div>
                </>
              )}
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
              Add Parameter
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}