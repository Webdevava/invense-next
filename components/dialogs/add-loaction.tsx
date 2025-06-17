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

interface Location {
  id: string
  companyName: string
  location: string
  lat: number
  lon: number
  projectName?: string
  installationDate?: string
}

interface Company {
  id: string
  name: string
}

interface AddLocationDialogProps {
  companies: Company[]
  onAddLocation: (location: Location) => void
}

export default function AddLocationDialog({ companies, onAddLocation }: AddLocationDialogProps) {
  const id = useId()
  const [companyId, setCompanyId] = useState<string>("")
  const [projectName, setProjectName] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [latitude, setLatitude] = useState<string>("")
  const [longitude, setLongitude] = useState<string>("")
  const [installationDate, setInstallationDate] = useState<Date | undefined>(undefined)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedCompany = companies.find((c) => c.id === companyId)
    if (selectedCompany && latitude && longitude) {
      onAddLocation({
        id: `C-${Date.now()}`,
        companyName: selectedCompany.name,
        location,
        lat: parseFloat(latitude),
        lon: parseFloat(longitude),
        projectName,
        installationDate: installationDate ? format(installationDate, "yyyy-MM-dd") : undefined,
      })
      setCompanyId("")
      setProjectName("")
      setLocation("")
      setLatitude("")
      setLongitude("")
      setInstallationDate(undefined)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus />
          Add Location
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Add Location
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Enter details to add a new location, including company, project name, coordinates, and installation date.
        </DialogDescription>
        <div className="overflow-y-auto">
          <div className="px-6 pt-4 pb-6">
            <form id={`${id}-form`} className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor={`${id}-company`}>Company</Label>
                <Select value={companyId} onValueChange={setCompanyId} required>
                  <SelectTrigger id={`${id}-company`} className="w-full">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-project-name`}>Project Name</Label>
                <Input
                  id={`${id}-project-name`}
                  placeholder="Project Alpha"
                  type="text"
                  value={projectName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-location`}>Location</Label>
                <Input
                  id={`${id}-location`}
                  placeholder="123 Business St, City, Country"
                  type="text"
                  value={location}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
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
              Save Location
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}