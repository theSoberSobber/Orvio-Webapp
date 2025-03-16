"use client"

import { useEffect, useRef } from "react"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-json"

interface CodeBlockProps {
  language: string
  code: string
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    if (preRef.current) {
      Prism.highlightElement(preRef.current)
    }
  }, [code, language])

  return (
    <div className="relative rounded-md overflow-hidden">
      <pre
        ref={preRef}
        className={`language-${language}`}
        // Remove tabindex attribute completely
      >
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <button
        onClick={() => {
          navigator.clipboard.writeText(code)
        }}
        className="absolute top-2 right-2 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors"
        aria-label="Copy code"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M8 4v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10a2 2 0 0 0-2 2z" />
          <path d="M16 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2" />
        </svg>
      </button>
    </div>
  )
} 