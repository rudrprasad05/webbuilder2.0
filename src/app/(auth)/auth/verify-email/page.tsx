import { VerifyEmail } from "@/actions/user";
import Redirect from "@/components/global/Redirect";
import { Card, CardTitle } from "@/components/ui/card";
import { PageProps } from "@/types";
import React from "react";

const page = async (props: PageProps) => {
  const token = props.searchParams?.token;

  if (!token)
    return (
      <main className="w-full h-full flex items-center justify-center">
        <Card>
          <CardTitle>No verification token detected</CardTitle>
        </Card>
      </main>
    );

  const updateUser = await VerifyEmail(token).then(() => (
    <Redirect where="/" />
  ));
  return (
    <main className="w-full h-full flex items-center justify-center">
      <Card>
        <CardTitle>Email Verified</CardTitle>
      </Card>
    </main>
  );
};

export default page;
