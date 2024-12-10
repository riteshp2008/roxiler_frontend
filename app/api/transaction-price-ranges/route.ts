import { NextResponse } from 'next/server'

// This is a mock implementation. Replace with your actual database queries.
const mockTransactions = [
  { id: '1', price: 50, date: '2023-03-15' },
  { id: '2', price: 150, date: '2023-03-20' },
  { id: '3', price: 75, date: '2023-04-10' },
  { id: '4', price: 200, date: '2023-04-15' },
  { id: '5', price: 300, date: '2023-05-05' },
  // Add more mock transactions here...
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const month = searchParams.get('month')
  const search = searchParams.get('search')
  const priceRange = searchParams.get('priceRange')

  let filteredTransactions = mockTransactions

  if (month && month !== 'all') {
    filteredTransactions = filteredTransactions.filter(
      (t) => new Date(t.date).getMonth() + 1 === parseInt(month, 10)
    )
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredTransactions = filteredTransactions.filter(
      (t) => t.price.toString().includes(searchLower)
    )
  }

  if (priceRange && priceRange !== 'all') {
    const [min, max] = priceRange.split('-').map(Number)
    filteredTransactions = filteredTransactions.filter(
      (t) => t.price >= min && (max ? t.price <= max : true)
    )
  }

  const priceRanges = [
    { min: 0, max: 50, label: '$0 - $50' },
    { min: 51, max: 100, label: '$51 - $100' },
    { min: 101, max: 200, label: '$101 - $200' },
    { min: 201, max: Infinity, label: '$201+' },
  ]

  const data = priceRanges.map((range) => ({
    range: range.label,
    count: filteredTransactions.filter((t) => t.price >= range.min && t.price <= range.max).length,
  }))

  return NextResponse.json(data)
}

