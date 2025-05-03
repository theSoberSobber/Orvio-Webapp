"use client"

import * as React from "react"
import { useAuth } from "@/contexts/auth-context"
import { useAuthApi } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Copy, Key, MessageSquare, Smartphone, Users, Loader2, RefreshCw } from "lucide-react"
import { PhoneInput } from "@/components/phone-input"
import { useRouter } from "next/navigation"
import { Loader } from "@/components/ui/loader"

interface Stats {
  provider: {
    currentDevice: null
    allDevices: {
      failedToSendAck: number
      sentAckNotVerified: number
      sentAckVerified: number
      totalMessagesSent: number
      totalDevices: number
      activeDevices: number
    }
  }
  consumer: {
    aggregate: {
      totalKeys: number
      activeKeys: number
      oldestKey: number
      newestKey: number
      lastUsedKey: number
    }
    keys: Array<{
      name: string
      createdAt: string
      lastUsed: string | null
      refreshToken: string
    }>
  }
  credits: {
    balance: number
    mode: string
  }
}

interface ApiKey {
  id: string
  name: string
  createdAt: string
  lastUsed: string | null
  session: {
    id: string
    refreshToken: string
  }
}

interface ApiResponse<T> {
  transactionId?: string
}

const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export default function Dashboard() {
  const { accessToken, refreshToken, isLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = React.useState<Stats | null>(null)
  const [apiKeys, setApiKeys] = React.useState<ApiKey[]>([])
  const [newKeyName, setNewKeyName] = React.useState("")
  const [orgName, setOrgName] = React.useState("")
  const [selectedApiKey, setSelectedApiKey] = React.useState<string>("")
  const [reportingWebhook, setReportingWebhook] = React.useState("")
  const [reportingSecret, setReportingSecret] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [isPhoneValid, setIsPhoneValid] = React.useState(false)
  const [isWebhookValid, setIsWebhookValid] = React.useState(false)
  const [secondsUntilRefresh, setSecondsUntilRefresh] = React.useState(30)
  const refreshTimerRef = React.useRef<NodeJS.Timeout | null>(null)
  const [orgNameForTest, setOrgNameForTest] = React.useState("")

  const api = useAuthApi({
    accessToken: accessToken!,
    refreshToken: refreshToken!,
  })

  const fetchStats = async () => {
    try {
      const response = await api.get<Stats>("/auth/stats")
      setStats(response.data)
    } catch (error) {
      console.error("Error fetching stats:", error)
      toast.error("Failed to fetch stats")
    }
  }

  const fetchApiKeys = async () => {
    try {
      const response = await api.get<ApiKey[]>("/auth/apiKey/getAll")
      setApiKeys(response.data)
    } catch (error) {
      console.error("Error fetching API keys:", error)
      toast.error("Failed to fetch API keys")
    }
  }

  const createApiKey = async () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for the API key")
      return
    }

    try {
      setLoading(true)
      const payload: { name: string; orgName?: string } = { name: newKeyName }
      
      // Add organization name if provided
      if (orgName.trim()) {
        payload.orgName = orgName.trim()
      }
      
      await api.post("/auth/apiKey/createNew", payload)
      toast.success("API key created successfully")
      setNewKeyName("")
      setOrgName("")
      setModalOpen(false)
      fetchApiKeys()
      fetchStats()
    } catch (error) {
      console.error("Error creating API key:", error)
      toast.error("Failed to create API key")
    } finally {
      setLoading(false)
    }
  }

  const handleTestMessage = async (phoneNumber: string) => {
    if (!isPhoneValid) {
      toast.error("Please enter a valid phone number")
      return
    }

    // Validate webhook and secret combination
    if (reportingSecret && !reportingWebhook) {
      toast.error("Cannot specify a secret without a webhook URL")
      return
    }

    try {
      setLoading(true)
      const payload: {
        phoneNumber: string
        reportingWebhook?: string
        reportingSecret?: string
        orgName?: string
      } = { phoneNumber }

      // Only add webhook and secret if webhook is provided
      if (reportingWebhook) {
        payload.reportingWebhook = reportingWebhook
        if (reportingSecret) {
          payload.reportingSecret = reportingSecret
        }
      }

      if (orgNameForTest.trim()) {
        payload.orgName = orgNameForTest.trim()
      }

      const response = await api.post<ApiResponse<{ transactionId: string }>>(
        "/service/sendOtp",
        payload
      )
      toast.success("Test message sent successfully")
      console.log("Transaction ID:", response.data.transactionId)
    } catch (error) {
      console.error("Error sending test message:", error)
      toast.error("Failed to send test message")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  const validateWebhookUrl = (url: string): boolean => {
    const trimmedUrl = url.trim()
    if (!trimmedUrl) {
      setIsWebhookValid(false)
      return false
    }
    try {
      new URL(trimmedUrl)
      setIsWebhookValid(true)
      return true
    } catch {
      setIsWebhookValid(false)
      return false
    }
  }

  const handleWebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setReportingWebhook(url)
    if (!validateWebhookUrl(url)) {
      setReportingSecret("")
    }
  }

  const resetRefreshTimer = () => {
    setSecondsUntilRefresh(30)
  }

  const startRefreshTimer = () => {
    if (refreshTimerRef.current) {
      clearInterval(refreshTimerRef.current)
    }
    
    refreshTimerRef.current = setInterval(() => {
      setSecondsUntilRefresh((prev) => {
        if (prev <= 1) {
          fetchStats()
          return 30
        }
        return prev - 1
      })
    }, 1000)
  }

  const refreshData = () => {
    fetchStats()
    fetchApiKeys()
    resetRefreshTimer()
    toast.success("Stats refreshed")
  }

  React.useEffect(() => {
    if (!isLoading && !accessToken) {
      router.push("/signin")
      return
    }

    if (!isLoading && accessToken) {
      fetchStats()
      fetchApiKeys()
      startRefreshTimer()
    }
  }, [isLoading, accessToken])

  // Cleanup timer on unmount
  React.useEffect(() => {
    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current)
      }
    }
  }, [])

  if (isLoading) {
    return <Loader fullScreen={false} text="Loading your dashboard..." />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-[800px] mx-auto px-6 pt-4 pb-8">
        {/* Stats Cards with Refresh Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-lg mr-2">💰</span>
              <span className="font-medium">{stats?.credits?.balance ?? 0}</span>
              <span className="text-sm text-muted-foreground ml-1">
                ({stats?.credits?.mode ?? 'loading'} mode)
              </span>
              <div className="ml-2 text-xs text-muted-foreground">
                refreshing in {secondsUntilRefresh}s
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={refreshData}
              title="Refresh stats"
              className="hover:bg-[#1a1d24]"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className="bg-[#1a1d24] border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total API Keys</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.consumer.aggregate.totalKeys ?? 0}</div>
            </CardContent>
          </Card>
          <Card className="bg-[#1a1d24] border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.provider.allDevices.activeDevices ?? 0}</div>
            </CardContent>
          </Card>
          <Card className="bg-[#1a1d24] border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.provider.allDevices.totalMessagesSent ?? 0}</div>
            </CardContent>
          </Card>
          <Card className="bg-[#1a1d24] border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Keys</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.consumer.aggregate.activeKeys ?? 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <div className="flex justify-center w-full mb-4">
            <TabsList className="bg-[#1a1d24] border-0 mx-auto">
              <TabsTrigger className="px-8" value="overview">Overview</TabsTrigger>
              <TabsTrigger className="px-8" value="messaging">Messaging</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <Card className="bg-[#1a1d24] border-0">
              <CardHeader>
                <CardTitle>Credit Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">💰</div>
                  <div>
                    <div className="text-2xl font-bold">{stats?.credits?.balance ?? 0} credits</div>
                    <div className="text-muted-foreground">Mode: {stats?.credits?.mode ?? 'loading'}</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Credits are used to send messages through the Orvio platform. Your credit balance and mode 
                  determine how many messages you can send.
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">API Keys</h2>
              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary">Create API Key</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New API Key</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Enter API key name"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Organization name (optional)"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        If provided, the organization name will be associated with this API key
                      </p>
                    </div>
                    <Button onClick={createApiKey} disabled={loading || !newKeyName.trim()}>
                      {loading ? "Creating..." : "Create"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-3">
              {apiKeys.map((key) => (
                <Card key={key.id} className="bg-[#1a1d24] border-0">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div>
                      <CardTitle className="text-base">{key.name}</CardTitle>
                      <div className="text-sm text-muted-foreground">
                        Created: {new Date(key.createdAt).toLocaleDateString()}
                        {key.lastUsed && ` • Last used: ${new Date(key.lastUsed).toLocaleDateString()}`}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(key.session.refreshToken)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messaging" className="space-y-4">
            <Card className="bg-[#1a1d24] border-0">
              <CardHeader>
                <CardTitle>Test API Key</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select API Key</label>
                  <select
                    className="w-full p-2 rounded-md bg-background border"
                    value={selectedApiKey}
                    onChange={(e) => setSelectedApiKey(e.target.value)}
                  >
                    <option value="">Select an API key</option>
                    {apiKeys.map((key) => (
                      <option key={key.id} value={key.session.refreshToken}>
                        {key.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <PhoneInput 
                    value={phoneNumber} 
                    onChange={setPhoneNumber}
                    onValidationChange={setIsPhoneValid}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Organization Name (Optional)</label>
                  <Input
                    placeholder="Enter organization name"
                    value={orgNameForTest}
                    onChange={(e) => setOrgNameForTest(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Webhook Configuration (Optional)</h3>
                  <div className="space-y-2">
                    <Input
                      placeholder="Reporting Webhook URL"
                      value={reportingWebhook}
                      onChange={handleWebhookChange}
                      className={reportingWebhook && !isWebhookValid ? "border-destructive" : ""}
                    />
                    {reportingWebhook && !isWebhookValid && (
                      <p className="text-sm text-destructive">Please enter a valid URL</p>
                    )}
                  </div>
                  <div>
                    <Input
                      placeholder="Reporting Webhook Secret"
                      value={reportingSecret}
                      onChange={(e) => setReportingSecret(e.target.value)}
                      disabled={!isWebhookValid}
                      className="peer"
                    />
                  </div>
                  <p className="text-sm text-slate-400 mt-2">
                    Configure a webhook to receive reporting events. Secret can only be set when a valid webhook URL is provided.
                  </p>
                </div>

                <Button 
                  onClick={() => handleTestMessage(phoneNumber)} 
                  disabled={loading || !isPhoneValid || !selectedApiKey || (reportingWebhook && !isWebhookValid) as boolean}
                  className="w-full mt-6"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 