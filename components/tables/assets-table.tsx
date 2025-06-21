'use client'
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '../ui/separator';

export const PanelAssetsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPanel, setExpandedPanel] = useState<number | null>(null);

  const panels = [
    {
      id: 1,
      panel: "PNL-001",
      noOfAssets: 5,
      dailyKwh: 120.5,
      liveKw: 15.2,
      liveAmp: 65.3,
      livePf: 0.92,
      assets: [
        { id: 1, name: "AST-001", dailyKwh: 24.1, avgKw: 3.0, avgAmp: 13.0, avgPf: 0.91 },
        { id: 2, name: "AST-002", dailyKwh: 22.8, avgKw: 2.8, avgAmp: 12.5, avgPf: 0.90 },
        { id: 3, name: "AST-003", dailyKwh: 25.3, avgKw: 3.2, avgAmp: 13.8, avgPf: 0.93 },
        { id: 4, name: "AST-004", dailyKwh: 23.9, avgKw: 3.1, avgAmp: 13.2, avgPf: 0.92 },
        { id: 5, name: "AST-005", dailyKwh: 24.4, avgKw: 3.1, avgAmp: 12.8, avgPf: 0.91 }
      ]
    },
    {
      id: 2,
      panel: "PNL-002",
      noOfAssets: 4,
      dailyKwh: 98.7,
      liveKw: 12.4,
      liveAmp: 52.1,
      livePf: 0.89,
      assets: [
        { id: 6, name: "AST-006", dailyKwh: 24.5, avgKw: 3.0, avgAmp: 13.0, avgPf: 0.88 },
        { id: 7, name: "AST-007", dailyKwh: 23.8, avgKw: 2.9, avgAmp: 12.7, avgPf: 0.89 },
        { id: 8, name: "AST-008", dailyKwh: 25.1, avgKw: 3.1, avgAmp: 13.5, avgPf: 0.90 },
        { id: 9, name: "AST-009", dailyKwh: 25.3, avgKw: 3.4, avgAmp: 12.9, avgPf: 0.89 }
      ]
    },
    {
      id: 3,
      panel: "PNL-003",
      noOfAssets: 6,
      dailyKwh: 145.2,
      liveKw: 18.7,
      liveAmp: 78.4,
      livePf: 0.94,
      assets: [
        { id: 10, name: "AST-010", dailyKwh: 24.0, avgKw: 3.0, avgAmp: 13.1, avgPf: 0.93 },
        { id: 11, name: "AST-011", dailyKwh: 23.7, avgKw: 2.9, avgAmp: 12.6, avgPf: 0.94 },
        { id: 12, name: "AST-012", dailyKwh: 24.5, avgKw: 3.1, avgAmp: 13.3, avgPf: 0.94 },
        { id: 13, name: "AST-013", dailyKwh: 24.8, avgKw: 3.2, avgAmp: 13.5, avgPf: 0.93 },
        { id: 14, name: "AST-014", dailyKwh: 24.2, avgKw: 3.0, avgAmp: 13.0, avgPf: 0.94 },
        { id: 15, name: "AST-015", dailyKwh: 24.0, avgKw: 3.5, avgAmp: 12.9, avgPf: 0.93 }
      ]
    }
  ];

  // Filter panels based on search term
  const filteredPanels = panels.filter((panel) =>
    panel.panel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SearchBar = () => (
    <div className="relative w-64">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search panels..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  );

  const togglePanel = (panelId: number) => {
    setExpandedPanel(expandedPanel === panelId ? null : panelId);
  };

  return (
    <Card className="gap-0 p-0 rounded-lg flex flex-col justify-between">
      <CardHeader className="flex items-center justify-between p-2">
        <CardTitle>Panel Overview</CardTitle>
        <SearchBar />
      </CardHeader>
      <Separator />
      <CardContent className="p-2 w-full flex-1">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b">
              <th className="text-left p-2 font-medium"></th>
              <th className="text-left p-2 font-medium">Panel</th>
              <th className="text-left p-2 font-medium">No of Assets</th>
              <th className="text-left p-2 font-medium">Daily Kwh</th>
              <th className="text-left p-2 font-medium">Live kW</th>
              <th className="text-left p-2 font-medium">Live Amp</th>
              <th className="text-left p-2 font-medium">Live PF</th>
            </tr>
          </thead>
          <tbody>
            {filteredPanels.slice(0, 5).map((panel) => (
              <React.Fragment key={panel.id}>
                <tr
                  className="border-b hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => togglePanel(panel.id)}
                >
                  <td className="p-2">
                    {expandedPanel === panel.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </td>
                  <td className="p-2 font-mono text-xs">{panel.panel}</td>
                  <td className="p-2 text-xs">{panel.noOfAssets}</td>
                  <td className="p-2 text-xs">{panel.dailyKwh.toFixed(1)}</td>
                  <td className="p-2 text-xs">{panel.liveKw.toFixed(1)}</td>
                  <td className="p-2 text-xs">{panel.liveAmp.toFixed(1)}</td>
                  <td className="p-2 text-xs">{panel.livePf.toFixed(2)}</td>
                </tr>
                {expandedPanel === panel.id && (
                  <tr>
                    <td colSpan={7} className="p-4 bg-muted/20">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                          <tr className="border-b">
                            <th className="text-left p-2 font-medium">Asset</th>
                            <th className="text-left p-2 font-medium">Daily Kwh</th>
                            <th className="text-left p-2 font-medium">Avg Kw</th>
                            <th className="text-left p-2 font-medium">Avg Amp</th>
                            <th className="text-left p-2 font-medium">Avg PF</th>
                          </tr>
                        </thead>
                        <tbody>
                          {panel.assets.map((asset) => (
                            <tr key={asset.id} className="border-b hover:bg-muted/50 transition-colors">
                              <td className="p-2 font-mono text-xs">{asset.name}</td>
                              <td className="p-2 text-xs">{asset.dailyKwh.toFixed(1)}</td>
                              <td className="p-2 text-xs">{asset.avgKw.toFixed(1)}</td>
                              <td className="p-2 text-xs">{asset.avgAmp.toFixed(1)}</td>
                              <td className="p-2 text-xs">{asset.avgPf.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </CardContent>
      <Separator />
      <CardFooter className="text-xs text-muted-foreground text-center p-2">
        Showing {filteredPanels.length > 5 ? 'latest 5' : filteredPanels.length} of {filteredPanels.length} panels
      </CardFooter>
    </Card>
  );
};