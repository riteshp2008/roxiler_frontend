"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PriceRangeData {
  range: string;
  count: number;
}

interface TransactionsBarChartProps {
  filters: {
    month: string;
    search: string;
  };
}

export default function TransactionsBarChart({
  filters,
}: TransactionsBarChartProps) {
  const [data, setData] = useState<PriceRangeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/product/barchart?${new URLSearchParams(
            filters
          )}`,
          { method: "GET" }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch price range data");
        }
        const result: PriceRangeData[] = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching price range data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  if (isLoading) {
    return <div>Loading chart data...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions by Price Range</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            count: {
              label: "Number of Items",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="range" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-count)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
