import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "prismjs/themes/prism-tomorrow.css";
import "@/styles/prism.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OTP Authentication",
  description: "Modern OTP-based authentication system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Toaster richColors position="top-center" />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
