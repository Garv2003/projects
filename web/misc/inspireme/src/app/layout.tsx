import "~/styles/globals.css";
import { Navbar, Footer } from "~/components";
import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "InspireMe",
  description: "InspireMe is a simple app to inspire you.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <Navbar />
          <main> {children}</main>
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
