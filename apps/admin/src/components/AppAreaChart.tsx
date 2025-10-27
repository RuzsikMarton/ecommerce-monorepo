"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const AppAreaChart = () => {
  return (
    <div>
      <h1 className="text-lg font-semibold">Total Visitors</h1>
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] w-full mt-4"
      >
        <AreaChart data={chartData} accessibilityLayer>
          <CartesianGrid vertical={false}></CartesianGrid>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <YAxis tickLine={false} axisLine={false} />
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey={"desktop"}
            type={"natural"}
            fillOpacity={0.4}
            fill="url(#fillDesktop)"
            stroke="var(--color-desktop)"
            stackId={"a"}
          ></Area>
          <Area
            dataKey={"mobile"}
            type={"natural"}
            fillOpacity={0.4}
            fill="url(#fillMobile)"
            stroke="var(--color-mobile)"
            stackId={"a"}
          ></Area>
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default AppAreaChart;
