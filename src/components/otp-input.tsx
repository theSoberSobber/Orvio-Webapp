"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface OTPInputProps {
  phone: string
  onSubmit: (otp: string) => void
  onBack: () => void
  onResend: () => void
  isLoading?: boolean
}

const INITIAL_RESEND_TIME = 30 // 30 seconds
const MAX_ATTEMPTS = 3
const TIMEOUT_INCREMENT = 30 // Increase timeout by 30 seconds each time

export function OTPInput({ phone, onSubmit, onBack, onResend, isLoading = false }: OTPInputProps) {
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""])
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])
  const [error, setError] = React.useState("")
  const [resendTimeout, setResendTimeout] = React.useState(INITIAL_RESEND_TIME)
  const [attempts, setAttempts] = React.useState(0)
  const [canResend, setCanResend] = React.useState(false)

  React.useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }

    // Start the initial resend timeout
    const timer = setInterval(() => {
      setResendTimeout((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  React.useEffect(() => {
    // Check if all digits are filled
    if (otp.every(digit => digit !== "") && !isLoading) {
      handleSubmit()
    }
  }, [otp])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const otpValue = otp.join("")
    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }
    onSubmit(otpValue)
  }

  const handleResend = async () => {
    if (!canResend || isLoading) return

    setAttempts((prev) => prev + 1)
    if (attempts >= MAX_ATTEMPTS - 1) {
      setError("Maximum resend attempts reached. Please try again later.")
      return
    }

    await onResend()
    setCanResend(false)
    setResendTimeout(INITIAL_RESEND_TIME + attempts * TIMEOUT_INCREMENT)

    // Start the resend timeout
    const timer = setInterval(() => {
      setResendTimeout((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="space-y-1 p-0 pb-4">
        <CardTitle className="text-xl text-center text-foreground/80">Enter Verification Code</CardTitle>
        <p className="text-sm text-center text-muted-foreground">
          We sent a code to {phone}
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg"
                disabled={isLoading}
              />
            ))}
          </div>
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          <div className="space-y-2">
            <Button type="submit" className="w-full font-semibold" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </Button>
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleResend}
                disabled={!canResend || isLoading}
                className="text-sm"
              >
                {resendTimeout > 0
                  ? `Resend in ${resendTimeout}s`
                  : `Resend OTP${attempts > 0 ? ` (${MAX_ATTEMPTS - attempts} left)` : ""}`}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 