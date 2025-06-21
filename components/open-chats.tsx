"use client"
import { MessageCircle } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator} from "@/components/ui/dropdown-menu"
import { Badge } from "./ui/badge"
import { time } from "console"

const chats = [{
    id: "1",
    name: "Alice",
    lastMessage: "Hey, how are you?",
    time: "03:30 PM",
  }, {
    id: "2",
    name: "Bob",
    lastMessage: "Let's catch up!",
    time: "03:25 PM",
  }, {
    id: "3",
    name: "Charlie",
    lastMessage: "See you soon!",
    time: "03:20 PM",
  }]

export function OpenChats() {
  const dotColor = "red"; // Can be set based on theme
  const count = 3; // Fetched from api
  const srLabel = "Open Chats"; 

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
          <MessageCircle className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" style={{ minWidth: '200px' , maxWidth: '300px', overflowY: 'auto' }}>
        {chats.map(chat => (
          <DropdownMenuItem key={chat.id}>
            <div className="flex flex-col">
              <span className="font-medium">{chat.name}</span>
              <span className="text-sm text-muted-foreground">{chat.lastMessage}</span>
              <span className="text-xs text-muted-foreground">{chat.time}</span>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center text-sm text-muted-foreground">
          <Button variant="link" className="w-full">
            Open All Chats
          </Button> 
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
