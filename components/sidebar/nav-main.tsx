"use client"

import { usePathname } from "next/navigation"
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()

  const isItemActive = (item: { url: string; items?: unknown[] }) => {
    // For items with subitems, check if any subitem is active
    if (item.items) {
      return item.items.some(
        (subItem) =>
          typeof subItem === "object" &&
          subItem !== null &&
          "url" in subItem &&
          pathname === (subItem as { url: string }).url
      )
    }
    // For regular items, check exact match
    return pathname === item.url
  }

  const isSubItemActive = (subItemUrl: string) => {
    return pathname === subItemUrl
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item, index) => {
          const itemActive = isItemActive(item)
          
          return (
            <div key={item.title}>
              <SidebarMenuItem>
                {item.items ? (
                  <Collapsible
                    defaultOpen={itemActive}
                    className="group/collapsible"
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton 
                        tooltip={item.title} 
                        className={cn(
                          "h-10 border border-transparent hover:border-border transition-all",
                          itemActive && "bg-sidebar-accent  border-border hover:bg-sidebar-accent"
                        )}
                      >
                        {item.icon && <item.icon/>}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="pt-2 gap-2">
                        {item.items.map((subItem) => {
                          const subItemActive = isSubItemActive(subItem.url)
                          
                          return (
                            <SidebarMenuSubItem key={subItem.title} className="">
                              <SidebarMenuSubButton 
                                asChild
                                className={cn("h-8",
                                  subItemActive && "bg-sidebar-primary  border-border hover:bg-sidebar-primary/95 hover:text-muted text-muted"
                                )}
                              >
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SidebarMenuButton 
                    tooltip={item.title} 
                    asChild 
                    className={cn(
                      "h-10 border border-transparent hover:border-border transition-all",
                      itemActive && "bg-sidebar-primary  border-border hover:bg-sidebar-primary/95 hover:text-muted text-muted"
                    )}
                  >
                    <a href={item.url}>
                      {item.icon && <item.icon/>}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
              
              {/* Add separator after Analysis (index 1) */}
              {index === 1 && <Separator className="my-2" />}
              
              {/* Add separator before User Management (last item) */}
              {index === items.length - 1 - 1 && <Separator className="my-2" />}
            </div>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}