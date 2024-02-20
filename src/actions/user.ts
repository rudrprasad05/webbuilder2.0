"use server";
import { RegisterFormType } from "@/app/(auth)/auth/register/_components/RegisterForm";
import { VerifyEmailTemplate } from "@/components/email/VerifyEmailTemplate";
import prisma from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendEmail } from "./email";
import getSession from "./getSession";

export const ResetPassword = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) return new Error("No user found");

  const resetpassword = crypto.randomBytes(32).toString("base64url");
  const today = new Date();
  const expiryDate = new Date(today.setDate(today.getDate() + 1));

  const updatedUser = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      // resetPasswordToken: resetpassword,
      // resetPasswordTokenExpiry: expiryDate,
    },
  });

  await sendEmail({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Password Reset",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });

  return "Password updated";
};

// export const ChangePassword = async (
//   resetPasswordToken: string,
//   password: string
// ) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       // resetPasswordToken,
//     },
//   });

//   if (!user) {
//     throw new Error("User not found");
//   }

//   const resetPasswordTokenExpiry = user.resetPasswordTokenExpiry;
//   if (!resetPasswordTokenExpiry) {
//     throw new Error("Token expired");
//   }

//   const today = new Date();

//   if (today > resetPasswordTokenExpiry) {
//     throw new Error("Token expired");
//   }

//   const passwordHash = bcrypt.hashSync(password, 10);

//   await prisma.user.update({
//     where: {
//       id: user.id,
//     },
//     data: {
//       hashedPassword: passwordHash,
//       resetPasswordToken: null,
//       resetPasswordTokenExpiry: null,
//     },
//   });

//   return "Password changed successfully";
// };

export const SignUp = async (data: RegisterFormType) => {
  const { name, email, password } = data;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    throw new Error("User already exists");
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const createdUser = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword: passwordHash,
    },
  });

  const emailVerificationToken = crypto.randomBytes(32).toString("base64url");

  await prisma.user.update({
    where: {
      id: createdUser.id,
    },
    data: {
      emailVerificationToken: emailVerificationToken,
    },
  });

  await sendEmail({
    from: "Admin <onboarding@resend.dev>",
    to: [email],
    subject: "Verify your email address",
    react: VerifyEmailTemplate({
      email,
      emailVerificationToken,
    }) as React.ReactElement,
  });

  return createdUser;
};

export const VerifyEmail = async (token: string) => {
  const temp = new Date();
  const today = new Date(temp.setDate(temp.getDate()));
  const user = await prisma.user.update({
    where: {
      emailVerificationToken: token,
    },
    data: {
      emailVerified: today,
    },
  });
  console.log(user);
  return user;
};

export const FindUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) return user;
  return null;
};

export const GetCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
};
