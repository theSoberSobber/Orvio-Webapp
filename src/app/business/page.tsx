"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeBlock } from "@/components/code-block"
import { FeaturesSection } from "@/components/features-section"
import { TimelineSection } from "@/components/timeline-section"
import { FAQSection } from "@/components/faq-section"

const features = [
  {
    title: "Massive Coverage",
    description: "Access our network of trusted devices across whole India for reliable SMS delivery.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Cost Effective",
    description: "Save up to 70% on SMS costs compared to traditional gateway providers.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "1-Minute SLA",
    description: "Get updates on your sent messages on webhooks within 1 minute.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Webhook Events",
    description: "Get instant notifications for message delivery, failures, and status updates via webhooks.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
]

const timeline = [
  {
    step: 1,
    title: "API Request",
    description: "Send a request to our API with your API key and the recipient's phone number. Optionally configure webhook URL and secret for status updates."
  },
  {
    step: 2,
    title: "OTP Generation & Device Selection",
    description: "We securely generate the OTP and select an appropriate device from our network based on your plan - either from our pool of trusted devices or optimized routing."
  },
  {
    step: 3,
    title: "Message Delivery",
    description: "The selected device delivers the OTP message. Within our 1-minute SLA, you receive delivery status via webhook (if configured) with secure signature verification."
  },
  {
    step: 4,
    title: "Verification",
    description: "When your user enters the OTP, simply call our verify endpoint. We'll confirm if it's valid, all while maintaining our cost-effective pricing."
  }
]

const faqs = [
  {
    question: "What is your delivery success rate? 📊",
    answer: "We maintain a 99%+ delivery success rate across India. Our network of trusted devices ensures reliable message delivery with real-time status updates via webhooks."
  },
  {
    question: "How do you handle security? 🔒",
    answer: "We prioritize security with webhook signature verifications. All data is transmitted securely, and we're compliant with industry security standards."
  },
  {
    question: "Can I monitor message delivery status? 📱",
    answer: "Yes! We provide real-time delivery status updates through webhooks. You'll receive instant notifications for message delivery, failures, and status changes."
  },
  {
    question: "Do you have a backup system? 🔄",
    answer: "Yes, our system automatically retries failed messages and routes them through alternative paths when needed to ensure maximum delivery success."
  }
]

const navigationItems = [
  { title: "Features", href: "#features" },
  { title: "How It Works", href: "#how-it-works" },
  { title: "FAQ", href: "#faq" },
  { title: "Documentation", href: "/docs" },
]

const actionButton = {
  title: "Sign In",
  href: "/signin",
  variant: "outline" as "outline" | "default"
}

const basePrices = {
  starter: {
    USD: 49,
    INR: 0.4,
    EUR: 45,
    GBP: 39,
  },
  business: {
    USD: 199,
    INR: 0.3,
    EUR: 185,
    GBP: 159,
  }
}

const currencySymbols = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£'
}

const pricingPlans = [
  {
    title: "Starter",
    priceKey: "starter",
    period: "per sms",
    features: [
      "Basic API access (REST)",
      "Email support",
      "Basic analytics",
      "Single gateway routing",
      "Webhook integrations",
      "1 minute SLA response time",
      "Best effort response time",
    ],
  },
  {
    title: "Business",
    priceKey: "business",
    period: "per sms",
    features: [
      "Access to trusted devices",
      "Advanced API access (REST & SOAP)",
      "Priority support",
      "Advanced analytics",
      "Multiple gateway routing",
      "Webhook integrations",
      "1 minute SLA response time",
    ],
    highlight: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    features: [
      "Full API access (REST, SOAP, gRPC)",
      "24/7 dedicated support",
      "Custom analytics",
      "Priority routing",
      "Custom SLA guarantees",
      "Custom integrations",
    ],
  },
]

