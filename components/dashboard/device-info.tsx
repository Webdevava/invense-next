'use client'

import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MapPin, Battery, Zap, Table as TableIcon, Search, Maximize, Minimize, ChevronLeft, ChevronRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import L from 'leaflet'

// Dynamically import react-leaflet components with SSR disabled
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false })

interface Device {
  id: string
  name: string
  type: string
  status: 'online' | 'offline' | 'warning'
  battery: number
  lat: number
  lng: number
  lastSeen: string
  temperature?: number
  signal?: number
  panelNo: string
  noOfAssets: number
  activeAssets: number
  alerts: number
  warnings: number
}

// Sample device data with Maharashtra locations
const sampleDevices: Device[] = [
  {
    id: '1',
    name: 'Temperature Sensor A1',
    type: 'Temperature Sensor',
    status: 'online',
    battery: 85,
    lat: 18.5204, // Mumbai
    lng: 73.8567,
    lastSeen: '2 minutes ago',
    temperature: 23.5,
    signal: 92,
    panelNo: 'P001',
    noOfAssets: 12,
    activeAssets: 10,
    alerts: 0,
    warnings: 1
  },
  {
    id: '2',
    name: 'Motion Detector B2',
    type: 'Motion Sensor',
    status: 'offline',
    battery: 12,
    lat: 18.5196, // Pune
    lng: 73.8553,
    lastSeen: '1 hour ago',
    signal: 0,
    panelNo: 'P002',
    noOfAssets: 8,
    activeAssets: 0,
    alerts: 2,
    warnings: 0
  },
  {
    id: '3',
    name: 'Smart Lock C3',
    type: 'Security Device',
    status: 'warning',
    battery: 45,
    lat: 19.0760, // Mumbai Central
    lng: 72.8777,
    lastSeen: '15 minutes ago',
    signal: 68,
    panelNo: 'P003',
    noOfAssets: 15,
    activeAssets: 12,
    alerts: 1,
    warnings: 3
  },
  {
    id: '4',
    name: 'Air Quality Monitor D4',
    type: 'Environmental Sensor',
    status: 'online',
    battery: 92,
    lat: 18.6298, // Pune IT Park
    lng: 73.7997,
    lastSeen: '30 seconds ago',
    temperature: 22.1,
    signal: 89,
    panelNo: 'P004',
    noOfAssets: 20,
    activeAssets: 19,
    alerts: 0,
    warnings: 0
  },
  {
    id: '5',
    name: 'Humidity Sensor E5',
    type: 'Environmental Sensor',
    status: 'online',
    battery: 78,
    lat: 18.9068, // Nashik
    lng: 73.7617,
    lastSeen: '5 minutes ago',
    temperature: 24.8,
    signal: 76,
    panelNo: 'P005',
    noOfAssets: 6,
    activeAssets: 5,
    alerts: 0,
    warnings: 2
  },
  {
    id: '6',
    name: 'Humidity Sensor E5',
    type: 'Environmental Sensor',
    status: 'online',
    battery: 78,
    lat: 18.9068, // Nashik
    lng: 73.7617,
    lastSeen: '5 minutes ago',
    temperature: 24.8,
    signal: 76,
    panelNo: 'P005',
    noOfAssets: 6,
    activeAssets: 5,
    alerts: 0,
    warnings: 2
  },
  {
    id: '7',
    name: 'Humidity Sensor E5',
    type: 'Environmental Sensor',
    status: 'online',
    battery: 78,
    lat: 18.9068, // Nashik
    lng: 73.7617,
    lastSeen: '5 minutes ago',
    temperature: 24.8,
    signal: 76,
    panelNo: 'P005',
    noOfAssets: 6,
    activeAssets: 5,
    alerts: 0,
    warnings: 2
  },
]

