import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsDemo } from "@/components/settings-demo"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Customize your dashboard appearance and preferences.</p>
        </div>
        <SettingsDemo />
      </div>
    </DashboardLayout>
  )
}