export default function BusinessPage() {
  const [currency, setCurrency] = React.useState<keyof typeof currencySymbols>("INR")

  React.useEffect(() => {
    // Get user's locale and set appropriate currency
    const userLocale = navigator.language
    if (userLocale.includes('IN')) setCurrency('INR')
    else if (userLocale.includes('GB')) setCurrency('GBP')
    else if (userLocale.includes('EU') || userLocale.includes('DE') || userLocale.includes('FR')) setCurrency('EUR')
  }, [])

  const formatPrice = (priceKey: string) => {
    if (!priceKey || priceKey === "Custom") return "Custom"
    const price = basePrices[priceKey as keyof typeof basePrices][currency]
    return `${currencySymbols[currency]}${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <Navbar items={navigationItems} actionButton={actionButton} />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
        <div className="relative max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Transform Your Business with{" "}
            <span className="text-blue-400">Orvio SMS Gateway Solutions</span>
          </h1>
          <p className="text-slate-300 text-xl">
            Reliable, scalable, and cost-effective SMS infrastructure for your business. Join hundreds of businesses who trust Orvio for their SMS needs.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="#how-it-works">
              <Button 
                size="lg" 
                className="bg-blue-500 hover:bg-blue-600"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/signin">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
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
        subtitle="Simple Integration Process" 
        steps={timeline} 
      />

      {/* FAQ Section */}
      <FAQSection 
        title="Frequently Asked Questions" 
        subtitle="Common questions about our business solutions" 
        faqs={faqs} 
      />

      {/* Code Snippet */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Simple Integration</h2>
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="install" className="w-full">
              <TabsList className="flex flex-col md:grid md:grid-cols-5 w-full mb-8 gap-2 md:gap-0">
                <TabsTrigger value="install" className="w-full">Installation</TabsTrigger>
                <TabsTrigger value="auth" className="w-full">Authentication</TabsTrigger>
                <TabsTrigger value="send" className="w-full">Send OTP</TabsTrigger>
                <TabsTrigger value="verify" className="w-full">Verify OTP</TabsTrigger>
                <TabsTrigger value="webhook" className="w-full">Webhooks</TabsTrigger>
              </TabsList>

              <TabsContent value="install">
                <div className="space-y-6">
                  <div className="bg-slate-800 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Install the SDK</h3>
                    <CodeBlock 
                      language="bash"
                      code="npm install @orvio/sdk"
                    />
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Initialize the Client</h3>
                    <CodeBlock 
                      language="typescript"
                      code={`import OrvioClient from '@orvio/sdk';

const client = new OrvioClient('your_api_key');`}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="auth">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">SDK</h4>
                    <div className="bg-slate-800 rounded-lg p-4">
                      <CodeBlock 
                        language="typescript"
                        code={`import OrvioClient from '@orvio/sdk';

// The SDK handles authentication automatically
const client = new OrvioClient('your_api_key');`}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">REST API</h4>
                    <div className="bg-slate-800 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-slate-400 mb-2">Request</h5>
                      <CodeBlock 
                        language="bash"
                        code={`curl -X POST https://orvio.1110777.xyz/auth/refresh \\
  -H "Content-Type: application/json" \\
  -d '{"refreshToken": "your_api_key"}'`}
                      />
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 mt-2">
                      <h5 className="text-sm font-medium text-slate-400 mb-2">Response</h5>
                      <CodeBlock 
                        language="json"
                        code={`{
  "accessToken": "eyJhbG...",
  "expiresIn": 3600
}`}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="send">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">SDK</h4>
                    <div className="bg-slate-800 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-slate-400 mb-2">Request</h5>
                      <CodeBlock 
                        language="typescript"
                        code={`const { tid } = await client.create('+1234567890', {
  webhookUrl: 'https://your-server.com/webhook',
  webhookSecret: 'your_webhook_secret'
});`}
                      />
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 mt-2">
                      <h5 className="text-sm font-medium text-slate-400 mb-2">Response</h5>
                      <CodeBlock 
                        language="json"
                        code={`{
  "tid": "transaction_id",
  "message": "OTP sent successfully",
  "success": true
}`}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">REST API</h4>
                    <div className="bg-slate-800 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-slate-400 mb-2">Request</h5>
                      <CodeBlock 
                        language="bash"
                        code={`curl -X POST https://orvio.1110777.xyz/service/sendOtp \\
  -H "Authorization: Bearer your_access_token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phoneNumber": "+1234567890",
    "reportingCustomerWebhook": "https://your-server.com/webhook",
    "reportingCustomerWebhookSecret": "your_webhook_secret"
  }'`}
                      />
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 mt-2">
                      <h5 className="text-sm font-medium text-slate-400 mb-2">Response</h5>
                      <CodeBlock 
                        language="json"
                        code={`{
  "tid": "transaction_id",
  "message": "OTP sent successfully",
  "success": true
}`}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="verify">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">SDK</h4>
                    <div className="bg-slate-800 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-slate-400 mb-2">Request</h5>
                      <CodeBlock 
                        language="typescript"
                        code={`const result = await client.verify(tid, '123456');`}
                      />
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 mt-2">
                      <h5 className="text-sm font-medium text-slate-400 mb-2">Response</h5>
                      <CodeBlock 
                        language="json"
                        code={`{
  "success": true,
  "message": "OTP verified successfully",
  "verified": true
}`}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-4">REST API</h4>
                    <div className="bg-slate-800 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-slate-400 mb-2">Request</h5>
                      <CodeBlock 
                        language="bash"
                        code={`curl -X POST https://orvio.1110777.xyz/service/verifyOtp \\
  -H "Authorization: Bearer your_access_token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tid": "transaction_id",
    "userInputOtp": "123456"
  }'`}
                      />
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 mt-2">
                      <h5 className="text-sm font-medium text-slate-400 mb-2">Response</h5>
                      <CodeBlock 
                        language="json"
                        code={`{
  "success": true,
  "message": "OTP verified successfully",
  "verified": true
}`}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="webhook">
                <div className="space-y-6">
                  <div className="bg-slate-800 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Express Webhook Handler</h3>
                    <CodeBlock 
                      language="typescript"
                      code={`import express from 'express';
import { OrvioClient } from '@orvio/sdk';

app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['x-signature'] as string;
  const payload = req.body.toString();
  
  if (!OrvioClient.verifyWebhookSignature(payload, signature, 'your_webhook_secret')) {
    return res.status(403).send('Invalid signature');
  }

  const event = JSON.parse(payload);
  switch(event.event) {
    case 'OTP_SENT':
      // Handle OTP sent event
      break;
    case 'OTP_VERIFIED':
      // Handle OTP verified event
      break;
    case 'OTP_EXPIRED':
      // Handle OTP expired event
      break;
  }
  
  res.status(200).send('OK');
});`}
                    />
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Example Webhook Event</h3>
                    <CodeBlock 
                      language="json"
                      code={`{
  "event": "OTP_VERIFIED",
  "tid": "transaction_id",
  "phoneNumber": "+1234567890",
  "timestamp": "2024-03-20T12:34:56Z",
  "success": true,
  "message": "OTP verified successfully"
}`}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">Choose the plan that best fits your business needs. All plans include access to our reliable SMS gateway infrastructure.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`${
                  plan.highlight
                    ? "bg-blue-500 border-blue-400"
                    : "bg-slate-800/50 border-slate-700"
                }`}
              >
                <CardContent>
                  <h3 className={plan.highlight ? "text-white" : "text-slate-200"}>
                    {plan.title}
                  </h3>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">
                      {plan.priceKey ? formatPrice(plan.priceKey) : plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm text-slate-400">/{plan.period}</span>
                    )}
                  </div>
                  <ul className="space-y-4 mt-4">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-2 ${
                          plan.highlight ? "text-white/90" : "text-slate-300"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6 ${
                      plan.highlight
                        ? "bg-white text-blue-500 hover:bg-white/90"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {plan.title === "Enterprise" ? "Sign In" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Business? 🚀</h2>
            <p className="text-slate-400 text-xl mb-8">Join our growing network of business partners and scale your SMS operations today!</p>
            <Link href="/signin">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
                Sign In
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
    </div>
  )
} 