import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sogea = localFont({
  src: "../Assets/Sogea/WOFF/Sogea.woff2",
  variable: "--font-sogea",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aquarela.design"),
  title: "Aquarela Design — Web Design, Motion & Development",
  description:
    "Aquarela Design creates high-end websites and landing pages for growing businesses through creative direction, motion and modern web development.",
  openGraph: {
    title: "Aquarela Design — Digital Design Studio",
    description: "Websites designed to move, engage and be remembered.",
    type: "website",
  },
  icons: {
    icon: "/brand/logo-black.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sogea.variable}>
      <body>{children}</body>
    </html>
  );
}
