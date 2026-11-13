
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://creativeartproduction.in"),

  title: {
    default: "Creative Art Production | Photography & Videography",
    template: "%s | Creative Art Production",
  },

  description:
    "Creative Art Production offers professional photography, videography, wedding shoots, event coverage, pre-wedding photography, and creative production services.",

  keywords: [
    "Creative Art Production",
    "Photo Studio",
    "Photography Studio",
    "Professional Photography",
    "Wedding Photography",
    "Wedding Photographer",
    "Pre Wedding Photography",
    "Event Photography",
    "Event Videography",
    "Cinematic Wedding Films",
    "Commercial Photography",
    "Product Photography",
    "Fashion Photography",
    "Corporate Photography",
    "Birthday Photography",
    "Video Production",
    "Photography and Videography Services",
  ],

  authors: [{ name: "Creative Art Production" }],
  creator: "Creative Art Production",
  publisher: "Creative Art Production",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://creativeartproduction.in",
    siteName: "Creative Art Production",
    title: "Creative Art Production | Photography & Videography",
    description:
      "Professional photography, wedding shoots, event coverage, and cinematic videography.",
    images: ["/og-image.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Creative Art Production",
    description:
      "Professional photography, videography, wedding shoots, and event production.",
    images: ["/og-image.jpg"],
  },

  // Favicon is automatically detected from app/icon.png
  // Apple icon is automatically detected from app/apple-icon.png

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
