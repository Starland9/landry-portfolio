import "./globals.css";
import CustomCursor from "@/components/ui/custom-cursor";
import { SkipLink } from "@/components/ui/skip-link";
import { metadata as metada } from "@/lib/metadata";

export const metadata = metada;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-black text-white overflow-x-hidden custom-cursor">
        <SkipLink />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
