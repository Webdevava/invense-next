"use client"

import { useId, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

interface Panel {
  id: string
  panelName: string
  panelId: string
  lat: number
  lon: number
  locationId: string
  panelType: "energy" | "water" | "transformer" | "motor"
  installationDate?: string
  updateInterval: number
}

interface Location {
  id: string
  name: string
}

interface AddPanelDialogProps {
  locations: Location[]
  onAddPanel: (panel: Panel) => void
}

export default function AddPanelDialog({ locations, onAddPanel }: AddPanelDialogProps) {
  const id = useId()
  const [locationId, setLocationId] = useState<string>("")
  const [panelName, setPanelName] = useState<string>("")
  const [latitude, setLatitude] = useState<string>("")
  const [longitude, setLongitude] = useState<string>("")
  const [installationDate, setInstallationDate] = useState<Date | undefined>(undefined)
  const [panelType, setPanelType] = useState<"energy" | "water" | "transformer" | "motor" | "">("")
  const [updateInterval, setUpdateInterval] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (locationId && panelType && latitude && longitude && updateInterval) {
      onAddPanel({
        id: `P-${Date.now()}`,
        panelName,
        panelId: `PID-${Date.now()}`,
        lat: parseFloat(latitude),
        lon: parseFloat(longitude),
        locationId,
        panelType: panelType as "energy" | "water" | "transformer" | "motor",
        installationDate: installationDate ? format(installationDate, "yyyy-MM-dd") : undefined,
        updateInterval: parseInt(updateInterval),
      })
      setLocationId("")
      setPanelName("")
      setLatitude("")
      setLongitude("")
      setInstallationDate(undefined)
      setPanelType("")
      setUpdateInterval("")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus />
          Add Panel
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Add Panel
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Enter details to add a new panel, including location, panel name, coordinates, type, installation date, and update interval.
        </DialogDescription>
        <div className="overflow-y-auto">
          <div className="px-6 pt-4 pb-6">
            <form id={`${id}-form`} className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor={`${id}-location`}>Location</Label>
                <Select value={locationId} onValueChange={setLocationId} required>
                  <SelectTrigger id={`${id}-location`} className="w-full">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-panel-name`}>Panel Name</Label>
                <Input
                  id={`${id}-panel-name`}
                  placeholder="Solar Panel 1"
                  type="text"
                  value={panelName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPanelName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-latitude`}>Latitude</Label>
                  <Input
                    id={`${id}-latitude`}
                    placeholder="40.7128"
                    type="number"
                    step="any"
                    value={latitude}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLatitude(e.target.value)}
                    required
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-longitude`}>Longitude</Label>
                  <Input
                    id={`${id}-longitude`}
                    placeholder="-74.0060"
                    type="number"
                    step="any"
                    value={longitude}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLongitude(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-panel-type`}>Panel Type</Label>
                <Select
                  value={panelType}
                  onValueChange={(value: "energy" | "water" | "transformer" | "motor") => setPanelType(value)}
                  required
                >
                  <SelectTrigger id={`${id}-panel-type`} className="w-full">
                    <SelectValue placeholder="Select a panel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="energy">Energy</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="transformer">Transformer</SelectItem>
                    <SelectItem value="motor">Motor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-installation-date`}>Installation Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id={`${id}-installation-date`}
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {installationDate ? format(installationDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={installationDate}
                      onSelect={setInstallationDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-update-interval`}>Update Interval (seconds)</Label>
                <Input
                  id={`${id}-update-interval`}
                  placeholder="60"
                  type="number"
                  min="1"
                  value={updateInterval}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdateInterval(e.target.value)}
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
            <Button type="submit" form={`${id}-form`}>
              Save Panel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}