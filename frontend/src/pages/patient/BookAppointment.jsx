import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api';
import './Patient.css';

const SERVICES = [
  'General Checkup',
  'Teeth Whitening',
  'Cavity Filling',
  'Dental Crown',
  'Braces / Aligners',
  'Dental Implant',
  'Root Canal',
  'Tooth Extraction',
];

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM',
];

export default function BookAppointment({ setActiveTab }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    service: '', date: '', time: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Min date = today
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      await api.post('/appointments', { ...form, email: user.email });
      setSuccess('Appointment booked successfully! We will confirm shortly.');
      setForm({ service: '', date: '', time: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-wrap">
      <div className="page-header">
        <h2>Book an Appointment</h2>
        <p>Fill in the details below to schedule your dental visit.</p>
      </div>

      <div className="book-card card">
        {success && (
          <div className="alert alert-success">
            ✅ {success}
            <button className="btn btn-primary btn-sm" style={{ marginLeft: 16 }} onClick={() => setActiveTab('appointments')}>
              View Appointments
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row-2">
            <div className="form-group">
              <label>Patient Name</label>
              <input type="text" value={user?.name} disabled style={{ background: '#f1f5f9' }} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" value={user?.email} disabled style={{ background: '#f1f5f9' }} />
            </div>
          </div>

          <div className="form-group">
            <label>Select Service</label>
            <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} required>
              <option value="">-- Choose a service --</option>
              {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Preferred Date</label>
              <input type="date" min={today} value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Preferred Time</label>
              <select value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} required>
                <option value="">-- Select time --</option>
                {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Additional Message (optional)</label>
            <textarea rows={3} placeholder="Describe your symptoms or any notes for the doctor..."
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }} disabled={loading}>
            {loading ? 'Booking...' : '📅 Confirm Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
}
