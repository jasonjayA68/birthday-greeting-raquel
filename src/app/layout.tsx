import type { Metadata, Viewport } from "next";
import { Dancing_Script, Great_Vibes, Poppins } from "next/font/google";
import "./globals.css";

// Great Vibes for titles, Dancing Script for the handwritten card, Poppins for body text
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// Set NEXT_PUBLIC_SITE_URL in Vercel (e.g. https://happy-birthday-raquel.vercel.app)
// so the Open Graph image gets a full URL for Messenger/Facebook previews.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const title = "Happy 26th Birthday, Raquel! 🎉";
const description = "A little birthday surprise for Raquel, with love from Ate Mae 💕";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    type: "website",
    url: "/",
    title,
    description,
    images: [{ url: "/images/raquel-1.jpg", width: 828, height: 828, alt: "Raquel smiling" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/raquel-1.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f8d7da",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${greatVibes.variable} ${dancingScript.variable} ${poppins.variable}`}>
      {/* Scrolling stays locked until the gift box is opened (see GiftIntro) */}
      <body className="is-locked">{children}</body>
    </html>
  );
}
