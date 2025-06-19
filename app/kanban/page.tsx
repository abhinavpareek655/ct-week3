import { DashboardLayout } from "@/components/dashboard-layout"
import { KanbanBoard } from "@/components/kanban-board"

export default function KanbanPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
          <p className="text-muted-foreground">Organize tasks with drag and drop functionality.</p>
        </div>
        <KanbanBoard />
      </div>
    </DashboardLayout>
  )
}
