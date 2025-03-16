"use client"

import Link from "next/link"

interface BusinessBannerProps {
  text?: string
  linkText?: string
  href?: string
}

export function BusinessBanner({
  text = "Looking to use Orvio for business?",
  linkText = "Get started here",
  href = "/business"
}: BusinessBannerProps) {
  return (
    <div className="bg-blue-600 py-2 md:py-1.5">
      <Link
        href={href}
        className="block w-full hover:bg-blue-700 transition-colors duration-200"
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4">
            <span className="text-white/90 text-sm md:text-sm">{text}</span>
            <span className="font-medium text-white flex items-center text-sm md:text-sm">
              {linkText}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3.5 w-3.5 ml-1" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
} 