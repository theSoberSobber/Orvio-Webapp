"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { usePathname } from "next/navigation"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItem {
  title: string
  href: string
}

interface ActionButton {
  title: string
  href: string
  variant?: "default" | "outline"
}

interface NavbarProps {
  items?: NavItem[]
  actionButton?: ActionButton
}

const defaultItems = [
  { title: "Features", href: "#features" },
  { title: "How It Works", href: "#how-it-works" },
  { title: "FAQ", href: "#faq" },
]

const defaultActionButton = {
  title: "Sign In",
  href: "/signin",
  variant: "outline" as const
}

export function Navbar({ items = defaultItems, actionButton = defaultActionButton }: NavbarProps) {
  const { isAuthenticated, signOut } = useAuth()
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith("/dashboard")
  const isBusiness = pathname?.startsWith("/business")

  return (
    <div className="w-full">
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-blue-500 rounded-full" />
          <span className="font-bold text-xl text-white">Orvio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              {!isDashboard && items.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {isAuthenticated ? (
            isDashboard ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={signOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/dashboard">
                <Button variant="outline" className="text-white border-white hover:bg-white/10">
                  Dashboard
                </Button>
              </Link>
            )
          ) : (
            <Link href={actionButton.href}>
              <Button 
                variant={actionButton.variant || "outline"} 
                className={actionButton.variant === "outline" ? "text-white border-white hover:bg-white/10" : ""}
              >
                {actionButton.title}
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-slate-900 border-slate-800 p-6">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold text-white flex items-center gap-2">
                  <div className="h-8 w-8 bg-blue-500 rounded-full" />
                  Orvio
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-6 mt-8">
                {!isDashboard && items.map((item, index) => (
                  <React.Fragment key={item.title}>
                    <Link
                      href={item.href}
                      className="text-lg font-medium text-slate-200 hover:text-white transition-colors hover:translate-x-1 transform duration-200 flex items-center"
                    >
                      {item.title}
                    </Link>
                    {index < items.length - 1 && (
                      <Separator className="bg-slate-800" />
                    )}
                  </React.Fragment>
                ))}
                <div className="pt-4">
                  {isAuthenticated ? (
                    isDashboard ? (
                      <Button
                        variant="outline"
                        className="w-full text-white border-white hover:bg-white/10"
                        onClick={signOut}
                      >
                        Sign Out
                      </Button>
                    ) : (
                      <Link href="/dashboard">
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-6">
                          Dashboard
                        </Button>
                      </Link>
                    )
                  ) : (
                    <Link href={actionButton.href}>
                      <Button 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-6"
                      >
                        {actionButton.title}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
} 