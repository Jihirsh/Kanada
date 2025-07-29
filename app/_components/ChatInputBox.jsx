import Image from "next/image";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Atom,
  AudioLines,
  Cpu,
  Globe,
  Mic,
  Paperclip,
  SearchCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ChatInputBox() {
  return (
    <div className="flex flex-col h-screen items-center justify-center w-full">
      <Image src={"/kanadalogo.png"} alt="logo" height={260} width={260} style={{ width: "auto", height: "auto" }} />
      <div className="p-2 w-full max-w-2xl border rounded-2xl mt-10">
        <div className="flex justify-between items-end">
          <Tabs defaultValue="Search" className="w-[400px]">
            <TabsContent value="Search">
              <input
                type="text"
                placeholder="Ask Anything"
                className="w-full p-4 outline-none"
              />
            </TabsContent>
            <TabsContent value="Research">
              <input
                type="text"
                placeholder="Research Anything"
                className="w-full p-4 outline-none"
              />
            </TabsContent>
            <TabsList>
              <TabsTrigger value="Search" className={"text-primary"}>
                {" "}
                <SearchCode /> Search
              </TabsTrigger>
              <TabsTrigger value="Research" className={"text-primary"}>
                {" "}
                <Atom /> Research
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-4 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none p-2 rounded-md hover:bg-gray-100">
                <Cpu className="text-gray-500 h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost">
              <Globe className="text-gray-500 h-5 w-5" />
            </Button>
            <Button variant="ghost">
              <Paperclip className="text-gray-500 h-5 w-5" />
            </Button>
            <Button variant="ghost">
              <Mic className="text-gray-500 h-5 w-5" />
            </Button>
            <Button>
              <AudioLines className="text-white h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInputBox;
