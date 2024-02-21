import { ConstructionIcon } from "lucide-react";
import React from "react";

const Construction = () => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="flex gap-5 items-center text-amber-400">
        <ConstructionIcon className="w-12 h-12" />
        <h1 className="text-primary text-3xl">Site under construction</h1>
        <ConstructionIcon className="w-12 h-12" />
      </div>
    </div>
  );
};

export default Construction;
