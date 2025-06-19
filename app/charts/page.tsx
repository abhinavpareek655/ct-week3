import { DashboardLayout } from "@/components/dashboard-layout"
import { ChartsDemo } from "@/components/charts-demo"

export default function ChartsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Charts</h1>
          <p className="text-muted-foreground">Interactive charts and data visualizations.</p>
        </div>
        <ChartsDemo />
      </div>
    </DashboardLayout>
  )
}
