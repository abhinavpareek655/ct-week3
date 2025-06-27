import React from "react"
import { useChartTheme } from "./chart-theme-context"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

export function ChartThemeSelector() {
  const { chartTheme, setPalette, setCustomColor } = useChartTheme()
  return (
    <div className="flex items-center gap-2">
      <Select value={chartTheme.palette} onValueChange={setPalette}>
        <SelectTrigger className="w-28">
          <SelectValue placeholder="Palette" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pastel">Pastel</SelectItem>
          <SelectItem value="vibrant">Vibrant</SelectItem>
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>
      {chartTheme.palette === "custom" && (
        <input
          type="color"
          value={chartTheme.customColor}
          onChange={e => setCustomColor(e.target.value)}
          title="Pick primary color"
          className="w-8 h-8 border rounded"
        />
      )}
    </div>
  )
} 