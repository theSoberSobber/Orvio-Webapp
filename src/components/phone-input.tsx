"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PhoneInputProps {
  value?: string
  onChange?: (value: string) => void
  onValidationChange?: (isValid: boolean) => void
}

export function PhoneInput({ value, onChange, onValidationChange }: PhoneInputProps) {
  const [countryCode, setCountryCode] = React.useState("91")
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [isValid, setIsValid] = React.useState(false)

  const validatePhoneNumber = (number: string) => {
    const isValidNumber = number.length === 10
    setIsValid(isValidNumber)
    onValidationChange?.(isValidNumber)
    return isValidNumber
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10)
    setPhoneNumber(value)
    validatePhoneNumber(value)
    if (onChange) {
      onChange(`+${countryCode}${value}`)
    }
  }

  const handleCountryCodeChange = (value: string) => {
    setCountryCode(value)
    if (onChange) {
      onChange(`+${value}${phoneNumber}`)
    }
  }

  // Validate initial value if provided
  React.useEffect(() => {
    if (phoneNumber) {
      validatePhoneNumber(phoneNumber)
    }
  }, [])

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Select value={countryCode} onValueChange={handleCountryCodeChange}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="91" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="91">+91</SelectItem>
            <SelectItem value="1">+1</SelectItem>
            <SelectItem value="44">+44</SelectItem>
            <SelectItem value="81">+81</SelectItem>
            <SelectItem value="86">+86</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="tel"
          placeholder="10-digit phone number"
          value={phoneNumber}
          onChange={handlePhoneChange}
          className={`flex-1 ${!isValid && phoneNumber.length > 0 ? "border-destructive" : ""}`}
        />
      </div>
      {!isValid && phoneNumber.length > 0 && (
        <p className="text-sm text-destructive">Please enter a valid 10-digit phone number</p>
      )}
    </div>
  )
} 