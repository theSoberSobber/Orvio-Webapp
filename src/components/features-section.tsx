"use client"

import { Card, CardContent } from "@/components/ui/card"

export interface Feature {
  title: string
  description: string
  icon: React.ReactNode
}

interface FeaturesSectionProps {
  title?: string
  features: Feature[]
}

export function FeaturesSection({ title = "Features", features }: FeaturesSectionProps) {
  return (
    <section id="features" className="py-20 bg-slate-900/50 scroll-mt-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="rounded-full bg-blue-500/10 w-12 h-12 flex items-center justify-center mb-4">
                  <div className="text-blue-400">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 