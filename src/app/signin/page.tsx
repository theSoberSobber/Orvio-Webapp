"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import { PhoneInput } from "@/components/phone-input"
import { OTPInput } from "@/components/otp-input"
import { API_CONFIG } from "@/config/api"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface ApiResponse<T> {
  transactionId?: string
}

export default function SignIn() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [step, setStep] = React.useState<"phone" | "otp">("phone")
  const [loading, setLoading] = React.useState(false)
  const [transactionId, setTransactionId] = React.useState<string>("")
  const [phoneNumber, setPhoneNumber] = React.useState<string>("")
  const [isPhoneValid, setIsPhoneValid] = React.useState(false)

  const handlePhoneSubmit = async () => {
    if (!isPhoneValid) {
      toast.error("Please enter a valid phone number")
      return
    }

    try {
      setLoading(true)
      const response = await axios.post<ApiResponse<{ transactionId: string }>>(
        `${API_CONFIG.BASE_URL}/auth/sendOtp`,
        { phoneNumber }
      )
      setTransactionId(response.data.transactionId!)
      setStep("otp")
      toast.success("OTP sent successfully")
    } catch (error) {
      console.error("Error sending OTP:", error)
      toast.error("Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleOTPSubmit = async (otp: string) => {
    try {
      setLoading(true)
      const response = await axios.post<{ accessToken: string; refreshToken: string }>(
        `${API_CONFIG.BASE_URL}/auth/verifyOtp`,
        {
          transactionId,
          userInputOtp: otp,
        }
      )
      const { accessToken, refreshToken } = response.data
      signIn(accessToken, refreshToken)
      toast.success("Signed in successfully")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error verifying OTP:", error)
      toast.error("Failed to verify OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      setLoading(true)
      const response = await axios.post<ApiResponse<{ transactionId: string }>>(
        `${API_CONFIG.BASE_URL}/auth/resendOtp`,
        { transactionId }
      )
      setTransactionId(response.data.transactionId!)
      toast.success("OTP resent successfully")
    } catch (error) {
      console.error("Error resending OTP:", error)
      toast.error("Failed to resend OTP")
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setStep("phone")
    setTransactionId("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <div className="h-12 w-12 bg-blue-500 rounded-full mb-4" />
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-slate-400">Sign in to your account</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-lg p-6">
          {step === "phone" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <PhoneInput
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  onValidationChange={setIsPhoneValid}
                />
              </div>
              <Button 
                className="w-full" 
                onClick={handlePhoneSubmit}
                disabled={loading || !isPhoneValid}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          ) : (
            <OTPInput
              phone={phoneNumber}
              onSubmit={handleOTPSubmit}
              onBack={handleBack}
              onResend={handleResend}
              isLoading={loading}
            />
          )}
        </div>
      </div>
    </div>
  )
} 