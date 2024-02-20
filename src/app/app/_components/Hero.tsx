"use client";

import { FindUserByEmail } from "@/actions/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Redirect = () => {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push(`/auth`);
    const handle = async () => {
      const userId = await FindUserByEmail(user?.email as string).then((res) =>
        router.push(`/app/${res?.id}/dashboard`)
      );
    };
    handle();
  }, [user, router]);

  return <div></div>;
};

export default Redirect;
