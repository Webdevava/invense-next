"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Logo from "@/public/logo"
import Link from "next/link"

export function CompanySwitcher({
  companies,
}: {
  companies: {
    name: string
    logo: React.ElementType
    location: string
    industry: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeCompany, setActiveCompany] = React.useState(companies[0])

  if (!activeCompany) {
    return null
  }


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
           <SidebarMenuButton
              size="lg"
              className="data-[state=open]:outline-2 outline-offset-1 outline-ring data-[state=open]:shadow-2xl border rounded-lg bg-card/50 hover:bg-accent/25 cursor-pointer transition-all duration-300 ease-in-out"
            >
              <div className="bg-accent text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg p-1">
                {/* <activeCompany.logo className="size-4" /> */}
               <Logo/>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeCompany.name}</span>
                <span className="truncate text-xs">{activeCompany.industry}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Industries
            </DropdownMenuLabel>
            {companies.map((company, index) => (
              <DropdownMenuItem
                key={company.name}
                onClick={() => setActiveCompany(company)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <company.logo className="size-3.5 shrink-0" />
                </div>
                {company.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <Link href={'/assets/company?add-company=true'}>
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add company</div>
            </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}