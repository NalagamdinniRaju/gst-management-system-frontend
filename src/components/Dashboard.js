

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/main.css'

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('https://gst-management-system-backend.onrender.com/api/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      }
    };

    fetchDashboardData();
  }, []);

  if (error) return <div className="error">{error}</div>;
  if (!dashboardData) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <h2>GST Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total GST Collected</h3>
          <p>₹{dashboardData.totalGSTCollected.toFixed(2)}</p>
        </div>
        <div className="dashboard-card">
          <h3>Pending Payments</h3>
          <p>{dashboardData.pendingPayments}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Invoices</h3>
          <p>{dashboardData.totalInvoices}</p>
        </div>
        <div className="dashboard-card">
          <h3>Monthly GST Average</h3>
          <p>₹{dashboardData.monthlyGSTAverage.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
