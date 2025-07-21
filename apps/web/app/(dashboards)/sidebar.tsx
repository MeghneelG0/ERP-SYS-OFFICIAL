"use client";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar";
import {
  ChevronDown,
  ChevronRight,
  Hammer,
  Check,
  User,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { AppSidebarProps, SidebarItem } from "@/lib/types";
import { useSidebarConfig } from "@/components/layout/sidebarconfig";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "next-auth/react";
import { Button } from "@workspace/ui/components/button";

export function MainAppSidebar({
  activeSection,
  setActiveSection,
}: AppSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dashboardKey = pathname.startsWith("/qc")
    ? "qc"
    : pathname.startsWith("/hod")
      ? "hod"
      : "faculty";
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const sidebarConfig = useSidebarConfig();
  const { title, items } = sidebarConfig[dashboardKey] as {
    title: string;
    items: SidebarItem[];
  };
  const { user, isAuthenticated } = useAuth();

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSubmenu = (id: string) => {
    setExpandedMenu(expandedMenu === id ? null : id);
  };

  const handleNavigation = (id: string, path?: string) => {
    setActiveSection(id);
    if (path) {
      router.push(path); // Navigate to the corresponding route
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-13 items-center border-b p-4">
          <img
            src={
              mounted && (resolvedTheme === "dark" || theme === "dark")
                ? "/MUJ-Logo-Dark.png"
                : "/MUJ-Logo.png"
            }
            alt="MUJ Logo"
            className="h-20 w-auto object-contain"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div>{title}</div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <div key={item.id}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() =>
                        item.subItems
                          ? toggleSubmenu(item.id)
                          : handleNavigation(item.id, item.path || "/")
                      }
                      isActive={activeSection === item.id}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      {item.subItems && (
                        <span className="ml-auto">
                          {expandedMenu === item.id ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {item.subItems && expandedMenu === item.id && (
                    <div className="ml-6">
                      {item.subItems.map((subItem) => (
                        <SidebarMenuItem key={subItem.id}>
                          <SidebarMenuButton
                            onClick={() =>
                              handleNavigation(subItem.id, subItem.path)
                            }
                            isActive={activeSection === subItem.id}
                          >
                            <span>{subItem.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      {/* Sidebar Footer for user info and logout */}
      <div className="mt-auto px-4 pb-4 pt-2 flex flex-col items-center text-center gap-2">
        {isAuthenticated && user && (
          <>
            <div className="flex items-center gap-2">
              <User className="h-6 w-6 text-gray-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[120px]">
                {user.name}
              </span>
            </div>
            <div className="text-xs text-gray-400 truncate max-w-[160px]">
              {user.email}
            </div>
          </>
        )}
        <Button
          onClick={() => signOut()}
          variant="destructive"
          className="mt-4 w-full flex items-center justify-center gap-2"
          aria-label="Logout"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </Sidebar>
  );
}
