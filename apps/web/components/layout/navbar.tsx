"use client";

import { Bell, HelpCircle, Search, LogOut } from "lucide-react";
import type { ReactNode } from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { ThemeToggle } from "@workspace/ui/components/theme-toggle";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@workspace/ui/components/dropdown-menu";

export interface NavbarProps {
  appTitle?: string;
  showSearch?: boolean;
  showThemeToggle?: boolean;
  showNotifications?: boolean;
  showHelp?: boolean;
  userAvatar?: string;
  userInitials?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  onSearch?: (query: string) => void;
}

export function Navbar({
  appTitle,
  showSearch = true,
  showThemeToggle = true,
  showNotifications = true,
  showHelp = true,
  userAvatar = "/placeholder.svg",
  userInitials = "JD",
  leftContent,
  rightContent,
  onSearch,
}: NavbarProps) {
  const pathname = usePathname();
  const hideNotifications = pathname.startsWith("/qc");
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
      <div className="flex items-center gap-2">{leftContent}</div>

      {showSearch && (
        <div className="w-full flex-1 flex items-center">
          <SidebarTrigger className="mr-2 hidden md:flex" />
          <form
            className="hidden md:block flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              const query = formData.get("search") as string;
              onSearch?.(query);
            }}
          >
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                name="search"
                type="search"
                placeholder="Search..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-full lg:w-1/3"
              />
            </div>
          </form>
        </div>
      )}

      <div className="flex items-center gap-2">
        {rightContent}

        {showThemeToggle && <ThemeToggle />}

        {isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={userAvatar} alt="User" />
                <AvatarFallback>
                  {user.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : userInitials}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex flex-col items-center gap-1 p-3">
                <span className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[120px]">
                  {user.name === "QAC Admin" ? "QC Admin" : user.name}
                </span>
                <span className="text-xs text-gray-400 truncate max-w-[160px]">
                  {user.email}
                </span>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                variant="destructive"
                className="flex items-center gap-2 justify-center cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar} alt="User" />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        )}
      </div>
    </header>
  );
}
