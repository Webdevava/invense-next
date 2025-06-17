"use client";

import { useId, useState } from "react";
import { ImagePlusIcon, Plus, XIcon } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Logo {
  file: File;
  preview: string;
  id: string;
}

interface CompanyLogoProps {
  logo: Logo | null;
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeLogo: () => void;
}

interface AddCompanyDialogProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function AddCompanyDialog({ isOpen, onOpenChange }: AddCompanyDialogProps) {
  const id = useId();
  const maxLength: number = 180;
  const [description, setDescription] = useState<string>("A brief description of your company.");
  const [logo, setLogo] = useState<Logo | null>(null);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setDescription(e.target.value);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const preview = URL.createObjectURL(file);
      setLogo({ file, preview, id: Date.now().toString() });
    }
  };

  const removeLogo = () => {
    if (logo) {
      URL.revokeObjectURL(logo.preview);
      setLogo(null);
    }
  };

  const characterCount: number = description.length;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus />
          Add Company
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Add Company
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Enter details to add a new company, including name, email, location, and logo.
        </DialogDescription>
        <div className="overflow-y-auto">
          <CompanyLogo
            logo={logo}
            handleLogoChange={handleLogoChange}
            removeLogo={removeLogo}
          />
          <div className="px-6 pt-4 pb-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${id}-company-name`}>Company Name</Label>
                <Input
                  id={`${id}-company-name`}
                  placeholder="Acme Inc."
                  type="text"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-company-email`}>Company Email</Label>
                <Input
                  id={`${id}-company-email`}
                  placeholder="contact@acme.com"
                  type="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-location`}>Location</Label>
                <Input
                  id={`${id}-location`}
                  placeholder="123 Business St, City, Country"
                  type="text"
                  required
                />
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-postal-code`}>Postal Code</Label>
                  <Input
                    id={`${id}-postal-code`}
                    placeholder="123412"
                    type="number"
                    step="any"
                    required
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-phone`}>Phone no.</Label>
                  <Input
                    id={`${id}-phone`}
                    placeholder="9876543210"
                    type="number"
                    step="any"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-website`}>Website</Label>
                <div className="flex rounded-md shadow-xs">
                  <span className="border-input bg-background text-muted-foreground -z-10 inline-flex items-center rounded-s-md border px-3 text-sm">
                    https://
                  </span>
                  <Input
                    id={`${id}-website`}
                    className="-ms-px rounded-s-none shadow-none"
                    placeholder="yourcompany.com"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${id}-description`}>Description <span className="text-muted-foreground">(optional)</span></Label>
                <Textarea
                  id={`${id}-description`}
                  placeholder="Write a brief note about your company"
                  value={description}
                  onChange={handleDescriptionChange}
                  maxLength={maxLength}
                  aria-describedby={`${id}-description-count`}
                />
                <p
                  id={`${id}-description-count`}
                  className="text-muted-foreground mt-2 text-right text-xs"
                  role="status"
                  aria-live="polite"
                >
                  <span className="tabular-nums">{maxLength - characterCount}</span>{" "}
                  characters left
                </p>
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
            <Button type="button">Save Company</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CompanyLogo({ logo, handleLogoChange, removeLogo }: CompanyLogoProps) {
  return (
    <div className="h-32">
      <div className="bg-muted relative flex size-full items-center justify-center overflow-hidden">
        {logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="size-full object-contain"
            src={logo.preview}
            alt="Preview of company logo"
            width={128}
            height={128}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <label
            className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
            aria-label={logo ? "Change logo" : "Upload logo"}
          >
            <ImagePlusIcon size={16} aria-hidden="true" />
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleLogoChange}
              aria-label="Upload company logo"
            />
          </label>
          {logo && (
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={removeLogo}
              aria-label="Remove logo"
            >
              <XIcon size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}