import prisma from "@/lib/prismadb";
import EditorProvider from "@/provider/editor/editor-provider";
import { notFound } from "next/navigation";
import React from "react";
import FunnelEditor from "../app/[userId]/websites/[websiteId]/editor/[webpageId]/_components/website-editor";
import { GetDomainContent } from "@/actions/websites";
import Construction from "@/components/global/Construction";
("../(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor");

const Page = async ({ params }: { params: { domain: string } }) => {
  const domainData = await GetDomainContent(params.domain);
  if (!domainData) return notFound();

  const pageData = domainData.webpages.find((page) => !page.pathName);

  if (!pageData) return notFound();

  if (!pageData.published) return <Construction />;

  await prisma.webpages.update({
    where: {
      id: pageData.id,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
  });

  return (
    <EditorProvider
      subaccountId={domainData.userId}
      pageDetails={pageData}
      funnelId={domainData.id}
    >
      <FunnelEditor funnelPageId={pageData.id} liveMode={true} />
    </EditorProvider>
  );
};

export default Page;
