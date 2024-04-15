import React from 'react';
import ThemeRegistry from "@/theme/ThemeRegistry";
import "./globals.css";
import StoreProvider from "@/StoreProvider";
import Layout from "@/components/header/Layout";
export const metadata = {
  title: "KTEA-INSPECTION",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>

      <body>
        <ThemeRegistry>
          <StoreProvider>
            <Layout>{children}</Layout>
          </StoreProvider>
        </ThemeRegistry>
      </body>


    </html>
  );
}