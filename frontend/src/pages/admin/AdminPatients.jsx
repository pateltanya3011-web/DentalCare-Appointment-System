import { useState, useEffect } from 'react';
import api from '../../api';
import '../Dashboard.css';

export default function AdminPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/patients')
      .then(r => setPatients(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" />;

  return (
    <div>
      <div className="page-header">
        <h2>Registered Patients</h2>
        <p>All patients who have signed up on DentalCare.</p>
      </div>

      {patients.length === 0 ? (
        <div className="card empty-state">
          <div className="empty-icon">👥</div>
          <h3>No patients registered yet</h3>
          <p>Patients will appear here once they sign up.</p>
        </div>
      ) : (
        <div className="card table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Registered On</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, i) => (
                <tr key={p._id}>
                  <td>{i + 1}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        color: 'white', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0
                      }}>
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                      <strong>{p.name}</strong>
                    </div>
                  </td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>{new Date(p.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
