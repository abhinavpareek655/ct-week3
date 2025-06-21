"use client"

import * as React from "react"
import { Calendar as RBCalendar, dateFnsLocalizer, type SlotInfo, type View } from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import formatISO from "date-fns/formatISO"
import enUS from "date-fns/locale/en-US"
import "react-big-calendar/lib/css/react-big-calendar.css"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, MapPin, FileText, ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "next-themes"

const locales = { "en-US": enUS }
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales })

interface MyEvent {
  id: number
  title: string
  start: Date
  end: Date
  type?: "meeting" | "deadline" | "call"
  location?: string
  description?: string
}

const initialEvents: MyEvent[] = [
  {
    id: 1,
    title: "Team Meeting",
    start: new Date(2024, 0, 15, 9),
    end: new Date(2024, 0, 15, 10),
    type: "meeting",
    location: "Conference Room A",
    description: "Weekly team sync and project updates",
  },
  {
    id: 2,
    title: "Project Deadline",
    start: new Date(2024, 0, 20, 13),
    end: new Date(2024, 0, 20, 14),
    type: "deadline",
    description: "Final submission for Q1 project",
  },
  {
    id: 3,
    title: "Client Call",
    start: new Date(2024, 0, 25, 15),
    end: new Date(2024, 0, 25, 16),
    type: "call",
    location: "Zoom Meeting",
    description: "Quarterly business review with client",
  },
]

function CustomToolbar({ onNavigate, onView, view, date }: any) {
  const currentDate = format(date, "MMMM yyyy")

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={() => onNavigate("TODAY")}>
          Today
        </Button>
        <div className="flex items-center gap-1">
          <Button size="sm" variant="outline" onClick={() => onNavigate("PREV")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => onNavigate("NEXT")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="hidden sm:block text-lg font-semibold ml-2">{currentDate}</div>
      </div>
      <div className="flex items-center gap-1">
        {(["month", "week", "work_week", "day"] as View[]).map((v) => (
          <Button
            key={v}
            size="sm"
            variant={view === v ? "default" : "outline"}
            onClick={() => onView(v)}
            className="capitalize"
          >
            {v.replace("_", " ")}
          </Button>
        ))}
      </div>
    </div>
  )
}

const eventTypeConfig = {
  meeting: {
    color: "hsl(var(--primary))",
    darkColor: "hsl(var(--primary))",
    label: "Meeting",
    icon: CalendarDays,
  },
  deadline: {
    color: "hsl(var(--destructive))",
    darkColor: "hsl(var(--destructive))",
    label: "Deadline",
    icon: Clock,
  },
  call: {
    color: "hsl(var(--chart-2))",
    darkColor: "hsl(var(--chart-2))",
    label: "Call",
    icon: FileText,
  },
}

