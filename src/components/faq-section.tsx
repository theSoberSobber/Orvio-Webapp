"use client"

export interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  subtitle?: string
  faqs: FAQ[]
}

export function FAQSection({ 
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about Orvio",
  faqs 
}: FAQSectionProps) {
  return (
    <section id="faq" className="py-20 scroll-mt-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">{title}</h2>
          <p className="text-slate-400 text-center mb-12">{subtitle}</p>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 rounded-lg overflow-hidden hover:bg-slate-800/70 transition-all duration-200"
              >
                <details className="group/details [&_svg]:open:-rotate-180">
                  <summary 
                    className="flex items-center justify-between gap-4 p-6 cursor-pointer select-none marker:content-none hover:text-blue-400 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-200">{faq.question}</h3>
                    <svg
                      className="w-5 h-5 text-slate-400 transition-transform duration-300 ease-out group-hover:text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="overflow-hidden transition-all duration-300">
                    <div className="px-6 pb-6 text-slate-300 transform">
                      <p className="opacity-90 group-hover:opacity-100 transition-opacity duration-200">{faq.answer}</p>
                    </div>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 