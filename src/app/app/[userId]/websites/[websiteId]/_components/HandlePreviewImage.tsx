"use client";

import { TakeScreenShot } from "@/actions/screenshot";
import { WebsiteOnlyType, WebsiteWithPagesType } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export const HandlePreviewImage = ({
  data,
  websiteId,
}: {
  websiteId: string;
  data: WebsiteWithPagesType;
}) => {
  const [website, setWebsite] = useState<WebsiteOnlyType | null>(null);
  // useEffect(() => {
  //   const handleGet = async () => {
  //     const res = await TakeScreenShot(
  //       `http://localhost:3000/${data.subDomainName}`,
  //       websiteId as string
  //     )
  //       .then((res) => setWebsite(res))
  //       .catch((e) => console.log(e));
  //   };
  //   handleGet();
  // }, [website]);
  if (website == null)
    return (
      <div className="text-center text-sm text-muted-foreground">
        Press refresh to generate your preview image
      </div>
    );

  return (
    <Image
      src={website.previewImage}
      alt="preview image"
      height={360}
      width={640}
    />
  );
};
