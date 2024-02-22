import { GetWebsiteWithPages } from "@/actions/websites";
import { PageProps } from "@/types";
import React from "react";
import Header from "./_components/Header";
import SearchBar from "./_components/SearchBar";
import Grid from "./_components/Grid";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductionDeployment } from "./_components/ProductionDeployment";
import ViewPages from "./_components/ViewPages";

type Props = {
  params: { userId: string; websiteId: string; c: boolean };
};

const page = async (props: Props) => {
  const created = props.params.c;
  const userId = props.params.userId;
  const websiteId = props.params.websiteId;
  const website = await GetWebsiteWithPages(websiteId);

  if (created) return redirect(`/app/${userId}/websites/${websiteId}`);
  if (!website) return redirect(`/app`);

  return (
    <div>
      <Tabs defaultValue="project" className="w-full">
        <div className="block py-6">
          <TabsList className="">
            <TabsTrigger value="project" className="">
              Project
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="project">
          <Header data={website} />
          <ProductionDeployment websiteId={websiteId} data={website} />
          <ViewPages website={website} />
        </TabsContent>
        <TabsContent value="settings">settings</TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