export function CalendarDemo() {
  const [events, setEvents] = React.useState<MyEvent[]>(initialEvents)
  const [slotInfo, setSlotInfo] = React.useState<SlotInfo | null>(null)
  const [selectedEvent, setSelectedEvent] = React.useState<MyEvent | null>(null)
  const [open, setOpen] = React.useState(false)
  const [eventType, setEventType] = React.useState<string>("meeting")
  const { theme } = useTheme()

  const eventPropGetter = (event: MyEvent) => {
    const config = eventTypeConfig[event.type || "meeting"]
    return {
      style: {
        backgroundColor: config.color,
        color: "hsl(var(--primary-foreground))",
        border: "none",
        borderRadius: "6px",
        fontSize: "12px",
        padding: "2px 6px",
      },
    }
  }

  const handleSelectSlot = (slot: SlotInfo) => {
    setSlotInfo(slot)
    setSelectedEvent(null)
    setOpen(true)
  }

  const handleSelectEvent = (event: MyEvent) => {
    setSelectedEvent(event)
    setSlotInfo(null)
    setOpen(true)
  }

  const handleSave = (data: any) => {
    if (slotInfo) {
      setEvents((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: data.title,
          start: data.start,
          end: data.end,
          type: data.type,
          location: data.location,
          description: data.description,
        },
      ])
    }
    setOpen(false)
    setSlotInfo(null)
    setSelectedEvent(null)
  }

  const handleDelete = () => {
    if (selectedEvent) {
      setEvents((prev) => prev.filter((event) => event.id !== selectedEvent.id))
      setOpen(false)
      setSelectedEvent(null)
    }
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <CalendarDays className="h-6 w-6" />
            Event Scheduler
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="calendar-container">
            <style jsx global>{`
              .rbc-calendar {
                background: hsl(var(--background));
                color: hsl(var(--foreground));
                font-family: inherit;
              }
              .rbc-header {
                background: hsl(var(--muted));
                color: hsl(var(--muted-foreground));
                border-bottom: 1px solid hsl(var(--border));
                padding: 12px 8px;
                font-weight: 600;
                font-size: 14px;
              }
              .rbc-month-view, .rbc-time-view {
                border: 1px solid hsl(var(--border));
                border-radius: 8px;
                overflow: hidden;
              }
              .rbc-date-cell {
                padding: 8px;
                border-right: 1px solid hsl(var(--border));
              }
              .rbc-date-cell:last-child {
                border-right: none;
              }
              .rbc-day-bg {
                background: hsl(var(--background));
                border-right: 1px solid hsl(var(--border));
              }
              .rbc-day-bg:last-child {
                border-right: none;
              }
              .rbc-today {
                background: hsl(var(--accent));
              }
              .rbc-off-range-bg {
                background: hsl(var(--muted/50));
              }
              .rbc-month-row {
                border-bottom: 1px solid hsl(var(--border));
              }
              .rbc-month-row:last-child {
                border-bottom: none;
              }
              .rbc-date-cell > a {
                color: hsl(var(--foreground));
                text-decoration: none;
                font-weight: 500;
              }
              .rbc-date-cell > a:hover {
                color: hsl(var(--primary));
              }
              .rbc-off-range {
                color: hsl(var(--muted-foreground));
              }
              .rbc-current-time-indicator {
                background-color: hsl(var(--destructive));
              }
              .rbc-time-slot {
                border-top: 1px solid hsl(var(--border));
              }
              .rbc-timeslot-group {
                border-bottom: 1px solid hsl(var(--border));
              }
              .rbc-time-header-content {
                border-left: 1px solid hsl(var(--border));
              }
              .rbc-time-content {
                border-top: 1px solid hsl(var(--border));
              }
              .rbc-time-gutter {
                background: hsl(var(--muted/30));
                border-right: 1px solid hsl(var(--border));
              }
              .rbc-time-header-gutter {
                background: hsl(var(--muted));
                border-bottom: 1px solid hsl(var(--border));
                border-right: 1px solid hsl(var(--border));
              }
              .rbc-allday-cell {
                background: hsl(var(--muted/30));
                border-bottom: 1px solid hsl(var(--border));
              }
              .rbc-row-segment {
                padding: 1px 2px;
              }
              .rbc-event {
                border-radius: 4px;
                padding: 2px 5px;
                font-size: 11px;
                line-height: 1.2;
              }
              .rbc-event:focus {
                outline: 2px solid hsl(var(--ring));
                outline-offset: 2px;
              }
              .rbc-slot-selection {
                background-color: hsl(var(--primary/20));
                border: 2px solid hsl(var(--primary));
              }
            `}</style>
            <RBCalendar
              localizer={localizer}
              events={events}
              selectable
              popup
              eventPropGetter={eventPropGetter}
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              components={{ toolbar: CustomToolbar }}
              views={["month", "week", "work_week", "day"] as View[]}
              defaultView="month"
              style={{ height: 600, margin: "0 16px 16px 16px" }}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedEvent ? (
                <>
                  <Badge variant="secondary" className="capitalize">
                    {selectedEvent.type}
                  </Badge>
                  Event Details
                </>
              ) : (
                <>
                  <CalendarDays className="h-5 w-5" />
                  Create New Event
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedEvent ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{selectedEvent.title}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      {format(selectedEvent.start, "PPP 'at' p")} - {format(selectedEvent.end, "p")}
                    </span>
                  </div>
                  {selectedEvent.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  )}
                  {selectedEvent.description && (
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <FileText className="h-4 w-4 mt-0.5" />
                      <span>{selectedEvent.description}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <form
              id="event-form"
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleSave({
                  title: formData.get("title"),
                  start: new Date(formData.get("start") as string),
                  end: new Date(formData.get("end") as string),
                  type: eventType,
                  location: formData.get("location"),
                  description: formData.get("description"),
                })
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" name="title" placeholder="Enter event title" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Event Type</Label>
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        Meeting
                      </div>
                    </SelectItem>
                    <SelectItem value="deadline">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Deadline
                      </div>
                    </SelectItem>
                    <SelectItem value="call">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Call
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start">Start Date & Time</Label>
                  <Input
                    id="start"
                    name="start"
                    type="datetime-local"
                    defaultValue={slotInfo ? formatISO(slotInfo.start).slice(0, 16) : ""}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end">End Date & Time</Label>
                  <Input
                    id="end"
                    name="end"
                    type="datetime-local"
                    defaultValue={slotInfo ? formatISO(slotInfo.end).slice(0, 16) : ""}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location (Optional)</Label>
                <Input id="location" name="location" placeholder="Enter location or meeting link" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea id="description" name="description" placeholder="Add event description or notes" rows={3} />
              </div>
            </form>
          )}

          <DialogFooter className="flex justify-between">
            {selectedEvent && (
              <Button variant="destructive" onClick={handleDelete}>
                Delete Event
              </Button>
            )}
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              {!selectedEvent && (
                <Button type="submit" form="event-form">
                  Create Event
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
