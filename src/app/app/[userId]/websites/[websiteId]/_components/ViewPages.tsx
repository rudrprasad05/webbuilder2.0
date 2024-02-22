import React from "react";
import Grid from "./Grid";
import SearchBar from "./SearchBar";
import { WebsiteWithPagesType } from "@/types";

export default function ViewPages({
  website,
}: {
  website: WebsiteWithPagesType;
}) {
  return (
    <>
      <SearchBar website={website} />
      <Grid website={website} />
    </>
  );
}
