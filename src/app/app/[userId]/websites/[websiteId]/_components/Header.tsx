import { buttonVariants } from "@/components/ui/button";
import { WebsiteOnlyType, WebsiteWithPagesType } from "@/types";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = ({ data }: { data: WebsiteWithPagesType }) => {
  return (
    <div className="justify-between flex items-center">
      <div className="flex gap-3 items-center">
        <div>
          <Image height={50} width={50} alt="logo" src={data.favicon || ""} />
        </div>
        <p className="text-2xl">{data.name}</p>
      </div>
      <div className="flex gap-3">
        <Link href={""} className={buttonVariants({ variant: "default" })}>
          Visit
        </Link>
        <Link href={""} className={buttonVariants({ variant: "secondary" })}>
          Domains
        </Link>
      </div>
    </div>
  );
};

export default Header;
