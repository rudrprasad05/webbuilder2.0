import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "@/context/AuthContext";
import { Toaster } from "sonner";
import { GetCurrentUser } from "@/actions/user";
import Unauthorized from "@/components/global/Unauthorized";
import { ThemeProvider } from "@/theme/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster toastOptions={{ closeButton: true }} />
          <AuthContext>{children}</AuthContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
