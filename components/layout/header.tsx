"use client"

import { Search, Moon, Sun, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

interface HeaderProps {
  onSidebarToggle: () => void
  isSidebarOpen: boolean
  sidebarCollapsed: boolean
}

export function Header({ onSidebarToggle, isSidebarOpen, sidebarCollapsed }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden mr-2"
          onClick={onSidebarToggle}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo */}
        <div className={`flex items-center space-x-2 transition-all duration-200 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <h1 className="text-xl font-bold">AppDashboard</h1>
        </div>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-muted/50 border-0"
            />
          </div>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-2 ml-auto">
          {/* Search - Mobile */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Auth buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Register
            </Button>
            <Button size="sm">
              Sign In
            </Button>
          </div>

          {/* Mobile user menu */}
          <Button variant="ghost" size="icon" className="sm:hidden">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}