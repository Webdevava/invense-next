"use client"

import { useState } from "react"
import { Pencil, Trash } from "lucide-react"
import SectionHeader from "@/components/layouts/section-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AddPanelDialog from "@/components/dialogs/add-panel"

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

const initialItems: Panel[] = [
  {
    id: "P-1001",
    panelName: "Solar Array A",
    panelId: "PID-1001",
    lat: 19.9615,
    lon: 79.2961,
    locationId: "C-1001",
    panelType: "energy",
    installationDate: "2023-01-15",
    updateInterval: 60,
  },
  {
    id: "P-1002",
    panelName: "Steel Furnace Pump",
    panelId: "PID-1002",
    lat: 21.2514,
    lon: 81.6296,
    locationId: "C-1002",
    panelType: "water",
    installationDate: "2023-03-22",
    updateInterval: 30,
  },
  {
    id: "P-1003",
    panelName: "Textile Transformer",
    panelId: "PID-1003",
    lat: 22.5726,
    lon: 88.3639,
    locationId: "C-1003",
    panelType: "transformer",
    installationDate: "2023-06-10",
    updateInterval: 120,
  },
  {
    id: "P-1004",
    panelName: "Refinery Motor X",
    panelId: "PID-1004",
    lat: 22.4707,
    lon: 70.0577,
    locationId: "C-1004",
    panelType: "motor",
    installationDate: "2023-09-05",
    updateInterval: 45,
  },
  {
    id: "P-1005",
    panelName: "Energy Grid B",
    panelId: "PID-1005",
    lat: 21.1938,
    lon: 81.3509,
    locationId: "C-1005",
    panelType: "energy",
    installationDate: "2023-11-20",
    updateInterval: 90,
  },
  {
    id: "P-1006",
    panelName: "Auto Assembly Pump",
    panelId: "PID-1006",
    lat: 18.5204,
    lon: 73.8567,
    locationId: "C-1006",
    panelType: "water",
    installationDate: "2024-01-10",
    updateInterval: 60,
  },
  {
    id: "P-1007",
    panelName: "Shipyard Transformer",
    panelId: "PID-1007",
    lat: 17.6868,
    lon: 83.2185,
    locationId: "C-1007",
    panelType: "transformer",
    installationDate: "2024-02-15",
    updateInterval: 90,
  },
  {
    id: "P-1008",
    panelName: "Casting Motor Y",
    panelId: "PID-1008",
    lat: 30.9010,
    lon: 75.8573,
    locationId: "C-1008",
    panelType: "motor",
    installationDate: "2024-03-20",
    updateInterval: 30,
  },
  {
    id: "P-1009",
    panelName: "Textile Solar Unit",
    panelId: "PID-1009",
    lat: 21.1702,
    lon: 72.8311,
    locationId: "C-1009",
    panelType: "energy",
    installationDate: "2024-04-25",
    updateInterval: 120,
  },
  {
    id: "P-1010",
    panelName: "Chemical Pump Z",
    panelId: "PID-1010",
    lat: 9.9312,
    lon: 76.2673,
    locationId: "C-1010",
    panelType: "water",
    installationDate: "2024-05-30",
    updateInterval: 45,
  },
  {
    id: "P-1011",
    panelName: "Steel Motor A",
    panelId: "PID-1011",
    lat: 22.8046,
    lon: 86.2029,
    locationId: "C-1011",
    panelType: "motor",
    installationDate: "2024-06-05",
    updateInterval: 60,
  },
  {
    id: "P-1012",
    panelName: "Agro Transformer B",
    panelId: "PID-1012",
    lat: 21.1458,
    lon: 79.0882,
    locationId: "C-1012",
    panelType: "transformer",
    installationDate: "2024-07-10",
    updateInterval: 90,
  },
  {
    id: "P-1013",
    panelName: "Electronics Solar C",
    panelId: "PID-1013",
    lat: 12.9716,
    lon: 77.5946,
    locationId: "C-1013",
    panelType: "energy",
    installationDate: "2024-08-15",
    updateInterval: 30,
  },
  {
    id: "P-1014",
    panelName: "Plastic Pump D",
    panelId: "PID-1014",
    lat: 23.0225,
    lon: 72.5714,
    locationId: "C-1014",
    panelType: "water",
    installationDate: "2024-09-20",
    updateInterval: 120,
  },
  {
    id: "P-1015",
    panelName: "Furniture Motor E",
    panelId: "PID-1015",
    lat: 28.5355,
    lon: 77.3910,
    locationId: "C-1015",
    panelType: "motor",
    installationDate: "2024-10-25",
    updateInterval: 45,
  },
  {
    id: "P-1016",
    panelName: "Pharma Transformer F",
    panelId: "PID-1016",
    lat: 29.9457,
    lon: 78.1642,
    locationId: "C-1016",
    panelType: "transformer",
    installationDate: "2024-11-30",
    updateInterval: 60,
  },
  {
    id: "P-1017",
    panelName: "Alloy Solar G",
    panelId: "PID-1017",
    lat: 22.2604,
    lon: 84.8536,
    locationId: "C-1017",
    panelType: "energy",
    installationDate: "2025-01-05",
    updateInterval: 90,
  },
  {
    id: "P-1018",
    panelName: "Food Processing Pump H",
    panelId: "PID-1018",
    lat: 22.7196,
    lon: 75.8577,
    locationId: "C-1018",
    panelType: "water",
    installationDate: "2025-02-10",
    updateInterval: 30,
  },
  {
    id: "P-1019",
    panelName: "Mining Motor I",
    panelId: "PID-1019",
    lat: 23.3441,
    lon: 85.3096,
    locationId: "C-1019",
    panelType: "motor",
    installationDate: "2025-03-15",
    updateInterval: 120,
  },
  {
    id: "P-1020",
    panelName: "Textile Transformer J",
    panelId: "PID-1020",
    lat: 9.9252,
    lon: 78.1198,
    locationId: "C-1020",
    panelType: "transformer",
    installationDate: "2025-04-20",
    updateInterval: 45,
  },
]

