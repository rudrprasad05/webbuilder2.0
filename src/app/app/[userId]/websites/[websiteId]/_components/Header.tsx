import { WebsiteOnlyType, WebsiteWithPagesType } from "@/types";
import Image from "next/image";
import React from "react";

const Header = ({ data }: { data: WebsiteWithPagesType }) => {
  return (
    <div className="flex gap-3 items-center">
      <div>
        <Image height={50} width={50} alt="logo" src={data.favicon || ""} />
      </div>
      <p className="text-2xl">{data.name}</p>
    </div>
  );
};

export default Header;
