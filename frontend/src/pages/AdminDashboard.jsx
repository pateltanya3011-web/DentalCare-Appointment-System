import { useState } from 'react';
import Navbar from '../components/Navbar';
import AdminStats from './admin/AdminStats';
import AdminAppointments from './admin/AdminAppointments';
import AdminPatients from './admin/AdminPatients';
import './Dashboard.css';

const TABS = [
  { id: 'stats', label: 'Dashboard', icon: '📊' },
  { id: 'appointments', label: 'Appointments', icon: '📅' },
  { id: 'patients', label: 'Patients', icon: '👥' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('stats');

  const renderTab = () => {
    switch (activeTab) {
      case 'stats': return <AdminStats />;
      case 'appointments': return <AdminAppointments />;
      case 'patients': return <AdminPatients />;
      default: return null;
    }
  };

  return (
    <div className="dashboard">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tabs={TABS} />
      <main className="dashboard-main">
        {renderTab()}
      </main>
    </div>
  );
}