const locations: Location[] = [
  { id: "C-1001", name: "Chandrapur, Maharashtra" },
  { id: "C-1002", name: "Raipur, Chhattisgarh" },
  { id: "C-1003", name: "Kolkata, West Bengal" },
  { id: "C-1004", name: "Jamnagar, Gujarat" },
  { id: "C-1005", name: "Bhilai, Chhattisgarh" },
  { id: "C-1006", name: "Pune, Maharashtra" },
  { id: "C-1007", name: "Visakhapatnam, Andhra Pradesh" },
  { id: "C-1008", name: "Ludhiana, Punjab" },
  { id: "C-1009", name: "Surat, Gujarat" },
  { id: "C-1010", name: "Kochi, Kerala" },
  { id: "C-1011", name: "Jamshedpur, Jharkhand" },
  { id: "C-1012", name: "Nagpur, Maharashtra" },
  { id: "C-1013", name: "Bengaluru, Karnataka" },
  { id: "C-1014", name: "Ahmedabad, Gujarat" },
  { id: "C-1015", name: "Noida, Uttar Pradesh" },
  { id: "C-1016", name: "Haridwar, Uttarakhand" },
  { id: "C-1017", name: "Rourkela, Odisha" },
  { id: "C-1018", name: "Indore, Madhya Pradesh" },
  { id: "C-1019", name: "Ranchi, Jharkhand" },
  { id: "C-1020", name: "Madurai, Tamil Nadu" },
]

export default function PanelsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [items, setItems] = useState<Panel[]>(initialItems)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10




  // Filter items based on search term
  const filteredItems = items.filter((item) => {
    const panelName = item.panelName?.toLowerCase() || ""
    const panelId = item.panelId?.toLowerCase() || ""
    const location = locations.find((loc) => loc.id === item.locationId)?.name.toLowerCase() || ""
    return (
      panelName.includes(searchTerm.toLowerCase()) ||
      panelId.includes(searchTerm.toLowerCase()) ||
      location.includes(searchTerm.toLowerCase())
    )
  })

  // Calculate pagination
  const totalItems = filteredItems.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = filteredItems.slice(startIndex, endIndex)

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleAddPanel = (newPanel: Panel) => {
    setItems((prev) => [...prev, newPanel])
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="PANELS MANAGEMENT"
        description="Manage your organization's panels — add, edit, or remove panels with ease."
        actions={
          <>
            <Input
              placeholder="Search panels..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
            <div className="h-8 border-l" />
            <AddPanelDialog
              locations={locations}
              onAddPanel={handleAddPanel}
            />
          </>
        }
      />

      <Card className="p-0 gap-0 border-none bg-transparent">
        <CardContent className="p-0 rounded-lg overflow-hidden bg-card border">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableHead>Sr. No.</TableHead>
                <TableHead>Panel</TableHead>
                <TableHead>Panel Id</TableHead>
                <TableHead>Latitude</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
              {paginatedItems.map((item, index) => (
                <TableRow
                  key={item.id}
                  className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
                >
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell className="font-medium">{item.panelName}</TableCell>
                  <TableCell>{item.panelId}</TableCell>
                  <TableCell>{item.lat}</TableCell>
                  <TableCell>{item.lon}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button size="icon" variant="ghost">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
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
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} panels
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
  )
}