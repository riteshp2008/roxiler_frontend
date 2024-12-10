"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SharedFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  month: string;
  search: string;
}

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export default function SharedFilter({ onFilterChange }: SharedFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    month: "03", // Default to March
    search: "",
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Select
        value={filters.month}
        onValueChange={(value) => handleFilterChange("month", value)}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="text"
        placeholder="Search transactions"
        value={filters.search}
        onChange={(e) => handleFilterChange("search", e.target.value)}
        className="w-full sm:w-[200px]"
      />
      {/* <Select
        value={filters.priceRange}
        onValueChange={(value) => handleFilterChange('priceRange', value)}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select price range" />
        </SelectTrigger>
        <SelectContent>
          {priceRanges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
      <Button
        onClick={() => onFilterChange(filters)}
        className="w-full sm:w-auto"
      >
        Apply Filters
      </Button>
    </div>
  );
}
