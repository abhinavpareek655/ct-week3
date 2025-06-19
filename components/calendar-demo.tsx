"use client"

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const events = [
  { id: 1, title: "Team Meeting", date: new Date(2024, 0, 15), type: "meeting" },
  { id: 2, title: "Project Deadline", date: new Date(2024, 0, 20), type: "deadline" },
  { id: 3, title: "Client Call", date: new Date(2024, 0, 25), type: "call" },
]

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [selectedEvents, setSelectedEvents] = React.useState(events)

  const eventsForSelectedDate = selectedEvents.filter(
    (event) => date && event.date.toDateString() === date.toDateString(),
  )

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>Select a date to view events</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
              hasEvent: events.map((event) => event.date),
            }}
            modifiersStyles={{
              hasEvent: {
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                borderRadius: "50%",
              },
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Events</CardTitle>
            <CardDescription>{date ? `Events for ${date.toDateString()}` : "Select a date"}</CardDescription>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventsForSelectedDate.length > 0 ? (
              eventsForSelectedDate.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.date.toLocaleDateString()}</p>
                  </div>
                  <Badge
                    variant={
                      event.type === "meeting" ? "default" : event.type === "deadline" ? "destructive" : "secondary"
                    }
                  >
                    {event.type}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">No events for this date</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
