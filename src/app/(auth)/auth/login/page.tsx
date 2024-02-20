import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { LoginForm } from "./_components/LoginForm";

const page = () => {
  return (
    <div className="w-screen h-screen">
      <LoginForm />
    </div>
  );
};

export default page;
