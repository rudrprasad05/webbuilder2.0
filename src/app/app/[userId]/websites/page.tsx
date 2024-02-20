import React from "react";
import Header from "./_components/Header";
import { GetUserWebsites } from "@/actions/websites";
import { PageProps } from "@/types";
import Grid from "./_components/Grid";
import SearchBar from "./_components/SearchBar";
import { GetCurrentUser } from "@/actions/user";

const page = async (props: PageProps) => {
  const userId = props.params.userId;

  const websites = await GetUserWebsites(userId);
  //   const user = await GetCurrentUser();
  return (
    <div className="w-full">
      <Header />
      <SearchBar />
      <Grid websites={websites} />
    </div>
  );
};

export default page;
