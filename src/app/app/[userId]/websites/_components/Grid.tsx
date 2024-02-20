"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { WebsiteOnlyType } from "@/types";
import { Edit, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Grid = ({ websites }: { websites: WebsiteOnlyType[] }) => {
  if (websites && websites.length > 0)
    return (
      <div className="grid grid-cols-3 gap-6">
        {websites.map((web) => (
          <Card key={web.id}>
            <CardHeader className="flex flex-row justify-between items-center">
              <div className="flex gap-3 items-center">
                <div>
                  <Image
                    alt="logo"
                    height={60}
                    width={60}
                    src={web.favicon || ""}
                  />
                </div>
                <div>
                  <h1 className="text-md">{web.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    webworks.com/{web.subDomainName}
                  </p>
                </div>
              </div>

              <Link
                href={`websites/${web.id}`}
                className="h-min transitio p-1 file:hover:bg-accent hover:text-accent-foreground"
              >
                <Edit className="w-4 h-4 text-muted-foreground" />
              </Link>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  return (
    <div className="text-center text-sm text-muted-foreground">
      No websites. Create one now
    </div>
  );
};

export default Grid;
