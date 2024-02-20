"use server";
import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { NewWebsiteType } from "@/app/app/[userId]/websites/_components/NewWebsite";
import { NewWebpageType } from "@/app/app/[userId]/websites/[websiteId]/_components/NewWebpage";
import { revalidatePath } from "next/cache";

export const GetUserWebsites = async (id: string) => {
  const websites = await prisma.website.findMany({
    where: {
      userId: id,
    },
  });

  if (!websites) {
    return null;
  }

  return websites;
};

export const CreateWebsite = async (data: NewWebsiteType) => {
  const { name, subdomain, userId, description, favicon } = data;
  const website = await prisma.website.create({
    data: {
      name: name,
      subDomainName: subdomain,
      userId: userId as string,
      description,
      favicon,
    },
  });
  return website;
};

export const GetWebsiteWithPages = async (id: string) => {
  const website = await prisma.website.findUnique({
    where: {
      id,
    },
    include: {
      webpages: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return website;
};

export const CreateWebpage = async (data: NewWebpageType) => {
  const { name, pathName, previewImage, websiteId } = data;
  const res = await prisma.webpages.create({
    data: {
      name,
      pathName,
      previewImage: previewImage as string,
      websiteId: websiteId as string,
      order: 0,
    },
  });
};

export const GetWebpageDetails = async (id: string) => {
  const res = await prisma.webpages.findUnique({
    where: {
      id,
    },
  });
  return res;
};

export const UpsertWebPage = async (
  userId: string,
  funnelPage: any,
  websiteId: string
) => {
  if (!userId || !websiteId) return;
  const {
    id,
    name,
    pathName,
    updatedAt,
    visits,
    content,
    order,
    previewImage,
  } = funnelPage;
  const response = await prisma.webpages.update({
    where: { id: funnelPage.id || "" },

    data: {
      name,
      pathName,
      updatedAt,
      visits,
      order,
      previewImage,
      content: funnelPage.content,
      websiteId,
    },
  });

  revalidatePath(`/subaccount/${userId}/funnels/${websiteId}`, "page");
  return response;
};
