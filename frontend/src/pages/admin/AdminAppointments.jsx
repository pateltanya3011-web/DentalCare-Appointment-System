import { useState, useEffect } from 'react';
import api from '../../api';
import '../Dashboard.css';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetch = async () => {
    try {
      const { data } = await api.get('/admin/appointments');
      setAppointments(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/appointments/${id}`, { status });
      fetch();
    } catch (err) { alert('Update failed'); }
  };

  const filtered = filter === 'all' ? appointments : appointments.filter(a => a.status === filter);

  if (loading) return <div className="spinner" />;

  return (
    <div>
      <div className="page-header">
        <h2>All Appointments</h2>
        <p>Manage and update status of all patient appointments.</p>
      </div>

      <div className="filter-bar card" style={{ padding: '14px 20px', marginBottom: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
          <button key={f} className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-muted)', alignSelf: 'center' }}>
          {filtered.length} record{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="card empty-state">
          <div className="empty-icon">📋</div>
          <h3>No appointments found</h3>
          <p>No appointments match the selected filter.</p>
        </div>
      ) : (
        <div className="card table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((appt, i) => (
                <tr key={appt._id}>
                  <td>{i + 1}</td>
                  <td>
                    <strong>{appt.patientName}</strong><br />
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{appt.patientEmail}</span>
                  </td>
                  <td>{appt.service}</td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td><span className={`badge badge-${appt.status}`}>{appt.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {appt.status !== 'confirmed' && (
                        <button className="btn btn-success btn-sm" onClick={() => updateStatus(appt._id, 'confirmed')}>
                          Confirm
                        </button>
                      )}
                      {appt.status !== 'cancelled' && (
                        <button className="btn btn-danger btn-sm" onClick={() => updateStatus(appt._id, 'cancelled')}>
                          Cancel
                        </button>
                      )}
                    </div>
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
