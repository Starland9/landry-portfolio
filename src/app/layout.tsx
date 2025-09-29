import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/custom-cursor";
import { metadata as metada } from "@/lib/metadata";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = metada;

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
