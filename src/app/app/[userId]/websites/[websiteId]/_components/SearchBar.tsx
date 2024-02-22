import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import NewWebpage from "./NewWebpage";
import { WebsiteWithPagesType } from "@/types";

const SearchBar = ({ website }: { website: WebsiteWithPagesType }) => {
  return (
    <>
      <div>
        <h1 className="text-2xl">Pages</h1>
        <h2 className="py-3 text-sm text-muted-foreground">
          Pages in your website
        </h2>
      </div>
      <div className="flex gap-3 py-6">
        <div className="relative grow">
          <Input autoComplete="off" placeholder="Search" />
          <div className="text-muted-foreground h-full aspect-square absolute top-0 right-0 grid place-items-center ">
            <Search />
          </div>
        </div>
        <NewWebpage website={website} />
      </div>
    </>
  );
};

export default SearchBar;
