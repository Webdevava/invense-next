"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const PanelTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const panels = [
    {
      id: 1,
      panel: "PCC 1",
      assets: 19,
      dailyKwh: 0.00,
      liveKw: 16.72,
      liveAmp: 23.69,
      livePf: 1.00
    },
    {
      id: 2,
      panel: "PCC 3",
      assets: 17,
      dailyKwh: 0.00,
      liveKw: 4.54,
      liveAmp: 7.24,
      livePf: 0.94
    },
    {
      id: 3,
      panel: "PCC 5",
      assets: 24,
      dailyKwh: 0.00,
      liveKw: 8.03,
      liveAmp: 11.38,
      livePf: 1.00
    },
    {
      id: 4,
      panel: "PCC 2",
      assets: 26,
      dailyKwh: 0.00,
      liveKw: 36.20,
      liveAmp: 53.71,
      livePf: 0.96
    },
    {
      id: 5,
      panel: "PCC 6",
      assets: 19,
      dailyKwh: 0.00,
      liveKw: 21.63,
      liveAmp: 30.33,
      livePf: 1.00
    },
    {
      id: 6,
      panel: "LT ROOM",
      assets: 8,
      dailyKwh: 0.00,
      liveKw: 274.43,
      liveAmp: 399.12,
      livePf: 0.95
    }
  ];

  // Filter panels based on search term
  const filteredPanels = panels.filter((panel) =>
    panel.panel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="space-y-2 gap-0 p-3 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Panel Overview</h3>
        <Input
          type="text"
          placeholder="Search panels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-48 text-sm"
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b">
              <th className="text-left p-2 font-medium">Panel</th>
              <th className="text-right p-2 font-medium">No of Assets</th>
              <th className="text-right p-2 font-medium">Daily Kwh</th>
              <th className="text-right p-2 font-medium">Live kW</th>
              <th className="text-right p-2 font-medium">Live Amp</th>
              <th className="text-right p-2 font-medium">Live PF</th>
            </tr>
          </thead>
          <tbody>
            {filteredPanels.map((panel) => (
              <tr key={panel.id} className="border-b hover:bg-muted/50 transition-colors">
                <td className="p-2 text-xs font-mono">{panel.panel}</td>
                <td className="p-2 text-right text-xs font-mono">{panel.assets}</td>
                <td className="p-2 text-right text-xs font-mono">{panel.dailyKwh.toFixed(2)}</td>
                <td className="p-2 text-right text-xs font-mono">{panel.liveKw.toFixed(2)}</td>
                <td className="p-2 text-right text-xs font-mono">{panel.liveAmp.toFixed(2)}</td>
                <td className="p-2 text-right text-xs font-mono">{panel.livePf.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        Showing {filteredPanels.length} panel{filteredPanels.length !== 1 ? 's' : ''}
      </div>
    </Card>
  );
};