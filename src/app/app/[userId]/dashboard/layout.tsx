import { GetCurrentUser } from "@/actions/user";
import SideNav from "@/components/nav/SideBar";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SideNavServerCont from "../../../../components/nav/SideNavServerCont";

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
  if (!user) return redirect(`/`);
  return (
    <main className="w-full h-full">
      <SideNavServerCont />
      {children}
    </main>
  );
}
