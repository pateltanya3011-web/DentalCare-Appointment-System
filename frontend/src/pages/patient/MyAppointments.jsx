import { useState, useEffect } from 'react';
import api from '../../api';
import '../Dashboard.css';
import './Patient.css';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const { data } = await api.get('/appointments/my');
      setAppointments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleCancel = async (id) => {
    if (!confirm('Cancel this appointment?')) return;
    try {
      await api.patch(`/appointments/${id}/cancel`);
      fetchAppointments();
    } catch (err) {
      alert('Failed to cancel');
    }
  };

  if (loading) return <div className="spinner" />;

  return (
    <div>
      <div className="page-header">
        <h2>My Appointments</h2>
        <p>Track all your dental appointments and their status.</p>
      </div>

      {appointments.length === 0 ? (
        <div className="card empty-state">
          <div className="empty-icon">📋</div>
          <h3>No appointments yet</h3>
          <p>Book your first dental appointment to get started.</p>
        </div>
      ) : (
        <div className="card table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, i) => (
                <tr key={appt._id}>
                  <td>{i + 1}</td>
                  <td><strong>{appt.service}</strong></td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td><span className={`badge badge-${appt.status}`}>{appt.status}</span></td>
                  <td>
                    {appt.status === 'pending' && (
                      <button className="btn btn-danger btn-sm" onClick={() => handleCancel(appt._id)}>
                        Cancel
                      </button>
                    )}
                    {appt.status !== 'pending' && <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
