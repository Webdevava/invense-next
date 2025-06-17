"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

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

interface AddUserDialogProps {
  companies: Company[];
  users: User[];
  availableEmails: string[];
  onAddUser: (newUser: User) => void;
}

export default function AddUserDialog({
  companies,
  users,
  availableEmails,
  onAddUser,
}: AddUserDialogProps) {
  const id = useId();
  const [email, setEmail] = useState<string>("");
  const [companyId, setCompanyId] = useState<string>("");
  const [role, setRole] = useState<"admin" | "user" | "super admin">("user");

  const hasSuperAdmin = users.some((user) => user.role === "super admin");

  const handleSubmit = () => {
    if (!email || !companyId || !role) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (role === "super admin" && hasSuperAdmin) {
      toast.error("Only one super admin is allowed.");
      return;
    }

    const newUser: User = {
      id: `U-${Date.now()}`,
      email,
      companyId,
      role,
    };

    onAddUser(newUser);
    setEmail("");
    setCompanyId("");
    setRole("user");

    toast.success("User added successfully.");
  };

  // Filter out emails that are already assigned to users
  const availableEmailOptions = availableEmails.filter(
    (email) => !users.some((user) => user.email === email)
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Add User
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Enter details to add a new user, including email, company, and role.
        </DialogDescription>
        <div className="overflow-y-auto">
          <div className="px-6 pt-4 pb-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${id}-email`}>Email</Label>
                <Select value={email} onValueChange={setEmail}>
                  <SelectTrigger className="w-full" id={`${id}-email`}>
                    <SelectValue placeholder="Select user email" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableEmailOptions.length > 0 ? (
                      availableEmailOptions.map((email) => (
                        <SelectItem key={email} value={email}>
                          {email}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="" disabled>
                        No available emails
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-company`}>Company</Label>
                <Select value={companyId} onValueChange={setCompanyId}>
                  <SelectTrigger className="w-full" id={`${id}-company`}>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-role`}>Role</Label>
                <Select
                  value={role}
                  onValueChange={(value: "admin" | "user" | "super admin") => setRole(value)}
                >
                  <SelectTrigger className="w-full" id={`${id}-role`}>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="super admin" disabled={hasSuperAdmin}>
                      Super Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </div>
        </div>
        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={handleSubmit}>
              Add User
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}