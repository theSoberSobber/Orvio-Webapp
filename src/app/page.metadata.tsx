import { Metadata } from "next"
import { siteConfig } from "./metadata"

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - Turn Your Android Into a Money Making Machine`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} - Passive Income from Your Android Device`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og.png`,
        width: 1200,
        height: 630,
        alt: "Orvio - Passive Income App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Earn While You Sleep`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
    creator: "@OrvioApp",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
} 