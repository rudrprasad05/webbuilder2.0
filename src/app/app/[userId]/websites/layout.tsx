import { GetCurrentUser } from "@/actions/user";
import SideNav from "@/components/nav/SideBar";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SideNavServerCont from "../../../../components/nav/SideNavServerCont";
import { Suspense } from "react";
import Loading from "@/components/global/loading";

export const metadata: Metadata = {
  title: "Websites",
  description: "Powered by Proyon",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await GetCurrentUser();
  if (!user) return redirect(`/auth`);
  return (
    <main className="w-full h-full flex">
      <SideNavServerCont />
      <div className="p-6 grow">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </main>
  );
}
