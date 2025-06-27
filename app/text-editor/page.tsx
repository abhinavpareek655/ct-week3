"use client"

import { WysiwygEditor } from "@/components/wysiwyg-editor"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function TextEditorPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <WysiwygEditor /> 
      </div>
    </DashboardLayout>
  )
}
