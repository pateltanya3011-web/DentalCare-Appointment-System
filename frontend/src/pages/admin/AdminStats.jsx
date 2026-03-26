import { useState, useEffect } from 'react';
import api from '../../api';
import '../Dashboard.css';

export default function AdminStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/stats').then(r => setStats(r.data)).catch(console.error);
  }, []);

  if (!stats) return <div className="spinner" />;

  const cards = [
    { icon: '👥', label: 'Total Patients', value: stats.totalPatients, color: 'blue' },
    { icon: '📅', label: 'Total Appointments', value: stats.totalAppointments, color: 'green' },
    { icon: '⏳', label: 'Pending', value: stats.pending, color: 'yellow' },
    { icon: '✅', label: 'Confirmed', value: stats.confirmed, color: 'green' },
    { icon: '❌', label: 'Cancelled', value: stats.cancelled, color: 'red' },
  ];

  return (
    <div>
      <div className="page-header">
        <h2>Admin Dashboard</h2>
        <p>Overview of all clinic activity.</p>
      </div>

      <div className="stats-grid">
        {cards.map((c, i) => (
          <div key={i} className="stat-card card">
            <div className={`stat-icon ${c.color}`}>{c.icon}</div>
            <div className="stat-info">
              <h3>{c.value}</h3>
              <p>{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ marginBottom: 8 }}>👋 Welcome, Admin</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
          Use the navigation tabs to manage appointments and view registered patients.
          You can confirm or cancel any appointment from the Appointments tab.
        </p>
      </div>
    </div>
  );
}
