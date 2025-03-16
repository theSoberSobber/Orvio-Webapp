"use client"

export interface TimelineStep {
  title: string
  description: string
  icon?: React.ReactNode
}

interface TimelineSectionProps {
  title?: string
  subtitle?: string
  steps: TimelineStep[]
}

export function TimelineSection({
  title = "How it works",
  subtitle = "Get started in minutes",
  steps
}: TimelineSectionProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">{title}</h2>
          <p className="text-slate-400 text-center mb-12">{subtitle}</p>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-700" />

            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="relative flex items-center">
                  {/* Circle */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-slate-800 rounded-full border-2 border-blue-500 flex items-center justify-center">
                    {step.icon || (
                      <span className="text-blue-500 font-semibold">{index + 1}</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16 ml-auto'}`}>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 