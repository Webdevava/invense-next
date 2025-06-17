"use client"

import * as React from "react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { SidebarGroup } from "@/components/ui/sidebar"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

export function NavSearch() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <SidebarGroup className="py-0 group-data-[collapsible=icon]:hidden">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setOpen(true)}
          className="relative w-full justify-start text-sm border border-border bg-card text-muted-foreground h-10 rounded-lg"
        >
          <MagnifyingGlassIcon className="mr-2 h-4 w-4" weight="bold" />
          <span>Search...</span>
          <div className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 px-1.5 text-xs font-medium opacity-100 sm:flex">
            <span className="text-sm">⌘</span>F
          </div>
        </Button>
      </SidebarGroup>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => runCommand(() => window.location.href = "/dashboard")}
            >
              <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => window.location.href = "/analysis/advertisements")}
            >
              <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
              <span>Advertisements Analysis</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => window.location.href = "/analysis/brands")}
            >
              <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
              <span>Brands Broadcasted</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => window.location.href = "/program-guides")}
            >
              <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
              <span>Program Guides</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => window.location.href = "/reports")}
            >
              <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
              <span>Reports</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => window.location.href = "/custom-analysis")}
            >
              <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
              <span>Custom Analysis</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => window.location.href = "/user-management")}
            >
              <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
              <span>User Management</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => runCommand(() => console.log("Create new report"))}>
              <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
              <span>Create New Report</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Export data"))}>
              <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
              <span>Export Data</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => console.log("Settings"))}>
              <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}