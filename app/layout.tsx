import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { TornFilters } from "@/components/ui/TornFilters";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { HiringToast } from "@/components/chrome/HiringToast";  
import { SiteFooter } from "@/components/chrome/SiteFooter";

// Grand Canyon — display face for big all-caps headers only  
const display = localFont({
  variable: "--font-grand",
  src: "../public/fonts/Grand-Canyon-Free.otf",
  display: "swap",
});

const body = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cavern Studios — Small team. Big worlds.",
    template: "%s · Cavern Studios",
  },
  description:
    "Cavern Studios is a small game studio making atmospheric worlds with rough edges and a lot of heart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="bg-canvas text-paper font-body min-h-full">
        <TornFilters />
        <GrainOverlay />
        <SiteHeader />
        <HiringToast />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
