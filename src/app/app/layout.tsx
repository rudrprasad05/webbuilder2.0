import { GetCurrentUser } from "@/actions/user";
import Unauthorized from "@/components/global/Unauthorized";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Powered by Proyon",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await GetCurrentUser();
  if (!user?.emailVerified) return <Unauthorized />;
  return <main className="w-full h-full">{children}</main>;
}
