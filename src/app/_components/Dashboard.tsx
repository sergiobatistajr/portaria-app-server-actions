"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
export default function DashboardClient({
  data,
}: {
  data: { month: string; total: number }[];
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
      className="container mx-auto"
    >
      <BarChart data={data}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `Visitantes ${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
