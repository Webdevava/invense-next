"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import SectionHeader from "@/components/layouts/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddUserDialog from "@/components/dialogs/add-user";

interface User {
  id: string;
  email: string;
  companyId: string;
  role: "admin" | "user" | "super admin";
}

interface Company {
  id: string;
  name: string;
}

const initialUsers: User[] = [
  {
    id: "U-1001",
    email: "alex.thompson@acme.com",
    companyId: "C-1001",
    role: "super admin",
  },
  {
    id: "U-1002",
    email: "sarah.chen@acme.com",
    companyId: "C-1002",
    role: "admin",
  },
  {
    id: "U-1003",
    email: "james.wilson@acme.com",
    companyId: "C-1003",
    role: "user",
  },
  {
    id: "U-1004",
    email: "maria.garcia@acme.com",
    companyId: "C-1004",
    role: "admin",
  },
  {
    id: "U-1005",
    email: "david.kim@acme.com",
    companyId: "C-1005",
    role: "user",
  },
];

const companies: Company[] = [
  { id: "C-1001", name: "San Francisco, US" },
  { id: "C-1002", name: "Singapore" },
  { id: "C-1003", name: "London, UK" },
  { id: "C-1004", name: "Madrid, Spain" },
  { id: "C-1005", name: "Seoul, KR" },
];

// Sample list of available user emails (could be fetched from a backend)
const availableEmails = [
  "alex.thompson@acme.com",
  "sarah.chen@acme.com",
  "james.wilson@acme.com",
  "maria.garcia@acme.com",
  "david.kim@acme.com",
  "emma.brown@acme.com",
  "liam.jones@acme.com",
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<User[]>(initialUsers);

  const filteredUsers = users.filter((user) => {
    const email = user.email.toLowerCase();
    const companyName = companies.find((comp) => comp.id === user.companyId)?.name.toLowerCase() || "";
    const role = user.role.toLowerCase();

    return (
      email.includes(searchTerm.toLowerCase()) ||
      companyName.includes(searchTerm.toLowerCase()) ||
      role.includes(searchTerm.toLowerCase())
    );
  });

  const handleAddUser = (newUser: User) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const handleRevokePermission = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="USER MANAGEMENT"
        description="Manage your organization's users — add, edit, or remove users with ease."
        actions={
          <>
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
            <div className="h-8 border-l" />
            <AddUserDialog
              companies={companies}
              users={users}
              availableEmails={availableEmails}
              onAddUser={handleAddUser}
            />
          </>
        }
      />

      <Card className="p-0 gap-0 rounded-lg">
        <CardContent className="p-4">
          <Table>
            <TableHeader className="bg-transparent">
              <TableRow className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r">
                <TableHead>Sr. No.</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
              {filteredUsers.map((user, index) => (
                <TableRow
                  key={user.id}
                  className="*:border-border hover:bg-transparent [&>:not(:last-child)]:border-r"
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>
                    {companies.find((comp) => comp.id === user.companyId)?.name || "N/A"}
                  </TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRevokePermission(user.id)}
                      title="Revoke Permission"
                    >
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}