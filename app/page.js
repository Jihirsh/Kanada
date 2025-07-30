import { Ghost } from "lucide-react";
import ChatInputBox from "./_components/ChatInputBox";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex w-full">
      <ChatInputBox />
      <Button className="rounded-full m-4 flex items-center gap-2 px-6 py-3 min-w-[100px]">
        <Ghost />
        Ghost
      </Button>
      
    </div>
  );
}
