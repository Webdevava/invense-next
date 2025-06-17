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
import AddLocationDialog from "@/components/dialogs/add-loaction"

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

const initialItems: Location[] = [
  { id: "C-1001", companyName: "Chandrapur Cement Works", location: "Chandrapur, Maharashtra", lat: 19.9615, lon: 79.2961 },
  { id: "C-1002", companyName: "Tirupati Steel Industries", location: "Raipur, Chhattisgarh", lat: 21.2514, lon: 81.6296 },
  { id: "C-1003", companyName: "Kolkata Textile Mills", location: "Kolkata, West Bengal", lat: 22.5726, lon: 88.3639 },
  { id: "C-1004", companyName: "Jamnagar Oil Refinery", location: "Jamnagar, Gujarat", lat: 22.4707, lon: 70.0577 },
  { id: "C-1005", companyName: "Bhilai Engineering Corp", location: "Bhilai, Chhattisgarh", lat: 21.1938, lon: 81.3509 },
  { id: "C-1006", companyName: "Pune Auto Components Ltd", location: "Pune, Maharashtra", lat: 18.5204, lon: 73.8567 },
  { id: "C-1007", companyName: "Vizag Shipyard Ltd", location: "Visakhapatnam, Andhra Pradesh", lat: 17.6868, lon: 83.2185 },
  { id: "C-1008", companyName: "Ludhiana Tools & Castings", location: "Ludhiana, Punjab", lat: 30.9010, lon: 75.8573 },
  { id: "C-1009", companyName: "Surat Textile Park", location: "Surat, Gujarat", lat: 21.1702, lon: 72.8311 },
  { id: "C-1010", companyName: "Kochi Chemical Industries", location: "Kochi, Kerala", lat: 9.9312, lon: 76.2673 },
  { id: "C-1011", companyName: "Jamshedpur Steel Fabricators", location: "Jamshedpur, Jharkhand", lat: 22.8046, lon: 86.2029 },
  { id: "C-1012", companyName: "Nagpur Agro Machinery", location: "Nagpur, Maharashtra", lat: 21.1458, lon: 79.0882 },
  { id: "C-1013", companyName: "Bengaluru Electronics Cluster", location: "Bengaluru, Karnataka", lat: 12.9716, lon: 77.5946 },
  { id: "C-1014", companyName: "Ahmedabad Plastic Works", location: "Ahmedabad, Gujarat", lat: 23.0225, lon: 72.5714 },
  { id: "C-1015", companyName: "Noida Furniture Manufacturers", location: "Noida, Uttar Pradesh", lat: 28.5355, lon: 77.3910 },
  { id: "C-1016", companyName: "Haridwar Pharma Labs", location: "Haridwar, Uttarakhand", lat: 29.9457, lon: 78.1642 },
  { id: "C-1017", companyName: "Rourkela Alloy Plants", location: "Rourkela, Odisha", lat: 22.2604, lon: 84.8536 },
  { id: "C-1018", companyName: "Indore Food Processing Unit", location: "Indore, Madhya Pradesh", lat: 22.7196, lon: 75.8577 },
  { id: "C-1019", companyName: "Ranchi Mining Equipment Co.", location: "Ranchi, Jharkhand", lat: 23.3441, lon: 85.3096 },
  { id: "C-1020", companyName: "Madurai Textile Exports", location: "Madurai, Tamil Nadu", lat: 9.9252, lon: 78.1198 },
]

const companies: Company[] = initialItems.map((item) => ({
  id: item.id,
  name: item.companyName,
}))

export default function LocationsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [items, setItems] = useState<Location[]>(initialItems)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10



  // Filter items based on search term
  const filteredItems = items.filter((item) => {
    const name = item.companyName?.toLowerCase() || ""
    const id = item.id?.toLowerCase() || ""
    const location = item.location?.toLowerCase() || ""
    return (
      name.includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm.toLowerCase()) ||
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

  const handleAddLocation = (newLocation: Location) => {
    setItems((prev) => [...prev, newLocation])
  }

  return (
    <div className="space-y-6">
      <SectionHeader
        title="LOCATIONS MANAGEMENT"
        description="Manage your organization's locations — add, edit, or remove locations with ease."
        actions={
          <>
            <Input
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
            <div className="h-8 border-l" />
           <AddLocationDialog companies={companies} onAddLocation={handleAddLocation} />
          </>
        }
      />

      <Card className="p-0 gap-0 border-none bg-transparent">
        <CardContent className="p-0 rounded-lg overflow-hidden bg-card border">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableHead>Sr. No.</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Location ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Latitude</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
              {paginatedItems.map((item, index) => (
                <TableRow
                  key={item.id}
                  className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
                >
                  <TableCell>{startIndex + index + 1}</TableCell>
                  <TableCell className="font-medium">{item.companyName}</TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.location}</TableCell>
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
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} locations
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