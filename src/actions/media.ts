"use server";
import { RegisterFormType } from "@/app/(auth)/auth/register/_components/RegisterForm";
import { VerifyEmailTemplate } from "@/components/email/VerifyEmailTemplate";
import prisma from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "./email";
import getSession from "./getSession";

export const getMedia = async (subaccountId: string) => {
  const mediafiles = await prisma.user.findUnique({
    where: {
      id: subaccountId,
    },
    include: {
      media: true,
    },
  });
  return mediafiles;
};

export const createMedia = async (subaccountId: string, mediaFile: any) => {
  const response = await prisma.media.create({
    data: {
      link: mediaFile.link,
      name: mediaFile.name,
      userId: subaccountId,
    },
  });

  return response;
};

export const deleteMedia = async (mediaId: string) => {
  const response = await prisma.media.delete({
    where: {
      id: mediaId,
    },
  });
  return response;
};
