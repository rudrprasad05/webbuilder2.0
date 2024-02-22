// pages/api/images/index.js

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import puppeteer from "puppeteer";

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

// const handleGetRequest = async () => {
//   const uploads = await handleGetCloudinaryUploads();

//   return uploads;
// };

const handlePostRequest = async (options: any) => {
  console.log("first");
  // Get the url and fullPage from the options
  const { url, fullPage } = options;

  // Launch a new browser using puppeteer
  const browser = await puppeteer.launch();

  // Create a new page in the browser
  const page = await browser.newPage();

  const urlObject = new URL(url);

  // Define a path where the screenshot will be saved
  const path = `public/screenshots/${urlObject.hostname}.png`;

  // Navigate to the url
  await page.goto(url);

  // Take a screenshot of the page
  await page.screenshot({
    path,
    fullPage,
  });

  // Close the browser once done
  await browser.close();

  // Upload the screenshot to cloudinary
  //   const uploadResponse = await handleCloudinaryUpload({
  //     path,
  //     folder: true,
  //   });
  console.log("fired");

  // Delete the screenshot from the server

  return path;
};
