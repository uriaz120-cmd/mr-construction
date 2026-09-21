import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/settings";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import { SiteStructuredData } from "@/lib/schema-org";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.meta_title || "MR. Construction | Heavy Civil, Highway & Road Construction Pakistan";
  const description = settings.meta_description || "MR. Construction is a premier Pakistan-based civil engineering and construction contractor specializing in highways, roads, earthworks, and infrastructure.";

  return {
    title: {
      default: title,
      template: `%s | ${settings.company_name || "MR. Construction"}`,
    },
    description: description,
    keywords: settings.meta_keywords?.split(",").map((k) => k.trim()) || [
      "MR Construction",
      "MR Construction Karachi",
      "Road construction Pakistan",
      "Highway construction N25",
      "Civil contractor Karachi",
      "Muhammad Raaziq",
      "Frontier Works Organization contractor",
    ],
    authors: [{ name: settings.owner_name || "Muhammad Raaziq" }],
    creator: "MR. Construction",
    publisher: "MR. Construction",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mrconstruction.pk"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_PK",
      url: "/",
      siteName: settings.company_name || "MR. Construction",
      title: title,
      description: description,
      images: [
        {
          url: settings.hero_image || "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: "MR. Construction Pakistan - Heavy Civil and Road Infrastructure",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [settings.hero_image || "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <SiteStructuredData settings={settings} />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-orange-500 selection:text-white">
        <Header settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <FloatingWhatsApp whatsappNumber={settings.whatsapp} />
      </body>
    </html>
  );
}
