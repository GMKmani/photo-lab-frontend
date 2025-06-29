import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const Charts = () => {
  const [data, setData] = useState([])
  const [period, setPeriod] = useState('day')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    if (!userId) {
      return (
        <p className="text-red-500">
          User not logged in. Please log in to view charts.
        </p>
      )
    }
    async function fetchTodaysCollection() {
      setLoading(true)
      setError('')

      try {
        const today = new Date()

        const fromDate = new Date(today)
        fromDate.setHours(0, 0, 0, 0)

        const toDate = new Date(today)
        toDate.setHours(23, 59, 59, 999)

        const res = await fetch(
          `/api/orders/ordersByDate?fromDate=${fromDate.toISOString()}&toDate=${toDate.toISOString()}`
        )

        if (!res.ok) throw new Error("Failed to fetch today's orders")
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error(err)
        setError('Something went wrong while fetching today’s collection.')
      } finally {
        setLoading(false)
      }
    }

    fetchTodaysCollection()
  }, [])

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Order Summary Charts</h1>

      {/* Period selector */}
      <div className="mb-4 text-gray-700 text-center">
        <label htmlFor="period" className="mr-2 font-medium">
          Select period:
        </label>
        <select
          id="period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
        </select>
      </div>

      {/* Loading/Error state */}
      {loading && <p className="text-blue-500">Loading chart data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalOrders"
              stroke="#8884d8"
              name="Total Orders"
            />
            <Line
              type="monotone"
              dataKey="totalRevenue"
              stroke="#82ca9d"
              name="Total Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        !loading && !error && <p>No data available for selected period.</p>
      )}
    </div>
  )
}

export default Charts
