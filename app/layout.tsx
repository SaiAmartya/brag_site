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

const title = "Sai Amartya · SWE Intern at Aside (YC F25)";
const description =
  "17 year old builder from Kitchener, Ontario. Software Engineer Intern at Aside (YC F25), co-founder of High Agency, and 4th in the nation at FBLA NLC 2026.";

export const metadata: Metadata = {
  metadataBase: new URL("https://saiamartya.vercel.app"),
  title,
  description,
  keywords: [
    "Sai Amartya",
    "Aside",
    "YC F25",
    "High Agency",
    "FBLA NLC 2026",
    "AI agents",
    "Software Engineer",
    "Kitchener Ontario",
    "Cameron Heights",
  ],
  authors: [{ name: "Sai Amartya Balamurugan Lakshmipraba" }],
  creator: "Sai Amartya Balamurugan Lakshmipraba",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Sai Amartya",
    type: "profile",
    locale: "en_CA",
    images: [
      {
        url: "/fbla/fbla-portrait-glass-trophy.jpg",
        width: 1600,
        height: 1067,
        alt: "Sai Amartya holding the FBLA National Leadership Conference glass award.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/fbla/fbla-portrait-glass-trophy.jpg"],
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
      <head>
        {/*
          Without JavaScript, entrance animations never run. Force every
          animated element to its resting state so no copy is ever hidden.
        */}
        <noscript>
          <style>{`
            [style*="opacity:0"], [style*="opacity: 0"] {
              opacity: 1 !important;
              transform: none !important;
            }
            .reveal, .reveal-pop { animation: none !important; }
          `}</style>
        </noscript>
      </head>
      <body
        className={`${fraunces.variable} ${hanken.variable} ${dmMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
