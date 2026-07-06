import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atharv Singh Jadon — Software Engineer",
  description:
    "Portfolio of Atharv Singh Jadon, a Software Engineer and AI & ML undergraduate building modern web applications and intelligent systems.",
  keywords: [
    "software engineer",
    "AI",
    "machine learning",
    "web development",
    "portfolio",
    "Atharv Singh Jadon",
  ],
  authors: [{ name: "Atharv Singh Jadon" }],
  openGraph: {
    title: "Atharv Singh Jadon — Software Engineer",
    description:
      "Building modern web applications and intelligent systems. Explore projects, skills, and experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
