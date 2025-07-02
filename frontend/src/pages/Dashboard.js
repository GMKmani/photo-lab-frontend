import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [filteredChartData, setFilteredChartData] = useState(null);
  const [filter, setFilter] = useState('daily');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`https://photo-lab.onrender.com/api/orders/summary/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      setSummary(res.data);
    }).catch(err => console.error(err));
  }, [userId, token]);

  useEffect(() => {
    const fetchFilteredData = async () => {
      const today = new Date();
      let fromDate, toDate;

      if (filter === 'daily') {
        fromDate = new Date(today.setHours(0, 0, 0, 0));
        toDate = new Date(today.setHours(23, 59, 59, 999));
      } else if (filter === 'weekly') {
        fromDate = new Date(today.setDate(today.getDate() - 7)); 
        fromDate.setHours(0, 0, 0, 0); 
        toDate = new Date();
        } else if (filter === 'monthly') {
        fromDate = new Date(today.setDate(today.getDate() - 30)); // Last 30 days
        fromDate.setHours(0, 0, 0, 0); 
        toDate = new Date();      }

      try {
        const res = await axios.get(`https://photo-lab.onrender.com/api/orders/summaryByDate/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            fromDate: fromDate.toISOString(),
            toDate: toDate.toISOString(),
          },
        });
        setFilteredChartData(res.data.chartData);
      } catch (err) {
        console.error('Error fetching filtered data:', err);
      }
    };

    fetchFilteredData();
  }, [filter]);

  if (!summary || !filteredChartData) {
    return <p>Loading summary...</p>;
  }

  const pieData = {
    labels: ['Total Orders', 'Total Income', 'Photo Frames', 'Photos', 'Albums', 'One Side Printing'],
    datasets: [
      {
        data: [
          summary.totalOrders,
          summary.totalIncome,
          summary.chartData.datasets[0].data[0],
          summary.chartData.datasets[0].data[1],
          summary.chartData.datasets[0].data[2],
          summary.chartData.datasets[0].data[3],
        ],
        backgroundColor: ['#ff7c43', '#003f5c', '#bc5090', '#ff6361', '#ffa600', '#f95d6a'],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded shadow text-white">
          Total Orders: {summary.totalOrders}
        </div>
        <div className="bg-gray-800 p-4 rounded shadow text-white">
          Total Income: ₹{summary.totalIncome}
        </div>
      </div>
      
      <div style={{
  display: "flex",
  flexWrap: "wrap", 
  width: "100%",
  gap: "30px",
  margin: "auto",
  justifyContent: "center", 
}}>
  {summary.totalOrders > 0 || (filteredChartData && filteredChartData.datasets[0].data.some((value) => value > 0)) ? (
    <>
      <div className="mt-6" style={{
        width: "100%", 
        maxWidth: "400px", 
        height: "400px",
        flex: "1 1 300px", 
      }}>
        <h2 className="text-xl font-bold mb-5">Orders Breakdown</h2>
        <div className="bg-gray-800 p-6 rounded shadow">
          <Pie data={pieData} />
        </div>
      </div>

      <div className="mt-6" style={{
        width: "100%", 
        maxWidth: "400px", 
        height: "400px",
        flex: "1 1 300px",
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center", 
        }}>
          <h2 className="text-xl font-bold mb-4">Filtered Orders Breakdown</h2>
          <div className="mb-4">
            <label htmlFor="filter" className="text-white mr-2">Filter:</label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded shadow">
          <Pie data={filteredChartData} />
        </div>
      </div>
    </>
  ) : (
    <div style={{display: "flex",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      height: "418px"}}>

    <p className="text-white text-center">No data available</p>
    </div>
  )}
</div>
    </div>
  );
};

export default Dashboard;