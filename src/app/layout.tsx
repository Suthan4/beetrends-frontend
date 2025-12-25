import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beetrends.in"),

  title: {
    default: "BeeTrends | Premium Custom Apparel Manufacturer",
    template: "%s | BeeTrends",
  },

  description:
    "BeeTrends is a leading manufacturer of custom T-shirts, branded apparel, and promotional wear engineered for quality, durability, and style.",

  keywords: [
    "custom t-shirts india",
    "branded apparel manufacturer",
    "promotional wear",
    "corporate uniforms",
    "custom clothing india",
    "BeeTrends",
  ],

  authors: [{ name: "BeeTrends" }],

  openGraph: {
    title: "BeeTrends | Premium Custom Apparel Manufacturer",
    description:
      "Dependable. Stylish. Premium. Custom T-shirts and branded apparel crafted with precision.",
    url: "https://beetrends.in",
    siteName: "BeeTrends",
    type: "website",
    locale: "en_IN",
  },

  alternates: {
    canonical: "https://beetrends.in",
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
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased bg-neutral-950 text-neutral-100">
        {children}
      </body>
    </html>
  );
}
