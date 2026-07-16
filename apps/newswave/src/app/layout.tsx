import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";
import { SessionWrapper, ThemeProvider } from "~/layout";
import { Toaster } from "~/components/ui/toaster";

export const metadata: Metadata = {
  title: "NewsWave",
  description: "Super And Fast News",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
        <SessionWrapper>
          <TRPCReactProvider>
            <HydrateClient>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                // disableTransitionOnChange
              >
                <Toaster />
                {children}
              </ThemeProvider>
            </HydrateClient>
          </TRPCReactProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
