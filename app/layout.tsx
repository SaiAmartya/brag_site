import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sai Amartya | Systems Builder",
  description: "Engineering the Agentic Future. Systems builder focused on foundational AI infrastructure and operational excellence.",
  keywords: ["AI", "Systems Builder", "TidalTasks", "Canary OS", "Technical Founder", "Software Engineering"],
  authors: [{ name: "Sai Amartya Balamurugan Lakshmipraba" }],
  openGraph: {
    title: "Sai Amartya | Systems Builder",
    description: "Engineering the Agentic Future",
    type: "website",
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
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
