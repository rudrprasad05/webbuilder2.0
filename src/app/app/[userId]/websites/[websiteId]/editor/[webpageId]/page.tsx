import React from "react";
import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";
import EditorProvider from "@/provider/editor/editor-provider";
import FunnelEditorSidebar from "./_components/website-editor-sidebar";
import FunnelEditorNavigation from "./_components/funnel-editor-navigation";
import FunnelEditor from "./_components/website-editor";

type Props = {
  params: {
    userId: string;
    websiteId: string;
    webpageId: string;
  };
};
const page = async ({ params }: Props) => {
  const webpage = await prisma.webpages.findUnique({
    where: {
      id: params.webpageId,
    },
  });
  if (!webpage) {
    return redirect(`/app/${params.userId}/websites/${params.websiteId}`);
  }
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden">
      <EditorProvider
        subaccountId={params.userId}
        funnelId={params.websiteId}
        pageDetails={webpage}
      >
        <FunnelEditorNavigation
          funnelId={params.websiteId}
          funnelPageDetails={webpage}
          subaccountId={params.userId}
        />
        <div className="h-full flex justify-center">
          <FunnelEditor funnelPageId={params.webpageId} />
        </div>

        <FunnelEditorSidebar subaccountId={params.userId} />
      </EditorProvider>
    </div>
  );
};

export default page;
