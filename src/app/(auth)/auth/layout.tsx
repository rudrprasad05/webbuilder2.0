import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
  description: "Sign in or create account",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="w-full h-full">{children}</main>;
}
