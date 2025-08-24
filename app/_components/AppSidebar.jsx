"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  Compass,
  DraftingCompass,
  Library,
  Orbit,
  PenSquare,
  Timer,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/theme-btn";

const MenuOptions = [
  {
    title: "Chat",
    icon: PenSquare,
    path: "/",
  },
  {
    title: "Discover",
    icon: Compass,
    path: "/discover",
  },
  {
    title: "Library",
    icon: Library,
    path: "/library",
  },
  {
    title: "Quizzes",
    icon: DraftingCompass,
    path: "/quizzes",
  },
  {
    title: "Pomodoro",
    icon: Timer,
    path: "/pomodoro",
  },
];

function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-accent flex items-center p-5">
        <Orbit height={40} width={40} />
        {/* <Image src={"/kanadalogo.png"} alt="logo" width={180} height={100} style={{ width: "auto", height: "auto" }} /> */}
      </SidebarHeader>
      <SidebarContent className="bg-accent">
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {MenuOptions.map((menu, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className={`p-4 py-6 hover:bg-transparent hover:font-medium 
                    ${path?.includes(menu.path) && "font-semibold"}`}
                  >
                    <a
                      href={menu.path}
                      className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <menu.icon className="h-8 w-8" />
                      <span className="text-lg">{menu.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <Button className="rounded-full mx-4 mt-4 group-data-[collapsible=icon]:hidden">
              Log In
            </Button>
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-accent">
        <div className="flex items-center justify-between">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="group-data-[collapsible=icon]:hidden">
            <ModeToggle />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
