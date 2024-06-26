import type { Metadata } from "next";
import { JetBrains_Mono as Font } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const fontSans = Font({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Faux API",
  description: "Generate realistic fake data for your API testing and development needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
