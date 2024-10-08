import type { Metadata } from "next";
import "./globals.css";
import ApolloClientProvider from "./ApolloClientProvider";
import { CookiesProvider } from 'next-client-cookies/server';
import UserDataProvider from "../contexts/UserDataProvider";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/shadcn-ui/tooltip";
import PostFullCardDialogProvider from "@/contexts/PostFullCardDialogProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <CookiesProvider>
        <ApolloClientProvider>
          <UserDataProvider>
            <TooltipProvider>
              <body className="min-h-screen flex flex-col bg-background antialiased">
                <PostFullCardDialogProvider>
                  {children}
                  <SonnerToaster theme="dark" />
                </PostFullCardDialogProvider>
              </body>
            </TooltipProvider>
          </UserDataProvider>
        </ApolloClientProvider>
      </CookiesProvider>
    </html>
  );
}
