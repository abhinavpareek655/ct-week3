"use client"

import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis, CartesianGrid, AreaChart,  Area,  Tooltip,  ResponsiveContainer, FunnelChart, Funnel, LabelList} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MouseCoordinateX, MouseCoordinateY, CrossHairCursor, EdgeIndicator } from "react-financial-charts"
import { ChartCanvas, Chart } from "react-financial-charts"
import { CandlestickSeries } from "react-financial-charts"
import { discontinuousTimeScaleProvider } from "react-financial-charts"
import { timeFormat } from "d3-time-format"
import { format } from "d3-format"
import { XAxis as FinancialXAxis, YAxis as FinancialYAxis } from "react-financial-charts"

const barData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const lineData = [
  { month: "Jan", revenue: 4000, profit: 2400 },
  { month: "Feb", revenue: 3000, profit: 1398 },
  { month: "Mar", revenue: 2000, profit: 9800 },
  { month: "Apr", revenue: 2780, profit: 3908 },
  { month: "May", revenue: 1890, profit: 4800 },
  { month: "Jun", revenue: 2390, profit: 3800 },
]

const pieData = [
  { name: "Desktop", value: 400, fill: "hsl(var(--chart-1))" },
  { name: "Mobile", value: 300, fill: "hsl(var(--chart-2))" },
  { name: "Tablet", value: 200, fill: "hsl(var(--chart-3))" },
  { name: "Other", value: 100, fill: "hsl(var(--chart-4))" },
]

const areaData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const funnelData = [
  { name: "Bread", value: 930, fill: "hsl(var(--chart-1))" },
  { name: "Fruits", value: 520, fill: "hsl(var(--chart-2))" },
  { name: "Meat", value: 475, fill: "hsl(var(--chart-3))" },
  { name: "Vegetables", value: 470, fill: "hsl(var(--chart-4))" },
]

const stockData = [
  { date: new Date(2024, 0, 2), open: 135.8, high: 137.8, low: 134.5, close: 136.7 },
  { date: new Date(2024, 0, 3), open: 136.7, high: 138.2, low: 135.9, close: 137.5 },
  { date: new Date(2024, 0, 4), open: 137.5, high: 139.0, low: 136.8, close: 138.6 },
  { date: new Date(2024, 0, 5), open: 138.6, high: 140.4, low: 138.2, close: 139.8 },
  { date: new Date(2024, 0, 8), open: 139.8, high: 141.0, low: 139.1, close: 140.2 },
  { date: new Date(2024, 0, 9), open: 140.2, high: 142.5, low: 139.9, close: 141.7 },
  { date: new Date(2024, 0, 10), open: 141.7, high: 143.0, low: 141.0, close: 142.5 },
  { date: new Date(2024, 0, 11), open: 142.5, high: 144.2, low: 142.3, close: 143.9 },
  { date: new Date(2024, 0, 12), open: 143.9, high: 145.0, low: 143.1, close: 144.7 },
  { date: new Date(2024, 0, 15), open: 144.7, high: 146.3, low: 144.4, close: 145.8 },
]

export function ChartsDemo() {
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d: any) => d.date)
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(stockData)
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Bar Chart</CardTitle>
          <CardDescription>Monthly desktop vs mobile users</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              desktop: {
                label: "Desktop",
                color: "hsl(var(--chart-1))",
              },
              mobile: {
                label: "Mobile",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" />
              <Bar dataKey="mobile" fill="var(--color-mobile)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
          <CardDescription>Revenue and profit trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-1))",
              },
              profit: {
                label: "Profit",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
              <Line type="monotone" dataKey="profit" stroke="var(--color-profit)" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pie Chart</CardTitle>
          <CardDescription>Device usage distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
          mobile: {
            label: "Mobile",
            color: "hsl(var(--chart-2))",
          },
          tablet: {
            label: "Tablet",
            color: "hsl(var(--chart-3))",
          },
          other: {
            label: "Other",
            color: "hsl(var(--chart-4))",
          },
        }}
        className="h-[300px]"
          >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie 
            data={pieData} 
            cx="50%" 
            cy="50%" 
            outerRadius={80} 
            dataKey="value"
            label={(entry) => entry.name}
          >
            {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Area Chart</CardTitle>
          <CardDescription>Cumulative growth over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              desktop: {
                label: "Desktop",
                color: "hsl(var(--chart-1))",
              },
              mobile: {
                label: "Mobile",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <AreaChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="desktop" stroke="hsl(var(--chart-1))" fillOpacity={0.3} fill="hsl(var(--chart-1))" />
              <Area type="monotone" dataKey="mobile" stroke="hsl(var(--chart-2))" fillOpacity={0.3} fill="hsl(var(--chart-2))" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pyramid Chart</CardTitle>
          <CardDescription>Desktop vs Mobile Usage</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
              mobile:  { label: "Mobile",  color: "hsl(var(--chart-2))" },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip content={<ChartTooltipContent />} />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive
                  orient="horizontal"
                >
                  <LabelList
                    position="right"
                    dataKey="name"
                    fill="hsl(var(--primary-foreground))"
                    stroke="none"
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stock Price Candlestick</CardTitle>
          <CardDescription>Sample Apple Inc. (AAPL) January 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px]" config={{
              mobile:  { label: "Mobile",  color: "hsl(var(--chart-1))" },
            }}>
            <ChartCanvas
              ratio={1}
              height={300}
              width={600}
              margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
              data={data}
              seriesName="AAPL"
              xScale={xScale}
              xAccessor={xAccessor}
              displayXAccessor={displayXAccessor}
            >
              <Chart id={1} yExtents={d => [d.high, d.low]}> 
                <FinancialXAxis
                  axisAt="bottom"
                  orient="bottom"
                  tickFormat={timeFormat("%b %d")}
                  ticks={5}
                />
                <FinancialYAxis
                  axisAt="left"
                  orient="left"
                  tickFormat={format(".2f")}
                  ticks={5}
                />
                <MouseCoordinateX
                  at="bottom"
                  orient="bottom"
                  displayFormat={timeFormat("%Y-%m-%d")}
                />
                <MouseCoordinateY
                  at="left"
                  orient="left"
                  displayFormat={format(".2f")}
                />
                <CandlestickSeries />
                <EdgeIndicator
                  itemType="last"
                  orient="right"
                  edgeAt="right"
                  yAccessor={d => d.close}
                  fill={d => (d.close > d.open ? "#26a69a" : "#ef5350")}
                />
              </Chart>
              <CrossHairCursor />
            </ChartCanvas>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
