'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle } from 'lucide-react';

export const SubLocationView = () => {
  const allData = [
    {
      subLocation: 'Plant A - Zone 1',
      totalAssets: 12,
      activeAssets: 10,
      alerts: 3,
      warnings: 1,
    },
    {
      subLocation: 'Plant A - Zone 2',
      totalAssets: 8,
      activeAssets: 8,
      alerts: 0,
      warnings: 2,
    },
    {
      subLocation: 'Plant B - Floor 1',
      totalAssets: 15,
      activeAssets: 14,
      alerts: 2,
      warnings: 3,
    },
    {
      subLocation: 'Plant B - Floor 2',
      totalAssets: 9,
      activeAssets: 7,
      alerts: 1,
      warnings: 0,
    },
  ];

  const [search, setSearch] = useState('');

  const filteredData = allData.filter((item) =>
    item.subLocation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="p-3 gap-0 rounded-lg h-fit">
      <Tabs defaultValue="table" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="map">Map</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <div className="space-y-4">
            <div className='flex w-full justify-end'>
              <Input
              placeholder="Search by Sub Location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64"
            />
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Sub Location</th>
                    <th className="text-left p-2 font-medium">No of Assets</th>
                    <th className="text-left p-2 font-medium">Active Assets</th>
                    <th className="text-left p-2 font-medium">Alerts</th>
                    <th className="text-left p-2 font-medium">Warnings</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, idx) => (
                    <tr key={idx} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-2">{item.subLocation}</td>
                      <td className="p-2">{item.totalAssets}</td>
                      <td className="p-2">{item.activeAssets}</td>
                      <td className="p-2">
                        <Badge className="bg-red-500 text-white flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {item.alerts}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <Badge className="bg-yellow-400 text-yellow-900 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {item.warnings}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="map">
          <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center text-muted-foreground">
            {/* Replace this with actual map component like react-leaflet or Google Maps */}
            Map View Placeholder
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
