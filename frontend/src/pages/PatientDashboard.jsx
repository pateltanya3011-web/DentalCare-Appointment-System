import { useState } from 'react';
import Navbar from '../components/Navbar';
import Services from './patient/Services';
import BookAppointment from './patient/BookAppointment';
import MyAppointments from './patient/MyAppointments';
import './Dashboard.css';

const TABS = [
  { id: 'services', label: 'Our Services', icon: '🏥' },
  { id: 'book', label: 'Book Appointment', icon: '📅' },
  { id: 'appointments', label: 'My Appointments', icon: '📋' },
];

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('services');

  const renderTab = () => {
    switch (activeTab) {
      case 'services': return <Services setActiveTab={setActiveTab} />;
      case 'book': return <BookAppointment setActiveTab={setActiveTab} />;
      case 'appointments': return <MyAppointments />;
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
