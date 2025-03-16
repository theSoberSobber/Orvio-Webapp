import { Loader2 } from "lucide-react"

interface LoaderProps {
  text?: string
  size?: "sm" | "md" | "lg"
  fullScreen?: boolean
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
}

export function Loader({ text = "Getting that Bag 💪", size = "lg", fullScreen = true }: LoaderProps) {
  const content = (
    <div className="flex flex-col items-center gap-4">
      <Loader2 className={`${sizeMap[size]} animate-spin text-blue-500`} />
      {text && <p className="text-slate-400 animate-pulse">{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        {content}
      </div>
    )
  }

  return <div className="flex items-center justify-center py-8">{content}</div>
} 