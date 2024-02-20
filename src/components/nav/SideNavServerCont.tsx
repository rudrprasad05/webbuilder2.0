import { GetCurrentUser } from "@/actions/user";
import SideNav from "@/components/nav/SideBar";
import React from "react";

const SideNavServerCont = async () => {
  const user = (await GetCurrentUser()) || null;
  // if (user?.seller == null) return <RedirectToSellerAuth />;

  return <SideNav user={user} />;
};

export default SideNavServerCont;
