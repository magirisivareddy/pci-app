import ThemeRegistry from "@/theme/ThemeRegistry";
import "./globals.css";
import { Inter } from "next/font/google";
import MenuAppBar from "@/components/header/Header";
import FullWidthTabs from "@/components/tabs/Tabs";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body className={inter.className}>
          <div className="app">
            <MenuAppBar />
            <main className="content">
            <FullWidthTabs/>
              {children}
            </main>
          </div>
        </body>
      </ThemeRegistry>
    </html>
  );
}