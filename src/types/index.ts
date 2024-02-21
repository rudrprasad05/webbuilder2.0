import { getMedia } from "@/actions/media";
import { Prisma, User, Webpages, Website } from "@prisma/client";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export type UserType = User;

export type WebsiteOnlyType = Website;

export type WebsiteWithPagesType = Website & {
  webpages: Webpages[];
};

export type WebpageOnly = Webpages;

export type GetMediaFiles = Prisma.PromiseReturnType<typeof getMedia>;

// export type UpsertWepPage = Prisma.FunnelPageCreateWithoutFunnelInput
