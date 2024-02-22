import puppeteer from "puppeteer";
import { NextResponse } from "next/server";
import { uploadFileToS3 } from "@/app/api/s3-upload/route";
import { UpdateWebsitePreviewImage } from "./websites";

export default async function handler(req: any, res: any) {
  switch (req.method) {
    case "GET": {
      try {
        // const result = await handleGetRequest();
        console.log("get not ready");

        return res.status(200).json({ message: "Success" });
      } catch (error) {
        return res.status(400).json({ message: "Error", error });
      }
    }

    case "POST": {
      console.log("first");
      try {
        const result = await handlePostRequest(req.body);

        return res.status(201).json({ message: "Success", result });
      } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Error", error });
      }
    }

    default: {
      return res.status(405).json({ message: "Method not allowed" });
    }
  }
}

export const TakeScreenShot = async (url: string, websiteId: string) => {
  console.log("first");
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const urlObject = new URL(url);
    const path = `/tmp/${urlObject.hostname}.png`;
    await page.goto(url);
    const imageBuffer = await page.screenshot({
      path,
      fullPage: false,
    });
    await browser.close();

    const filename = await uploadFileToS3(
      imageBuffer,
      `screenshot${websiteId}`
    );
    const res = await UpdateWebsitePreviewImage(
      `https://mctechfiji.s3.amazonaws.com/wordpress/screenshot${websiteId}`,
      websiteId
    );

    return res;
  } catch (error) {
    console.error(error);
    return new NextResponse("fail");
  }
};

const handlePostRequest = async (options: any) => {};
