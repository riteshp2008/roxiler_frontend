import { NextResponse } from 'next/server'

// This is a mock implementation. Replace with your actual database queries.
const mockTransactions = [
  { id: '1', title: 'Transaction 1', description: 'Description 1', price: 50, date: '2023-03-15' },
  { id: '2', title: 'Transaction 2', description: 'Description 2', price: 150, date: '2023-03-20' },
  { id: '3', title: 'Transaction 3', description: 'Description 3', price: 75, date: '2023-04-10' },
  { id: '4', title: 'Transaction 4', description: 'Description 4', price: 200, date: '2023-04-15' },
  { id: '5', title: 'Transaction 5', description: 'Description 5', price: 300, date: '2023-05-05' },
  // Add more mock transactions here...
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const month = searchParams.get('month')
  const search = searchParams.get('search')
  const priceRange = searchParams.get('priceRange')
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = 10

  let filteredTransactions = mockTransactions

  if (month && month !== 'all') {
    filteredTransactions = filteredTransactions.filter(
      (t) => new Date(t.date).getMonth() + 1 === parseInt(month, 10)
    )
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredTransactions = filteredTransactions.filter(
      (t) =>
        t.title.toLowerCase().includes(searchLower) ||
        t.description.toLowerCase().includes(searchLower) ||
        t.price.toString().includes(searchLower)
    )
  }

  if (priceRange && priceRange !== 'all') {
    const [min, max] = priceRange.split('-').map(Number)
    filteredTransactions = filteredTransactions.filter(
      (t) => t.price >= min && (max ? t.price <= max : true)
    )
  }

  const totalPages = Math.ceil(filteredTransactions.length / pageSize)
  const paginatedTransactions = filteredTransactions.slice((page - 1) * pageSize, page * pageSize)

  return NextResponse.json({
    transactions: paginatedTransactions,
    totalPages,
  })
}

