"use client"

import { useState } from "react"
import { 
  Home, 
  Settings, 
  FileText, 
  TrendingUp, 
  BookOpen, 
  Tag,
  ChevronDown,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

const navigationItems = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Services",
    icon: Settings,
    href: "/services",
    hasSubmenu: true,
    submenuItems: [
      { title: "Web Services", href: "/services/web" },
      { title: "API Services", href: "/services/api" },
      { title: "Cloud Services", href: "/services/cloud" },
    ]
  },
  {
    title: "Travel Advisory",
    icon: FileText,
    href: "/travel-advisory",
  },
  {
    title: "News",
    icon: TrendingUp,
    href: "/news",
  },
  {
    title: "Blog",
    icon: BookOpen,
    href: "/blog",
  },
  {
    title: "Promotions",
    icon: Tag,
    href: "/promotions",
  },
]

export function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: SidebarProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  const toggleSubmenu = (title: string) => {
    if (isCollapsed) {
      onToggleCollapse()
      return
    }
    setActiveSubmenu(activeSubmenu === title ? null : title)
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] transform border-r bg-background transition-all duration-200 ease-in-out lg:static lg:z-auto lg:translate-x-0",
          isCollapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="p-4 border-b flex items-center justify-between">
            {!isCollapsed && <h2 className="text-lg font-semibold">AppDashboard</h2>}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="hidden lg:flex h-6 w-6"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.title}>
                  {item.hasSubmenu ? (
                    <Collapsible
                      open={!isCollapsed && activeSubmenu === item.title}
                      onOpenChange={() => toggleSubmenu(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full hover:bg-accent",
                            isCollapsed ? "justify-center px-2" : "justify-start text-left"
                          )}
                        >
                          <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                          {!isCollapsed && (
                            <>
                              <span className="flex-1">{item.title}</span>
                              {activeSubmenu === item.title ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </>
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className={cn("space-y-1 mt-1", !isCollapsed && "ml-7")}>
                        {item.submenuItems?.map((subItem) => (
                          <Button
                            key={subItem.title}
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "w-full text-sm text-muted-foreground hover:text-foreground",
                              isCollapsed ? "justify-center px-2" : "justify-start"
                            )}
                          >
                            {isCollapsed ? subItem.title.charAt(0) : subItem.title}
                          </Button>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full hover:bg-accent",
                        isCollapsed ? "justify-center px-2" : "justify-start"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                      {!isCollapsed && item.title}
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          {!isCollapsed && (
            <div className="p-4 border-t">
              <p className="text-sm text-muted-foreground">
                Welcome! Please sign in to access more features.
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}