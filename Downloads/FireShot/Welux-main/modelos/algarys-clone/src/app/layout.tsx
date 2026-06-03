import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const interDisplay = localFont({
  variable: "--font-inter-display",
  display: "swap",
  src: [
    { path: "../../public/shared/fonts/InterDisplay-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/shared/fonts/InterDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/shared/fonts/InterDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/shared/fonts/InterDisplay-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/shared/fonts/InterDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Welux | IA aplicada com retorno calculado",
  description:
    "A gente entra na sua operação, mostra onde a IA gera retorno, constrói o que fizer sentido e entrega com sua equipe usando. 4 fases. Tudo com retorno calculado antes da primeira entrega.",
  metadataBase: new URL("https://welux.com.br"),
  icons: {
    icon: [{ url: "/shared/brand/welux-logo.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${interDisplay.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
