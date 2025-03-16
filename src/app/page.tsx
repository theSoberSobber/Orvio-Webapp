"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { FeaturesSection } from "@/components/features-section"
import { TimelineSection } from "@/components/timeline-section"
import { FAQSection } from "@/components/faq-section"
import { BusinessBanner } from "@/components/business-banner"
import { PhoneMockup } from "@/components/phone-mockup"

const features = [
  {
    title: "Passive Income",
    description: "Earn money while you sleep. Your phone works for you 24/7.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Easy Setup",
    description: "Install, sign up, and start earning in less than 5 minutes.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: "Secure & Private",
    description: "Your data is protected. We never access your personal messages.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Instant Payouts",
    description: "Get paid directly to your UPI account once you reach ₹100.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 17h2m4 0h12M6 17V7m4 10V7m4 10V7m4 10V7" />
      </svg>
    ),
  },
]

const timeline = [
  {
    title: "Download the App",
    description: "Get started by downloading our app. Quick and easy installation process."
  },
  {
    title: "Create Your Account",
    description: "Sign up and verify your account in just a few minutes!"
  },
  {
    title: "Start Earning 💰",
    description: "Let Orvio do all the work for you!"
  }
]

const faqs = [
  {
    question: "How much can I earn? 💰",
    answer: "Earnings vary based on demand. The more your device is active and connected to the internet, the more you can earn!"
  },
  {
    question: "Is it safe to use? 🔒",
    answer: "Absolutely! We prioritize security and privacy. Our app runs in the background without accessing any personal data. If you have any concerns, please feel free to contact us."
  },
  {
    question: "How do I get paid? 💳",
    answer: "We offer only UPI as of now for payments, but we are working on adding more options soon."
  },
  {
    question: "Will it affect my phone's performance? 📱",
    answer: "Our app is designed to be lightweight and efficient. It runs smoothly in the background with minimal impact on your device's performance or battery life."
  },
  {
    question: "Which devices are supported? 🤖",
    answer: "Currently, we support Android devices running version 8.0 (Oreo) or newer. iOS support is coming soon!"
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl">
        <BusinessBanner />
        <div>
          <Navbar />
        </div>
      </header>

      {/* Main content with padding to account for fixed header */}
      <main className="pt-[8.5rem] md:pt-[6.5rem]">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Transform Your Android 📱 into a{" "}
                <span className="text-blue-400"> 💰 Making Machine 🤑</span>
              </h1>
              <p className="text-slate-300 text-lg">Join thousands of users who are earning passive income with Orvio. Simple setup, secure platform, instant earnings! 🚀
              </p>
              <div className="flex gap-4">
                <Link href="#how-it-works">
                  <Button 
                    size="lg" 
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href={process.env.NEXT_PUBLIC_DOWNLOAD_LINK || ''} target="_blank" rel="noopener">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Download Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[600px] w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
                <div className="relative h-full flex items-center justify-center">
                  {/* Temporary skeleton mockup */}
                  <PhoneMockup />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeaturesSection 
          title="Features" 
          features={features} 
        />

        {/* How It Works */}
        <TimelineSection 
          title="How It Works" 
          subtitle="Get started in minutes" 
          steps={timeline} 
        />

        {/* FAQ Section */}
        <FAQSection 
          title="Frequently Asked Questions" 
          subtitle="Everything you need to know about Orvio" 
          faqs={faqs} 
        />

        {/* Download App */}
        <section className="py-20 bg-slate-900/50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Earning? 🚀</h2>
              <p className="text-slate-400 text-xl mb-8">Join our growing community of earners and start making passive income today!</p>
              <Link href={process.env.NEXT_PUBLIC_DOWNLOAD_LINK || ''} target="_blank" rel="noopener">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                  Download Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400">© 2025 Orvio. All rights reserved.</p>
              <div className="flex gap-4">
                <Link href="/privacy" className="text-slate-400 hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-slate-400 hover:text-white">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
