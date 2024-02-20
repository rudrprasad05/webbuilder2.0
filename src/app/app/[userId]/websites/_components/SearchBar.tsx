import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import NewWebsite from "./NewWebsite";

const SearchBar = () => {
  return (
    <div className="flex gap-6 py-6">
      <div className="relative grow">
        <Input autoComplete="off" placeholder="Search" />
        <div className="text-muted-foreground h-full aspect-square absolute top-0 right-0 grid place-items-center ">
          <Search />
        </div>
      </div>
      <NewWebsite />
    </div>
  );
};

export default SearchBar;
