'use client'

import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Table as TableIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface Alert {
  id: string
  deviceName: string
  panelNo: string
  alertType: 'critical' | 'warning' | 'info'
  message: string
  timestamp: string
  status: 'active' | 'resolved' | 'acknowledged'
  priority: number
}

const sampleAlerts: Alert[] = [
  {
    id: 'A1',
    deviceName: 'Temperature Sensor A1',
    panelNo: 'P001',
    alertType: 'critical',
    message: 'Temperature exceeded 30°C',
    timestamp: '2025-06-16 14:30:00',
    status: 'active',
    priority: 1,
  },
  {
    id: 'A2',
    deviceName: 'Motion Detector B2',
    panelNo: 'P002',
    alertType: 'warning',
    message: 'Battery level below 20%',
    timestamp: '2025-06-16 13:15:00',
    status: 'acknowledged',
    priority: 2,
  },
  {
    id: 'A3',
    deviceName: 'Smart Lock C3',
    panelNo: 'P003',
    alertType: 'info',
    message: 'Lock opened successfully',
    timestamp: '2025-06-16 12:45:00',
    status: 'resolved',
    priority: 3,
  },
  {
    id: 'A4',
    deviceName: 'Air Quality Monitor D4',
    panelNo: 'P004',
    alertType: 'critical',
    message: 'PM2.5 levels critical',
    timestamp: '2025-06-16 11:20:00',
    status: 'active',
    priority: 1,
  },
  {
    id: 'A5',
    deviceName: 'Humidity Sensor E5',
    panelNo: 'P005',
    alertType: 'warning',
    message: 'Humidity above threshold',
    timestamp: '2025-06-16 10:50:00',
    status: 'active',
    priority: 2,
  },
  {
    id: 'A6',
    deviceName: 'Temperature Sensor A6',
    panelNo: 'P006',
    alertType: 'info',
    message: 'Routine check completed',
    timestamp: '2025-06-16 09:30:00',
    status: 'resolved',
    priority: 3,
  },
  {
    id: 'A7',
    deviceName: 'Motion Detector B7',
    panelNo: 'P007',
    alertType: 'critical',
    message: 'Unauthorized motion detected',
    timestamp: '2025-06-16 08:00:00',
    status: 'active',
    priority: 1,
  },
]

const AlertTable: React.FC = () => {
  const [alerts] = useState<Alert[]>(sampleAlerts)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.panelNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedAlerts = filteredAlerts.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const getAlertVariant = (alertType: Alert['alertType']) => {
    switch (alertType) {
      case 'critical':
        return 'destructive'
      case 'warning':
        return 'secondary'
      case 'info':
        return 'default'
      default:
        return 'outline'
    }
  }

  const getStatusVariant = (status: Alert['status']) => {
    switch (status) {
      case 'active':
        return 'destructive'
      case 'resolved':
        return 'default'
      case 'acknowledged':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const SearchBar = () => (
    <div className="relative w-64">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search alerts, devices, or panels..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  )

  const PaginationControls = () => (
    <div className="flex items-center justify-between pt-4 border-t">
      <div className="text-sm text-muted-foreground">
        Showing {startIndex + 1} to {Math.min(endIndex, filteredAlerts.length)} of {filteredAlerts.length} alerts
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
            Alerts Overview
          </CardTitle>
          <CardDescription>View and manage active alerts across all devices</CardDescription>
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
                <TableHead>Alert Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAlerts.map((alert) => (
                <TableRow
                  key={alert.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <TableCell>{alert.panelNo}</TableCell>
                  <TableCell>{alert.deviceName}</TableCell>
                  <TableCell>
                    <Badge variant={getAlertVariant(alert.alertType)} className="capitalize">
                      {alert.alertType}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.message}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(alert.status)} className="capitalize">
                      {alert.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{alert.priority}</TableCell>
                  <TableCell>{alert.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredAlerts.length > itemsPerPage && <PaginationControls />}
        </div>
      </CardContent>
    </Card>
  )
}

export default AlertTable