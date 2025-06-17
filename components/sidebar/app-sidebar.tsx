"use client";

import * as React from "react";
import {
  Waveform,
  Command,
  FileText,
  ImageSquare,
  Layout,
  UsersThree,
  HouseLine
} from "@phosphor-icons/react";

import { CompanySwitcher } from "./company-switcher";
import { NavSearch } from "./nav-search";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Sample data with updated icons
const data = {
  user: {
    name: "Shantanu",
    role: "super admin",
    avatar: "/avatars/shadcn.jpg",
  },
companies: [
  {
    name: "GreenGrid Energy",
    logo: ImageSquare,
    location: "Texas, USA",
    industry: "Renewable Energy",
  },
  {
    name: "Metro Motors",
    logo: Waveform,
    location: "Detroit, USA",
    industry: "Automotive",
  },
  {
    name: "VoltEdge Transformers",
    logo: Command,
    location: "Bavaria, Germany",
    industry: "Power Distribution",
  },
],
navMain: [
    {
    title: "Home",
    url: "/",
    icon: HouseLine,
  },
  {
    title: "Dashboards",
    url: "#",
    icon: Layout,
    items: [
      {
        title: "Energy Dashboard",
        url: "/dashboards/energy",
      },
      {
        title: "Motor Dashboard",
        url: "/dashboards/motor",
      },
            {
        title: "Water Dashboard",
        url: "/dashboards/water",
      },
      {
        title: "Transformer Dashboard",
        url: "/dashboards/transformer",
      },
    ],
  },
  {
    title: "Reports",
    url: "#",
    icon: FileText,
    items: [
      {
        title: "Device Reports",
        url: "/reports/devices",
      },
      {
        title: "Alert Reports",
        url: "/reports/alerts",
      },
    ],
  },
  {
    title: "Assets",
    url: "#",
    icon: ImageSquare,
    items: [
      {
        title: "Company",
        url: "/assets/company",
      },
      {
        title: "Locations",
        url: "/assets/locations",
      },
      {
        title: "Panels",
        url: "/assets/panels",
      },
    ],
  },
  {
    title: "Devices",
    url: "/devices",
    icon: Waveform,
  },
  {
    title: "User Management",
    url: "/user-management",
    icon: UsersThree,
  },
]

};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="user-sel border dark:border-border/50 shadow-lg rounded-lg overflow-hidden top-2 h-[98vh] left-2 outline-1 outline-border outline-offset-1">
      <SidebarHeader>
        <CompanySwitcher companies={data.companies} />
      </SidebarHeader>
      <SidebarContent>
        <NavSearch />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}