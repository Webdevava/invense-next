"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SectionHeader from "@/components/layouts/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pencil, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddCompanyDialog from "@/components/dialogs/add-company";

const initialItems = [
  { id: "C-1001", name: "Chandrapur Cement Works", location: "Chandrapur, Maharashtra" },
  { id: "C-1002", name: "Tirupati Steel Industries", location: "Raipur, Chhattisgarh" },
  { id: "C-1003", name: "Kolkata Textile Mills", location: "Kolkata, West Bengal" },
  { id: "C-1004", name: "Jamnagar Oil Refinery", location: "Jamnagar, Gujarat" },
  { id: "C-1005", name: "Bhilai Engineering Corp", location: "Bhilai, Chhattisgarh" },
  { id: "C-1006", name: "Pune Auto Components Ltd", location: "Pune, Maharashtra" },
  { id: "C-1007", name: "Vizag Shipyard Ltd", location: "Visakhapatnam, Andhra Pradesh" },
  { id: "C-1008", name: "Ludhiana Tools & Castings", location: "Ludhiana, Punjab" },
  { id: "C-1009", name: "Surat Textile Park", location: "Surat, Gujarat" },
  { id: "C-1010", name: "Kochi Chemical Industries", location: "Kochi, Kerala" },
  { id: "C-1011", name: "Jamshedpur Steel Fabricators", location: "Jamshedpur, Jharkhand" },
  { id: "C-1012", name: "Nagpur Agro Machinery", location: "Nagpur, Maharashtra" },
  { id: "C-1013", name: "Bengaluru Electronics Cluster", location: "Bengaluru, Karnataka" },
  { id: "C-1014", name: "Ahmedabad Plastic Works", location: "Ahmedabad, Gujarat" },
  { id: "C-1015", name: "Noida Furniture Manufacturers", location: "Noida, Uttar Pradesh" },
  { id: "C-1016", name: "Haridwar Pharma Labs", location: "Haridwar, Uttarakhand" },
  { id: "C-1017", name: "Rourkela Alloy Plants", location: "Rourkela, Odisha" },
  { id: "C-1018", name: "Indore Food Processing Unit", location: "Indore, Madhya Pradesh" },
  { id: "C-1019", name: "Ranchi Mining Equipment Co.", location: "Ranchi, Jharkhand" },
  { id: "C-1020", name: "Madurai Textile Exports", location: "Madurai, Tamil Nadu" },
];


const CompanyPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items] = useState(initialItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for ?add-company=true in the URL and open dialog
  useEffect(() => {
    const addCompany = searchParams.get("add-company");
    if (addCompany === "true") {
      setIsDialogOpen(true);
    }
  }, [searchParams]);

  // Handle dialog open/close and update URL
  const handleOpenChange = (open: boolean | ((prevState: boolean) => boolean)) => {
    setIsDialogOpen(open);
    if (!open) {
      const params = new URLSearchParams(searchParams);
      params.delete("add-company");
      router.replace(`${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
    }
  };

  // Filter items based on search term
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="ORGANIZATION MANAGEMENT"
        description="Manage your organizations — add, edit, or remove companies with ease."
        actions={
          <>
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="h-8 border-l" />
            <AddCompanyDialog isOpen={isDialogOpen} onOpenChange={handleOpenChange} />
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
                <TableHead>Company ID</TableHead>
                <TableHead>Location</TableHead>
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
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button size="icon" variant="ghost">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash className="h-4 w-4 text-red-500" />
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
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} companies
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
  );
};

export default CompanyPage;