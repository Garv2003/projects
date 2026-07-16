import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header, Hero, ThemeLayout } from "@/components";
import { ThemeProvider } from "@/context/ThemeContext";
import { IdeasProvider } from "@/context/IdeasContext";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "20 Ideas",
  description: "A simple app to store your ideas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <IdeasProvider>
            <ThemeLayout>
              <div className="w-full">
                <Header />
                <Hero />
                {children}
              </div>
            </ThemeLayout>
          </IdeasProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
