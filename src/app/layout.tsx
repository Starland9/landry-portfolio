import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/custom-cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Starland9 - Développeur Full-Stack",
  description:
    "Portfolio de Starland9, développeur Full-Stack passionné par les technologies modernes et les interfaces utilisateur révolutionnaires.",
  keywords: [
    "développeur",
    "full-stack",
    "react",
    "nextjs",
    "typescript",
    "nodejs",
    "portfolio",
  ],
  authors: [{ name: "Starland9" }],
  creator: "Starland9",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://starland9.dev",
    title: "Starland9 - Développeur Full-Stack",
    description:
      "Portfolio de Starland9, développeur Full-Stack passionné par les technologies modernes.",
    siteName: "Starland9 Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Starland9 - Développeur Full-Stack",
    description:
      "Portfolio de Starland9, développeur Full-Stack passionné par les technologies modernes.",
    creator: "@starland9",
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
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-black text-white overflow-x-hidden custom-cursor`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
