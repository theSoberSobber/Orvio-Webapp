import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "prismjs/themes/prism-tomorrow.css";
import "@/styles/prism.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/auth-context";
import { siteConfig } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orvio - Monetize Your SMS Plan",
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <AuthProvider>
            <Toaster richColors position="top-center" theme="dark" />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
