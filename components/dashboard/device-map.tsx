'use client'

import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Maximize, Minimize, Battery, Zap } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Badge } from '../ui/badge'

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
    name: 'Humidity Sensor E6',
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
    name: 'Humidity Sensor E7',
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

const DeviceMap: React.FC = () => {
  const [isMapFullscreen, setIsMapFullscreen] = useState(false)
  const mapRef = useRef<L.Map | null>(null)

  // Configure Leaflet icons on client-side only
  useEffect(() => {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })
  }, [])

  const toggleMapFullscreen = () => {
    setIsMapFullscreen(!isMapFullscreen)
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize()
      }
    }, 100)
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

  return (
    <Card className={`${isMapFullscreen ? 'fixed inset-0 z-50' : 'h-[65vh]'} gap-0 p-0 rounded-lg`}>
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5" />
            Device Locations
          </CardTitle>
          <CardDescription>Click on markers to view device details</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={toggleMapFullscreen}>
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
            {sampleDevices.map((device) => (
              <Marker
                key={device.id}
                position={[device.lat, device.lng]}
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
}

export default DeviceMap