import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  metadataBase: new URL("https://speedmvps.com"),
  title: "Welux — Software House",
  description:
    "Welux é uma software house que constrói produtos digitais premium e MVPs de alta conversão.",
  icons: {
    icon: [
      { url: "/seo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/seo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/seo/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/seo/apple-touch-icon.png",
  },
  manifest: "/seo/site.webmanifest",
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
        {children}
      </body>
    </html>
  );
}
