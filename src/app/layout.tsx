import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AbTracker from "@/components/AbTracker";
import LeadModal from "@/components/LeadModal";

const generalSans = localFont({
  src: [
    { path: "../fonts/GeneralSans-Regular.woff", weight: "400", style: "normal" },
    { path: "../fonts/GeneralSans-Medium.woff", weight: "500", style: "normal" },
    { path: "../fonts/GeneralSans-Semibold.woff", weight: "600", style: "normal" },
    { path: "../fonts/GeneralSans-Bold.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://welux-beta.vercel.app"),
  title: "Welux — Software House",
  description:
    "Welux é uma software house que constrói produtos digitais premium e MVPs de alta conversão.",
  // Favicon is provided by src/app/icon.svg (Welux WL monogram).
  openGraph: {
    title: "Welux — Software House",
    description:
      "Produtos digitais premium e MVPs de alta conversão, entregues em 2-3 semanas.",
    images: ["/seo/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={generalSans.variable}>
      <body className="font-sans antialiased bg-white text-[#0a0a0a]">
        <AbTracker />
        <LeadModal />
        {children}
      </body>
    </html>
  );
}
