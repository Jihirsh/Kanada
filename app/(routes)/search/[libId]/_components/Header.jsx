import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Link, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";

function Header({ searchInputRecord }) {
  return (
    <div className="p-4 border-b flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex gap-1 items-center">
          <Clock className="h-5 w-5 text-gray-500" />
          <h2 className="text-sm text-gray-500">
            {moment(searchInputRecord?.created_at).fromNow()}
          </h2>
        </div>
      </div>

      <h2 className="line-clamp-1 font-semibold">{searchInputRecord?.searchInput}</h2>

      <div className="flex gap-3">
        <Button>
          <Link />
        </Button>
        <Button>
          <Send />
          Share
        </Button>
      </div>
    </div>
  );
}

export default Header;
