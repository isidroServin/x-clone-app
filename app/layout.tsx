import type { AppProps } from "next/app";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={pageProps.session}>
          <Toaster />
          <LoginModal />
          <RegisterModal />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </body>
    </html>
  );
}
