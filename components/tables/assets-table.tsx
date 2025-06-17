"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const AssetsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const assets = [
    {
      id: 1,
      asset: "Incomer PCC1",
      dailyKwh: 0.00,
      avgKw: 5.57,
      avgAmp: 23.69,
      avgPf: 1
    },
    {
      id: 2,
      asset: "LATHE 3",
      dailyKwh: 0.00,
      avgKw: 0.00,
      avgAmp: 0,
      avgPf: -0.62
    },
    {
      id: 3,
      asset: "POWER SOCKET 1",
      dailyKwh: 0.00,
      avgKw: 1.32,
      avgAmp: 5.79,
      avgPf: 0.95
    },
    {
      id: 4,
      asset: "BALANCING",
      dailyKwh: NaN,
      avgKw: NaN,
      avgAmp: NaN,
      avgPf: NaN
    },
    {
      id: 5,
      asset: "EOT CRANE 1",
      dailyKwh: 0.00,
      avgKw: 0.00,
      avgAmp: 0,
      avgPf: 0
    },
    {
      id: 6,
      asset: "PAINT BOOTH SMALL",
      dailyKwh: 0.00,
      avgKw: 0.00,
      avgAmp: 0,
      avgPf: 0
    },
    {
      id: 7,
      asset: "APFC - PCC1",
      dailyKwh: 0.00,
      avgKw: 0.04,
      avgAmp: 0.25,
      avgPf: 0.81
    },
    {
      id: 8,
      asset: "WET BLASTING",
      dailyKwh: 0.00,
      avgKw: 0.00,
      avgAmp: 0,
      avgPf: 0
    },
    {
      id: 9,
      asset: "WET BLASTING 2",
      dailyKwh: 0.00,
      avgKw: 0.00,
      avgAmp: 0,
      avgPf: 0
    }
  ];

  // Filter assets based on search term
  const filteredAssets = assets.filter((asset) =>
    asset.asset.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper to format values, handling NaN
  const formatValue = (value: number | null) => {
    if (value === null || isNaN(value)) return '-';
    return value.toFixed(2);
  };

  return (
    <Card className="space-y-2 gap-0 p-3 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Asset Overview</h3>
        <Input
          type="text"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-48 text-sm"
        />
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b">
              <th className="text-left p-2 font-medium">Asset</th>
              <th className="text-right p-2 font-medium">Daily Kwh</th>
              <th className="text-right p-2 font-medium">Avg kW</th>
              <th className="text-right p-2 font-medium">Avg Amp</th>
              <th className="text-right p-2 font-medium">Avg PF</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset) => (
              <tr key={asset.id} className="border-b hover:bg-muted/50 transition-colors">
                <td className="p-2 text-xs font-mono">{asset.asset}</td>
                <td className="p-2 text-right text-xs font-mono">{formatValue(asset.dailyKwh)}</td>
                <td className="p-2 text-right text-xs font-mono">{formatValue(asset.avgKw)}</td>
                <td className="p-2 text-right text-xs font-mono">{formatValue(asset.avgAmp)}</td>
                <td className="p-2 text-right text-xs font-mono">{formatValue(asset.avgPf)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-muted-foreground text-center">
        Showing {filteredAssets.length} asset{filteredAssets.length !== 1 ? 's' : ''}
      </div>
    </Card>
  );
};