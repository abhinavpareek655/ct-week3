import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard-overview"
import { WysiwygEditor } from "@/components/wysiwyg-editor"

export default function HomePage() {
  return (
    <DashboardLayout>
      <DashboardOverview />
      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">Rich Text Editor Demo</h2>
        <WysiwygEditor />
      </section>
    </DashboardLayout>
  )
}
