import { useState, useEffect } from "react";

interface Transaction {
  id: string;
  title: string;
  description: string;
  price: number;
  date: string;
}

interface TransactionsResponse {
  transactions: Transaction[];
  totalPages: number;
}

interface FilterState {
  month: string;
  search: string;
  priceRange: string;
}

export function useTransactions(filters: FilterState, page: number) {
  const [data, setData] = useState<TransactionsResponse>({
    transactions: [],
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          ...filters,
          page: page.toString(),
        });
        const response = await fetch(
          `http://localhost:8000/product/transactions?${queryParams}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const result: TransactionsResponse = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [filters, page]);

  return { ...data, isLoading };
}
