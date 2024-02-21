import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brush,
  Cog,
  Database,
  Plus,
  SettingsIcon,
  SquareStackIcon,
} from "lucide-react";

type Props = {};

const TabList = (props: Props) => {
  return (
    <TabsList className="flex flex-col w-full bg-transparent h-full justify-start gap-4 ">
      <TabsTrigger
        value="Settings"
        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
      >
        <Brush />
      </TabsTrigger>
      <TabsTrigger
        value="Components"
        className="data-[state=active]:bg-muted w-10 h-10 p-0"
      >
        <Plus />
      </TabsTrigger>

      <TabsTrigger
        value="Layers"
        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
      >
        <SquareStackIcon />
      </TabsTrigger>
      <TabsTrigger
        value="Media"
        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
      >
        <Database />
      </TabsTrigger>

      <TabsTrigger
        value="Admin"
        className="w-10 h-10 p-0 data-[state=active]:bg-muted"
      >
        <Cog />
      </TabsTrigger>
    </TabsList>
  );
};

export default TabList;
