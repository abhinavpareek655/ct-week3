"use client"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "./ui/badge"

const notifications = [
  {
    id: "1",
    title: "Someone mentioned you",
    description: "Alice mentioned you in a comment",
    timestamp: "03:45 PM",
  },
  {
    id: "2",
    title: "New message from Bob",
    description: "Bob sent you a new message",
    timestamp: "03:40 PM",
  },
  {
    id: "3",
    title: "System update available",
    description: "A new system update is available for download",
    timestamp: "03:30 PM",
  },
  {
    id: "4",
    title: "New comment on your post",
    description: "Charlie commented on your post",
    timestamp: "03:20 PM",
  },
]

export function SeeNotifications() {
  const dotColor = "red"; // Can be set based on theme
  const count = 4; // Fetched from api
  const srLabel = "Show Notifications"; 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 p-0"
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
          <Bell className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" style={{ minWidth: '200px' , maxWidth: '300px', overflowY: 'auto' }}>
        {notifications.map(chat => (
          <DropdownMenuItem key={chat.id}>
            <div className="flex flex-col space-y-1">
              <span className="font-medium">{chat.title}</span>
              <span className="text-sm text-muted-foreground">{chat.description}</span>
              <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center text-sm text-muted-foreground">
          <Button variant="link" className="w-full">
            See All Notifications
          </Button> 
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
