import { Button } from "@/components/ui/button";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between w-full items-center">
      <div>
        <h1 className="text-secondary-foreground text-2xl">My Websites</h1>
        <p className="text-sm text-muted-foreground">
          All your websites at a glance
        </p>
      </div>
      {/* <Button>New</Button> */}
    </div>
  );
};

export default Header;
