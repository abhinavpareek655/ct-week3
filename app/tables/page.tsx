import { DashboardLayout } from "@/components/dashboard-layout"
import { DataTablesDemo } from "@/components/data-tables-demo"

export default function TablesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Tables</h1>
          <p className="text-muted-foreground">Interactive tables with sorting, filtering, and pagination.</p>
        </div>
        <DataTablesDemo />
      </div>
    </DashboardLayout>
  )
}
