import { Input } from "@/components/ui/input"

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <Input
      type="text"
      placeholder="Search transactions"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full sm:w-[300px]"
    />
  )
}

