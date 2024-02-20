"use client";

import { useRouter } from "next/navigation";
import Loading from "./loading";

const Redirect = ({ where }: { where: string }) => {
  const router = useRouter();
  router.push(where);
  return <Loading />;
};

export default Redirect;
