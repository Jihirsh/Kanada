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
  AlarmClockCheck,
  Compass,
  DraftingCompass,
  LibraryBig,
  Orbit,
  PenSquare,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

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
    icon: LibraryBig,
    path: "/library",
  },
  {
    title: "Quizzes",
    icon: DraftingCompass,
    path: "/quizzes",
  },
  {
    title: "Pomodoro",
    icon: AlarmClockCheck,
    path: "/pomodoro",
  },
];

function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-accent flex items-center p-5">
        <Orbit className="flex" height={40} width={40} />
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
                    <a href={menu.path} className="">
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
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
