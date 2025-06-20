"use client"

import React from "react"
import { Bell, MessageCircle, ShoppingCart, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { toast } from "@/hooks/use-toast"

type IconButtonProps = {
  title?: string
  customFunc?: () => void
  icon: LucideIcon
  dotColor?: string
  count?: number
  srLabel?: string
}

const IconButton: React.FC<IconButtonProps> = ({
  title,
  customFunc,
  icon: Icon,
  dotColor,
  count,
  srLabel,
}) => (
  <Button
    variant="ghost"
    className="relative h-10 w-10 p-0"
    onClick={customFunc}
    title={title}
  >
    {dotColor && (
      <span
        className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full"
        style={{ background: dotColor }}
      />
    )}
    {count !== undefined && count > 0 && (
      <Badge className="absolute -top-1 -right-1">{count}</Badge>
    )}
    <span className="sr-only">{srLabel}</span>
    <Icon className="h-5 w-5" />
  </Button>
)

export function DashboardHeader() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs = [
    { title: "Dashboard", href: "/" },
    ...segments.map((seg, idx) => ({
      title: seg.charAt(0).toUpperCase() + seg.slice(1),
      href: "/" + segments.slice(0, idx + 1).join("/"),
    })),
  ]

  // Example counts for demo purposes
  const notificationCount = 2
  const chatCount = 1
  const cartCount = 0

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.href}>
                <BreadcrumbItem className={idx === 0 ? "hidden md:block" : undefined}>
                  {idx < breadcrumbs.length - 1 ? (
                    <BreadcrumbLink href={crumb.href}>{crumb.title}</BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {idx < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto flex items-center gap-2 px-4">
        <IconButton icon={ShoppingCart} count={cartCount} srLabel="Shopping cart" />
        <IconButton icon={Bell} count={notificationCount} srLabel="Notifications" />
        <IconButton icon={MessageCircle} count={chatCount} srLabel="Chats" />
        <ThemeToggle />
      </div>
    </header>
  )
}
