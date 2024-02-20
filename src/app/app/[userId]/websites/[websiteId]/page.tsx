import { GetWebsiteWithPages } from "@/actions/websites";
import { PageProps } from "@/types";
import React from "react";
import Header from "./_components/Header";
import SearchBar from "./_components/SearchBar";
import Grid from "./_components/Grid";
import { redirect } from "next/navigation";

type Props = {
  params: { userId: string; websiteId: string; c: boolean };
};

const page = async (props: Props) => {
  const created = props.params.c;
  const userId = props.params.userId;
  const websiteId = props.params.websiteId;
  const website = await GetWebsiteWithPages(websiteId);

  if (created) return redirect(`/app/${userId}/websites/${websiteId}`);

  return (
    <div>
      <Header data={website} />
      <SearchBar website={website} />
      <Grid website={website} />
    </div>
  );
};

export default page;
