"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, Calendar, Home, Kanban, Settings, Table } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const defaultNav = [
  { title: "Dashboard", url: "/",         icon: Home },
  { title: "Tables",    url: "/tables",   icon: Table },
  { title: "Charts",    url: "/charts",   icon: BarChart3 },
  { title: "Calendar",  url: "/calendar", icon: Calendar },
  { title: "Kanban",    url: "/kanban",   icon: Kanban },
  { title: "Settings",  url: "/settings", icon: Settings },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  // Load user profile from localStorage
  const [user, setUser] = React.useState({
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  })

  React.useEffect(() => {
    const saved = localStorage.getItem("userProfile")
    if (saved) {
      try {
        const { firstName, lastName, email } = JSON.parse(saved)
        setUser(u => ({
          ...u,
          name: `${firstName || u.name.split(" ")[0]} ${lastName || u.name.split(" ")[1] || ""}`.trim(),
          email: email || u.email,
        }))
      } catch {
        // ignore parse errors
      }
    }
  }, [])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div className="ml-2 grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Admin Dashboard</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {defaultNav.map(item => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url} className="flex items-center space-x-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{
                    user.name
                      .split(" ")
                      .map(n => n[0])
                      .join("")
                  }</AvatarFallback>
                </Avatar>
                <div className="ml-2 grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
