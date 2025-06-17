"use client";
import React, { useState } from "react";
import { Download, Filter, Search, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import SectionHeader from "@/components/layouts/section-header";

const DeviceReportsPage = () => {
  const [filters, setFilters] = useState({
    dateRange: "last-30-days",
    reportType: "all",
    status: "all",
    department: "all",
    searchTerm: "",
  });

  const [selectedReports, setSelectedReports] = useState<number[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data for reports
  const reports = [
    {
      id: 1,
      name: "Monthly Sales Report",
      type: "Sales",
      department: "Sales",
      createdBy: "John Doe",
      createdAt: "2024-06-15",
      size: "2.4 MB",
      status: "ready",
      downloads: 145,
    },
    {
      id: 2,
      name: "User Analytics Dashboard",
      type: "Analytics",
      department: "Marketing",
      createdBy: "Jane Smith",
      createdAt: "2024-06-14",
      size: "1.8 MB",
      status: "processing",
      downloads: 89,
    },
    {
      id: 3,
      name: "Financial Summary Q2",
      type: "Financial",
      department: "Finance",
      createdBy: "Mike Johnson",
      createdAt: "2024-06-13",
      size: "3.2 MB",
      status: "ready",
      downloads: 234,
    },
    {
      id: 4,
      name: "Employee Performance Report",
      type: "HR",
      department: "Human Resources",
      createdBy: "Sarah Wilson",
      createdAt: "2024-06-12",
      size: "1.5 MB",
      status: "failed",
      downloads: 67,
    },
    {
      id: 5,
      name: "Inventory Management Report",
      type: "Operations",
      department: "Operations",
      createdBy: "David Brown",
      createdAt: "2024-06-11",
      size: "4.1 MB",
      status: "ready",
      downloads: 178,
    },
  ];

  const departments = [
    "Sales",
    "Marketing",
    "Finance",
    "Human Resources",
    "Operations",
  ];
  const reportTypes = ["Sales", "Analytics", "Financial", "HR", "Operations"];

  const getStatusBadge = (status: "ready" | "processing" | "failed") => {
    const variants = {
      ready: "bg-green-100 text-green-800 hover:bg-green-100",
      processing: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      failed: "bg-red-100 text-red-800 hover:bg-red-100",
    };

    return (
      <Badge variant="secondary" className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleSelectReport = (reportId: number) => {
    setSelectedReports((prev) =>
      prev.includes(reportId)
        ? prev.filter((id) => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleSelectAll = () => {
    if (selectedReports.length === reports.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(reports.map((r) => r.id));
    }
  };

  const handleDownload = (reportId: number | null = null) => {
    if (reportId) {
      console.log(`Downloading report ${reportId}`);
    } else {
      console.log(`Downloading ${selectedReports.length} selected reports`);
    }
  };

  const clearFilters = () => {
    setFilters({
      dateRange: "last-30-days",
      reportType: "all",
      status: "all",
      department: "all",
      searchTerm: "",
    });
    setIsFilterOpen(false);
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== "all" && value !== "last-30-days" && value !== ""
  ).length;

  return (
    <div className=" space-y-6">
      <SectionHeader
        title="Device Reports"
        description="Access and download your generated reports"
        actions={
          <>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={filters.searchTerm}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      searchTerm: e.target.value,
                    }))
                  }
                  className="pl-8 bg-background border-input"
                />
              </div>
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-background hover:bg-accent"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                      >
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-80 bg-popover border-border"
                  align="end"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-popover-foreground">
                        Filters
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear all
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-popover-foreground">
                          Date Range
                        </Label>
                        <Select
                          value={filters.dateRange}
                          onValueChange={(value) =>
                            setFilters((prev) => ({
                              ...prev,
                              dateRange: value,
                            }))
                          }
                        >
                          <SelectTrigger className="bg-background border-input">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            <SelectItem value="last-7-days">
                              Last 7 days
                            </SelectItem>
                            <SelectItem value="last-30-days">
                              Last 30 days
                            </SelectItem>
                            <SelectItem value="last-90-days">
                              Last 90 days
                            </SelectItem>
                            <SelectItem value="this-year">This year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-popover-foreground">
                          Report Type
                        </Label>
                        <Select
                          value={filters.reportType}
                          onValueChange={(value) =>
                            setFilters((prev) => ({
                              ...prev,
                              reportType: value,
                            }))
                          }
                        >
                          <SelectTrigger className="bg-background border-input">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            <SelectItem value="all">All Types</SelectItem>
                            {reportTypes.map((type) => (
                              <SelectItem key={type} value={type.toLowerCase()}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-popover-foreground">
                          Department
                        </Label>
                        <Select
                          value={filters.department}
                          onValueChange={(value) =>
                            setFilters((prev) => ({
                              ...prev,
                              department: value,
                            }))
                          }
                        >
                          <SelectTrigger className="bg-background border-input">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            <SelectItem value="all">All Departments</SelectItem>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept.toLowerCase()}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-popover-foreground">
                          Status
                        </Label>
                        <Select
                          value={filters.status}
                          onValueChange={(value) =>
                            setFilters((prev) => ({ ...prev, status: value }))
                          }
                        >
                          <SelectTrigger className="bg-background border-input">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="ready">Ready</SelectItem>
                            <SelectItem value="processing">
                              Processing
                            </SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <Button
              variant="outline"
              onClick={() => handleDownload()}
              disabled={selectedReports.length === 0}
              className="bg-card hover:bg-accent"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Selected ({selectedReports.length})
            </Button>
          </>
        }
      />

      {/* Filters and Search */}
      <Card className="bg-transparent border-none p-0 gap-0">
        <CardContent className="p-2">
          {/* Reports Table */}
          <div className="rounded-md border border-border bg-background">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-muted/50">
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedReports.length === reports.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Checkbox
                        checked={selectedReports.includes(report.id)}
                        onCheckedChange={() => handleSelectReport(report.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.department}</TableCell>
                    <TableCell>{report.createdBy}</TableCell>
                    <TableCell>{report.createdAt}</TableCell>
                    <TableCell>{report.size}</TableCell>
                    <TableCell>
                      {getStatusBadge(
                        report.status as "ready" | "processing" | "failed"
                      )}
                    </TableCell>
                    <TableCell>{report.downloads}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(report.id)}
                          disabled={report.status !== "ready"}
                          className="h-8 w-8 p-0 hover:bg-accent"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-accent"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Table Footer */}
          <div className="flex items-center justify-between pt-4">
            <div className="text-sm text-muted-foreground">
              Showing {reports.length} of {reports.length} reports
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="bg-background"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled
                className="bg-background"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceReportsPage;
