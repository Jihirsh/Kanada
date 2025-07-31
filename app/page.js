import { Ghost } from "lucide-react";
import ChatInputBox from "./_components/ChatInputBox";
import { Button } from "@/components/ui/button";
import QuickTopics from "./_components/QuickTopics";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex items-center justify-end mb-30">
        <Button className="rounded-full m-4 flex items-center gap-2 px-6 py-3 min-w-[100px]">
        <Ghost />
        Ghost
      </Button>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <ChatInputBox />
        <div className="p-15">
          <QuickTopics className="flex items-center justify-center" />
        </div>
      </div>
    </div>
  );
}
