import { TakeScreenShot } from "@/actions/screenshot";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { WebsiteWithPagesType } from "@/types";
import { AlertCircle, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const ProductionDeployment = async ({
  data,
  websiteId,
}: {
  websiteId: string;
  data: WebsiteWithPagesType;
}) => {
  // await TakeScreenShot("https://goshawk.vercel.app/");
  if (!data.previewImage) {
    const res = await TakeScreenShot(
      `http://localhost:3000/${data.subDomainName}`,
      websiteId as string
    )
      .then((res) => console.log(res))
      .catch((e) => console.log(e));

    console.log(res);
  }
  return (
    <div className="py-12">
      <div>
        <h1 className="text-2xl">Production Deployment</h1>
        <h2 className="py-3 text-sm text-muted-foreground">
          This deployment will be visible to your viewers
        </h2>
      </div>
      <Card className="">
        <CardContent className="grid grid-cols-2 gap-3 pt-6 w-full">
          <div className="aspect-[16/9] max-w-[640px] border grid place-items-center">
            <HandlePreviewImage website={data} />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div>
                <CardDescription>Status</CardDescription>
                <HandleSiteLiveStatus isLive={data.published} />
              </div>
              <div></div>
            </div>
            <div>
              <CardDescription>Domains</CardDescription>
              <div className="text-sm ">
                <Link
                  className="flex gap-2 items-center"
                  href={`http://localhost:3000/${data.subDomainName}`}
                >
                  {`http://localhost:3000/${data.subDomainName}`}
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const HandleSiteLiveStatus = ({ isLive }: { isLive: boolean }) => {
  if (isLive)
    return (
      <div className="flex gap-2">
        Live <AlertCircle />
      </div>
    );
  return (
    <div className="flex gap-2 text-sm items-center">
      <AlertCircle className="text-rose-500 w-4 h-4" />
      Not Live
    </div>
  );
};

const HandlePreviewImage = ({ website }: { website: WebsiteWithPagesType }) => {
  if (website.previewImage != null)
    return (
      <Image
        src={website.previewImage}
        alt="preview image"
        height={360}
        width={640}
      />
    );
  return (
    <div className="text-center text-sm text-muted-foreground">
      Press refresh to generate your preview image
    </div>
  );
};
