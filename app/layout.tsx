import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { getSiteSettings } from "@/lib/data/site";
import "./globals.css";

// Grand Canyon — display face for big all-caps headers only
const display = localFont({
  variable: "--font-grand",
  // Grand Canyon
  // src: "../public/fonts/Grand-Canyon-Free.otf",
  // Gorilla
  // src: "../public/fonts/Gorilla.ttf",
  // BenjaminFranklin
  // src: "../public/fonts/BenjaminFranklin.ttf",
  // Renju
  src: "../public/fonts/Renju.otf",
  display: "swap",
});

const body = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: `${settings.name} — ${settings.tagline}`,
      template: `%s · ${settings.name}`,
    },
    description: settings.blurb,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/admin/sign-in">
      <html
        lang="en"
        className={`${display.variable} ${body.variable} h-full antialiased`}
      >
        <body className="bg-canvas text-paper font-body min-h-full">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
