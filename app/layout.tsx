import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Handyman Club — Your Handyman, On Speed Dial.",
  description:
    "One dedicated handyman who knows your home. $29 first visit, then $99/mo for monthly service — 24-hour scheduling, no call-out fees. Raleigh-Durham.",
  metadataBase: new URL("https://homefix.team"),
  openGraph: {
    title: "Handyman Club — Your Handyman, On Speed Dial.",
    description:
      "One dedicated handyman who knows your home. $29 first visit, then $99/mo — 24-hour scheduling, no call-out fees.",
    url: "https://homefix.team",
    siteName: "Handyman Club",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Handyman Club — Your Handyman, On Speed Dial.",
    description:
      "One dedicated handyman who knows your home. $29 first visit, then $99/mo — 24-hour scheduling, no call-out fees.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
