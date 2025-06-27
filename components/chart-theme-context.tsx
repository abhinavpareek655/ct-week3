"use client"
import React, { createContext, useContext, useState, useMemo } from "react"

const PALETTES = {
  pastel: ["#A3C9E2", "#F7D6E0", "#F9F6C7", "#B6E2D3"],
  vibrant: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
}

const DEFAULT_PALETTE = "pastel"

interface ChartThemeContextType {
  chartTheme: {
    palette: string
    customColor: string
    applyToConfig: (config: Record<string, any>) => Record<string, any>
  }
  setPalette: React.Dispatch<React.SetStateAction<string>>
  setCustomColor: React.Dispatch<React.SetStateAction<string>>
}

const ChartThemeContext = createContext<ChartThemeContextType | undefined>(undefined)

interface ChartThemeProviderProps {
  children: React.ReactNode
}

export function ChartThemeProvider({ children }: ChartThemeProviderProps) {
  const [palette, setPalette] = useState<string>(DEFAULT_PALETTE)
  const [customColor, setCustomColor] = useState<string>("#4F46E5")

  const chartTheme = useMemo(() => ({
    palette,
    customColor,
    applyToConfig: (config: Record<string, any>) => {
      // Assign colors from palette or custom color
      const keys = Object.keys(config)
      let colors = PALETTES[palette as keyof typeof PALETTES] || PALETTES[DEFAULT_PALETTE]
      if (palette === "custom") {
        colors = [customColor, ...PALETTES[DEFAULT_PALETTE].slice(1)]
      }
      const themedConfig: Record<string, any> = {}
      keys.forEach((key, i) => {
        themedConfig[key] = {
          ...config[key],
          color: colors[i % colors.length],
        }
      })
      return themedConfig
    },
  }), [palette, customColor])

  return (
    <ChartThemeContext.Provider value={{ chartTheme, setPalette, setCustomColor }}>
      {children}
    </ChartThemeContext.Provider>
  )
}

export function useChartTheme() {
  return useContext(ChartThemeContext)
} 