import { DashboardLayout } from "@/components/dashboard-layout"
import { CalendarDemo } from "@/components/calendar-demo"

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and events.</p>
        </div>
        <CalendarDemo />
      </div>
    </DashboardLayout>
  )
}
