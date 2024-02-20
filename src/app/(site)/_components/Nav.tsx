import React from "react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Nav = () => {
  return (
    <nav className="w-full px-20">
      <div className="w-full gap-5 items-center flex py-2">
        <h1 className="text-xl">WebWorks</h1>
        <ul className="text-sm text-muted-foreground grow flex gap-5 justify-end items-center">
          <Link className="underline-offset-4 hover:underline" href={"/app"}>
            Dashboard
          </Link>
          <Link className="underline-offset-4 hover:underline" href={"/"}>
            About
          </Link>
          <UserAvatar />
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
