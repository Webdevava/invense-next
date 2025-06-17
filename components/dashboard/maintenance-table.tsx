'use client'

import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Table as TableIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface Maintenance {
  id: string
  deviceName: string
  panelNo: string
  maintenanceType: 'routine' | 'repair' | 'upgrade'
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  scheduledDate: string
  completedDate?: string
  technician: string
  notes: string
}

const sampleMaintenance: Maintenance[] = [
  {
    id: 'M1',
    deviceName: 'Temperature Sensor A1',
    panelNo: 'P001',
    maintenanceType: 'routine',
    status: 'completed',
    scheduledDate: '2025-06-10 10:00:00',
    completedDate: '2025-06-10 12:30:00',
    technician: 'John Doe',
    notes: 'Sensor calibration completed',
  },
  {
    id: 'M2',
    deviceName: 'Motion Detector B2',
    panelNo: 'P002',
    maintenanceType: 'repair',
    status: 'in-progress',
    scheduledDate: '2025-06-16 09:00:00',
    technician: 'Jane Smith',
    notes: 'Battery replacement required',
  },
  {
    id: 'M3',
    deviceName: 'Smart Lock C3',
    panelNo: 'P003',
    maintenanceType: 'upgrade',
    status: 'scheduled',
    scheduledDate: '2025-06-18 14:00:00',
    technician: 'Mike Johnson',
    notes: 'Firmware update planned',
  },
  {
    id: 'M4',
    deviceName: 'Air Quality Monitor D4',
    panelNo: 'P004',
    maintenanceType: 'routine',
    status: 'completed',
    scheduledDate: '2025-06-12 08:00:00',
    completedDate: '2025-06-12 10:15:00',
    technician: 'Sarah Brown',
    notes: 'Filter cleaned',
  },
  {
    id: 'M5',
    deviceName: 'Humidity Sensor E5',
    panelNo: 'P005',
    maintenanceType: 'repair',
    status: 'cancelled',
    scheduledDate: '2025-06-15 11:00:00',
    technician: 'Tom Wilson',
    notes: 'Cancelled due to device replacement',
  },
  {
    id: 'M6',
    deviceName: 'Temperature Sensor A6',
    panelNo: 'P006',
    maintenanceType: 'routine',
    status: 'scheduled',
    scheduledDate: '2025-06-20 13:00:00',
    technician: 'Emily Davis',
    notes: 'Scheduled for routine check',
  },
  {
    id: 'M7',
    deviceName: 'Motion Detector B7',
    panelNo: 'P007',
    maintenanceType: 'upgrade',
    status: 'in-progress',
    scheduledDate: '2025-06-16 15:00:00',
    technician: 'Chris Lee',
    notes: 'Upgrading to new firmware',
  },
]

const MaintenanceTable: React.FC = () => {
  const [maintenance] = useState<Maintenance[]>(sampleMaintenance)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  const filteredMaintenance = maintenance.filter(
    (record) =>
      record.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.panelNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.notes.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredMaintenance.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedMaintenance = filteredMaintenance.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const getMaintenanceTypeVariant = (type: Maintenance['maintenanceType']) => {
    switch (type) {
      case 'routine':
        return 'default'
      case 'repair':
        return 'secondary'
      case 'upgrade':
        return 'outline'
      default:
        return 'outline'
    }
  }

  const getStatusVariant = (status: Maintenance['status']) => {
    switch (status) {
      case 'completed':
        return 'default'
      case 'in-progress':
        return 'secondary'
      case 'scheduled':
        return 'outline'
      case 'cancelled':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const SearchBar = () => (
    <div className="relative w-64">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search maintenance, devices, or technicians..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  )

  const PaginationControls = () => (
    <div className="flex items-center justify-between pt-4 border-t">
      <div className="text-sm text-muted-foreground">
        Showing {startIndex + 1} to {Math.min(endIndex, filteredMaintenance.length)} of {filteredMaintenance.length} records
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="w-8 h-8 p-0"
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  return (
    <Card className="gap-0 p-0 rounded-lg">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TableIcon className="h-5 w-5" />
            Maintenance Records
          </CardTitle>
          <CardDescription>Track and manage device maintenance activities</CardDescription>
        </div>
        <div className="flex items-center justify-end">
          <SearchBar />
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-4 flex h-full overflow-hidden">
        <div className="w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Panel No</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedMaintenance.map((record) => (
                <TableRow
                  key={record.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <TableCell>{record.panelNo}</TableCell>
                  <TableCell>{record.deviceName}</TableCell>
                  <TableCell>
                    <Badge variant={getMaintenanceTypeVariant(record.maintenanceType)} className="capitalize">
                      {record.maintenanceType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(record.status)} className="capitalize">
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.scheduledDate}</TableCell>
                  <TableCell>{record.completedDate || '-'}</TableCell>
                  <TableCell>{record.technician}</TableCell>
                  <TableCell>{record.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredMaintenance.length > itemsPerPage && <PaginationControls />}
        </div>
      </CardContent>
    </Card>
  )
}

export default MaintenanceTable