import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Sai Amartya · Building the Agentic Future",
  description:
    "IB student and technical founder from Kitchener, Ontario. Co-founder of TidalTasks AI and Canary OS, building AI systems people actually use.",
  keywords: [
    "Sai Amartya",
    "AI",
    "Technical Founder",
    "TidalTasks",
    "Canary OS",
    "Agentic AI",
    "Software Engineering",
  ],
  authors: [{ name: "Sai Amartya Balamurugan Lakshmipraba" }],
  openGraph: {
    title: "Sai Amartya · Building the Agentic Future",
    description:
      "IB student and technical founder building AI systems people actually use.",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
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
        className={`${fraunces.variable} ${hanken.variable} ${dmMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
