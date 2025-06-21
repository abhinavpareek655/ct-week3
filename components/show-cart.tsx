"use client"

import * as React from "react"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const initialItems = [
  { id: "1", 
    name: "Samsung Galaxy S21",     
    description: "Model 2021, 128GB, Phantom Gray",
    count: 2 },
  { id: "2", 
    name: "Apple iPhone 13",        
    description: "Model 2021, 256GB, Blue",        
    count: 1 },
  { id: "3", 
    name: "Google Pixel 6",         
    description: "Model 2021, 128GB, Sorta Seafoam", 
    count: 3 },
  { id: "4", 
    name: "OnePlus 9",              
    description: "Model 2021, 256GB, Morning Mist", 
    count: 1 },
  { id: "5", 
    name: "Sony Xperia 5 III",      
    description: "Model 2021, 128GB, Black",        
    count: 4 },
]

export function ShowCart() {
  const [items, setItems] = React.useState(initialItems)
  const totalCount = items.reduce((sum, it) => sum + it.count, 0)

  const adjust = (id: string, delta: number) => {
    setItems(curr =>
      curr.map(it =>
        it.id === id
          ? { ...it, count: Math.max(0, it.count + delta) }
          : it
      )
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 p-0">
          {totalCount > 0 && (
            <Badge className="absolute -top-1 -right-1">{totalCount}</Badge>
          )}
          <span className="sr-only">Show Cart</span>
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        style={{ minWidth: 200, maxWidth: 300, overflowY: "auto" }}
      >
        {items.map(item => (
          <div key={item.id}>
          <DropdownMenuItem key={item.id} className="flex items-center space-x-2">
            <div className="flex-1 flex flex-col">
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-muted-foreground">
                {item.description}
              </span>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                adjust(item.id, -1)
              }}
              disabled={item.count === 0}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="w-6 text-center">{item.count}</span>

            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                adjust(item.id, +1)
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          </div>
        ))}
        <DropdownMenuItem className="text-center text-sm text-muted-foreground">
          <Button variant="link" className="w-full">
            Checkout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}