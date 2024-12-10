"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatisticsData {
  totalSales: number;
  totalSoldItems: number;
  totalUnsoldItems: number;
}

interface TransactionStatisticsProps {
  filters: {
    month: string;
    search: string;
    priceRange: string;
  };
}

export default function TransactionStatistics({
  filters,
}: TransactionStatisticsProps) {
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/product/statistics?${new URLSearchParams(
            filters
          )}`,
          { method: "GET" }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const data: StatisticsData = await response.json();
        setStatistics(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, [filters]);

  if (isLoading) {
    return <div>Loading statistics...</div>;
  }

  if (!statistics) {
    return <div>Failed to load statistics</div>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${statistics.totalSales.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sold Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalSold}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unsold Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalNotSold}</div>
        </CardContent>
      </Card>
    </>
  );
}
