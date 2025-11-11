"use client";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { OrderChartType } from "@repo/types";
import { use } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  total: {
    label: "Total",
    color: "var(--chart-1)",
  },
  successful: {
    label: "Successful",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const AppBarChart = ({dataPromise} : {dataPromise : Promise<OrderChartType[]>}) => {
  const chartData = use(dataPromise);
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-semibold">Total Revenue</h1>
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] w-full"
      >
        <BarChart data={chartData} accessibilityLayer>
          <CartesianGrid vertical={false}></CartesianGrid>
          <XAxis
            dataKey="month"
            tickLine={true}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis  tickLine={false} axisLine={false}/>
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey={"total"} fill="var(--color-total)" radius={4}></Bar>
          <Bar dataKey={"successful"} fill="var(--color-successful)" radius={4}></Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default AppBarChart;
