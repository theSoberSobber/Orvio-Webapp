import { Metadata } from "next"
import { siteConfig } from "../metadata"

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} for Business - Affordable SMS Solutions`,
    template: `%s | ${siteConfig.name} Business`,
  },
  description: "Cost-effective SMS solutions for your business. Access our network of Android devices to send SMS at the most competitive rates in the market.",
  keywords: [
    "business sms service",
    "affordable sms",
    "bulk sms solution",
    "business messaging",
    "sms api",
    "cheap sms service",
    "enterprise sms",
    "business integration",
    "sms platform",
    "mass texting service"
  ],
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/business`,
    title: `${siteConfig.name} Business - Affordable SMS Solutions`,
    description: "Reduce your SMS costs with our innovative platform. Send messages through our network of Android devices at the most competitive rates.",
    siteName: `${siteConfig.name} Business`,
    images: [
      {
        url: `${siteConfig.url}/og-business.png`,
        width: 1200,
        height: 630,
        alt: "Orvio Business - Affordable SMS Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} Business - Cost-Effective SMS`,
    description: "Send SMS at the lowest rates in the market. Perfect for businesses looking to reduce messaging costs.",
    images: [`${siteConfig.url}/og-business.png`],
    creator: "@OrvioApp",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
} 