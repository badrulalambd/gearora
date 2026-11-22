"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IMonthlyStat } from "@/type/type"

interface MonthlyChartProps {
  title: string
  description: string
  data: IMonthlyStat[]
  /** currency renders the values as money (owner earnings). */
  format?: "count" | "currency"
}

//Bar chart of the last 6 months — shared by all three dashboards.
const MonthlyChart = ({
  title,
  description,
  data,
  format = "count",
}: MonthlyChartProps) => {
  const isCurrency = format === "currency"

  const formatValue = (value: number) =>
    isCurrency ? `$${value.toLocaleString()}` : value.toLocaleString()

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="font-(family-name:--font-space-grotesk) text-lg font-semibold">
          {title}
        </CardTitle>
        <CardDescription className="mt-1">{description}</CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
            >
              <CartesianGrid stroke="rgba(128,128,128,0.25)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "rgba(128,128,128,0.35)" }}
              />
              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                tickFormatter={
                  isCurrency ? (value: number) => `$${value}` : undefined
                }
              />
              <Tooltip
                cursor={{ fill: "rgba(244,180,0,0.1)" }}
                contentStyle={{
                  background: "#141414",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 8,
                  color: "#ffffff",
                  fontSize: 12,
                }}
                formatter={(value) => [
                  formatValue(Number(value)),
                  isCurrency ? "Earnings" : "Bookings",
                ]}
              />
              <Bar
                dataKey="value"
                fill="#F4B400"
                radius={[6, 6, 0, 0]}
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default MonthlyChart
