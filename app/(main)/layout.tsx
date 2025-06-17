"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeProvider, useTheme } from "next-themes";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter, usePathname } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { useEffect, useState } from "react";

function BreadcrumbNavigation() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<
    Array<{ label: string; href: string }>
  >([]);

  useEffect(() => {
    // Generate breadcrumbs from pathname
    const pathSegments = pathname.split("/").filter(Boolean);
    const crumbs = [
      { label: "Home", href: "/" },
      ...pathSegments.map((segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        const label = segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        return { label, href };
      }),
    ];
    setBreadcrumbs(crumbs);
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center">
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function ContextMenuItems() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Check if browser navigation is available
    setCanGoBack(window.history.length > 1);
    // Note: There's no reliable way to check if forward navigation is available
    // This is a limitation of the History API
  }, []);

  const handleBack = () => {
    if (canGoBack) {
      router.back();
    }
  };

  const handleForward = () => {
    router.forward();
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <>
      <ContextMenuItem
        onClick={handleBack}
        disabled={!canGoBack}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </ContextMenuItem>
      <ContextMenuItem
        onClick={handleForward}
        className="flex items-center gap-2"
      >
        <ArrowRight className="w-4 h-4" />
        Forward
      </ContextMenuItem>
      <ContextMenuItem
        onClick={handleReload}
        className="flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Reload
      </ContextMenuItem>

      <ContextMenuSeparator />

      <ContextMenuItem
        onClick={() => handleThemeChange("light")}
        className="flex items-center gap-2"
      >
        <Sun className="w-4 h-4" />
        Light Theme
        {theme === "light" && <span className="ml-auto text-xs">✓</span>}
      </ContextMenuItem>
      <ContextMenuItem
        onClick={() => handleThemeChange("dark")}
        className="flex items-center gap-2"
      >
        <Moon className="w-4 h-4" />
        Dark Theme
        {theme === "dark" && <span className="ml-auto text-xs">✓</span>}
      </ContextMenuItem>
      <ContextMenuItem
        onClick={() => handleThemeChange("system")}
        className="flex items-center gap-2"
      >
        <Monitor className="w-4 h-4" />
        System Theme
        {theme === "system" && <span className="ml-auto text-xs">✓</span>}
      </ContextMenuItem>
    </>
  );
}

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ContextMenu>
        <ContextMenuTrigger>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="ml-2">
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <BreadcrumbNavigation />
              </div>
            </header>
              <div className="p-2 container mx-auto lg:px-12 lg:py-8">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItems />
        </ContextMenuContent>
      </ContextMenu>
    </ThemeProvider>
  );
}
