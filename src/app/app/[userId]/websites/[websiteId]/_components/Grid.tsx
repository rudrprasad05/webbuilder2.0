"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { WebsiteOnlyType, WebsiteWithPagesType } from "@/types";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Grid = ({ website }: { website: WebsiteWithPagesType }) => {
  console.log(website);
  if (website.webpages.length > 0)
    return (
      <div className="grid grid-cols-3 gap-6">
        {website.webpages.map((web) => (
          <Card key={web.id}>
            <CardHeader className="flex flex-row justify-between items-center">
              <div className="flex gap-3 items-center">
                <div>
                  <Image
                    alt="logo"
                    height={60}
                    width={60}
                    src={web.previewImage || ""}
                  />
                </div>
                <div>
                  <h1 className="text-md">{web.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    webworks.com/{website.subDomainName}/{web.pathName}
                  </p>
                </div>
              </div>

              <Link
                href={`${website.id}/editor/${web.id}`}
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
      No webpages. Create one now
    </div>
  );
};

export default Grid;
