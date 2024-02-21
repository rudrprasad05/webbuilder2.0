import { GetDomainContent } from "@/actions/websites";
import FunnelEditor from "@/app/app/[userId]/websites/[websiteId]/editor/[webpageId]/_components/website-editor";
import Construction from "@/components/global/Construction";
import EditorProvider from "@/provider/editor/editor-provider";
import { notFound } from "next/navigation";

const Page = async ({
  params,
}: {
  params: { domain: string; path: string };
}) => {
  const domainData = await GetDomainContent(params.domain);
  const pageData = domainData?.webpages.find(
    (page) => page.pathName === params.path
  );

  if (!pageData || !domainData) return notFound();

  if (!pageData.published) return <Construction />;

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