const DeviceInfo: React.FC = () => {
  const [devices] = useState<Device[]>(sampleDevices)
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('map')
  const [isMapFullscreen, setIsMapFullscreen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const mapRef = useRef<L.Map | null>(null)

  // Configure Leaflet icons on client-side only
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })
  }, [])

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.panelNo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination calculations
  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedDevices = filteredDevices.slice(startIndex, endIndex)

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const toggleMapFullscreen = () => {
    setIsMapFullscreen(!isMapFullscreen)
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize()
      }
    }, 100)
  }

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device)
    if (mapRef.current) {
      mapRef.current.setView([device.lat, device.lng], 16)
    }
    if (typeof window !== 'undefined') {
      const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches
      if (isSmallScreen) {
        setActiveTab('map')
      }
    }
  }

  const getStatusVariant = (status: Device['status']) => {
    switch (status) {
      case 'online':
        return 'default'
      case 'offline':
        return 'destructive'
      case 'warning':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getBatteryIcon = (battery: number) => {
    if (battery > 20) {
      return <Battery className="h-4 w-4 text-green-600" />
    } else {
      return <Zap className="h-4 w-4 text-red-600" />
    }
  }

  const PaginationControls = () => (
    <div className="flex items-center justify-between pt-4 border-t">
      <div className="text-sm text-muted-foreground">
        Showing {startIndex + 1} to {Math.min(endIndex, filteredDevices.length)} of {filteredDevices.length} devices
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

  const SearchBar = () => (
    <div className="relative w-64">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search devices, panels, or types..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  )

  const DeviceTable = () => (
    <Card className="gap-0 p-0 rounded-lg h-[65vh]">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TableIcon className="h-5 w-5" />
            Device List
          </CardTitle>
          <CardDescription>Click on any device to view its location on the map</CardDescription>
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
                <TableHead>No of Assets</TableHead>
                <TableHead>Active Assets</TableHead>
                <TableHead>Alerts</TableHead>
                <TableHead>Warnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDevices.map((device) => (
                <TableRow
                  key={device.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleDeviceClick(device)}
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">{device.panelNo}</div>
                      <div className="text-sm text-muted-foreground">{device.name}</div>
                      <Badge variant={getStatusVariant(device.status)} className="capitalize mt-1">
                        {device.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">{device.noOfAssets}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-medium text-green-600">{device.activeAssets}</span>
                      <span className="text-xs text-muted-foreground">
                        {Math.round((device.activeAssets / device.noOfAssets) * 100)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={device.alerts > 0 ? 'destructive' : 'outline'} className="rounded-full">
                      {device.alerts}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={device.warnings > 0 ? 'secondary' : 'outline'} className="rounded-full">
                      {device.warnings}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredDevices.length > itemsPerPage && <PaginationControls />}
        </div>
      </CardContent>
    </Card>
  )

  const DeviceMap = () => (
    <Card className={`${isMapFullscreen ? 'fixed inset-0 z-50' : 'h-[65vh]'} gap-0 p-0 rounded-lg`}>
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5" />
              Device Locations
            </CardTitle>
            <CardDescription>
              {selectedDevice
                ? `Viewing: ${selectedDevice.name} (${selectedDevice.panelNo})`
                : 'Select a device from the table to zoom to its location'}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={toggleMapFullscreen} className="ml-4">
            {isMapFullscreen ? (
              <>
                <Minimize className="h-4 w-4 mr-2" />
                Collapse
              </>
            ) : (
              <>
                <Maximize className="h-4 w-4 mr-2" />
                Expand
              </>
            )}
          </Button>
        </div>
        <div className="lg:block hidden">
          {/* <SearchBar /> */}
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-2 flex h-full overflow-hidden">
        <div className={`flex-1 rounded-lg overflow-hidden ${isMapFullscreen ? 'h-[calc(100vh-120px)]' : ''}`}>
          <MapContainer
            center={[18.5204, 73.8567]} // Center on Maharashtra (Pune area)
            zoom={10}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
              attribution='© <a href="https://stadiamaps.com/">Stadia Maps</a>, © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            />
            {filteredDevices.map((device) => (
              <Marker
                key={device.id}
                position={[device.lat, device.lng]}
                eventHandlers={{
                  click: () => setSelectedDevice(device),
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-semibold">{device.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{device.type}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Panel:</span>
                        <span className="text-sm">{device.panelNo}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Status:</span>
                        <Badge variant={getStatusVariant(device.status)} className="text-xs">
                          {device.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Assets:</span>
                        <span className="text-sm">{device.activeAssets}/{device.noOfAssets}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Alerts:</span>
                        <Badge
                          variant={device.alerts > 0 ? 'destructive' : 'outline'}
                          className="text-xs rounded-full"
                        >
                          {device.alerts}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Warnings:</span>
                        <Badge
                          variant={device.warnings > 0 ? 'secondary' : 'outline'}
                          className="text-xs rounded-full"
                        >
                          {device.warnings}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Battery:</span>
                        <div className="flex items-center gap-1">
                          {getBatteryIcon(device.battery)}
                          <span className="text-sm">{device.battery}%</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 border-t pt-2">Last seen: {device.lastSeen}</p>
                      {device.temperature && <p className="text-xs">Temperature: {device.temperature}°C</p>}
                      {device.signal && <p className="text-xs">Signal: {device.signal}%</p>}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="h-full">
      {/* Large screens: Side by side layout */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6">
        <div>
          <DeviceMap />
        </div>
        <div>
          <DeviceTable />
        </div>
      </div>

      {/* Medium and small screens: Tabbed layout */}
      <div className="lg:hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Map
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-2">
              <TableIcon className="h-4 w-4" />
              Table
            </TabsTrigger>
          </TabsList>
          <TabsContent value="table" className="mt-0 h-full">
            <DeviceTable />
          </TabsContent>
          <TabsContent value="map" className="mt-0 h-full">
            <DeviceMap />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default DeviceInfo