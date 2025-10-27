"use client";

import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ToggleTheme from "../ToggleTheme";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";

const Navbar = () => {
  {
    /*const { toggleSidebar} = useSidebar();*/
  }
  return (
    <nav className="p-4 flex justify-between items-center sticky top-0 bg-background z-10">
      {/*Left*/}
      <SidebarTrigger />
      {/*<Button variant="outline" onClick={toggleSidebar}>Custom Button</Button>*/}
      {/*Right*/}
      <div className="flex gap-4 items-center">
        <Link href="/">Dashboard</Link>
        <ToggleTheme />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/116498941" />
              <AvatarFallback>MR</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-3 w-3" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-3 w-3" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <LogOut className="mr-2 h-3 w-3" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
