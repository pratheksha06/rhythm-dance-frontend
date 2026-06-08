import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({ totalUsers: 0, totalClasses: 0 });
  const [classForm, setClassForm] = useState({
    className: '',
    danceStyle: '',
    schedule: '',
    capacity: '',
    instructor: '' // State tracking key perfectly matching your schema
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch metrics when dashboard boots up
  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        const usersRes = await axios.get('https://rhythm-dance-backend.onrender.com/api/users');
        const classesRes = await axios.get('https://rhythm-dance-backend.onrender.com/api/classes');
        setMetrics({
          totalUsers: usersRes.data.length,
          totalClasses: classesRes.data.length
        });
      } catch (err) {
        console.error("Error fetching admin metrics:", err);
      }
    };
    fetchDashboardMetrics();
  }, [message]); 

  const handleInputChange = (e) => {
    setClassForm({ ...classForm, [e.target.name]: e.target.value });
  };

  const handleCreateClass = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://rhythm-dance-backend.onrender.com/api/classes', classForm);
      if (response.status === 201) {
        setMessage("🎉 New dance session successfully configured and published live!");
        // Fixed: Reset instructor state back to empty string upon successful post
        setClassForm({ className: '', danceStyle: '', schedule: '', capacity: '', instructor: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create studio session asset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <style>{hoverStyles}</style>

      {/* Header banner */}
      <div style={styles.header}>
        <h2 style={styles.title}>Studio <span style={{ color: '#ff3c78' }}>Management Center</span></h2>
        <p style={styles.subtitle}>Administrative workspace for real-time tracking configurations</p>
      </div>

      {/* Analytics Counter Row */}
      <div style={styles.metricsRow}>
        <div style={styles.metricCard}>
          <h4 style={styles.metricLabel}>Total Registered Profiles</h4>
          <p style={styles.metricNum}>{metrics.totalUsers}</p>
        </div>
        <div style={styles.metricCard}>
          <h4 style={styles.metricLabel}>Active Dance Classes</h4>
          <p style={{...styles.metricNum, color: '#ff3c78'}}>{metrics.totalClasses}</p>
        </div>
      </div>

      {/* Management Form Block */}
      <div style={styles.dashboardGrid}>
        <div style={styles.formPanel}>
          <h3 style={styles.panelTitle}>Publish a New Class Session</h3>
          
          {message && <div style={styles.successAlert}>{message}</div>}
          {error && <div style={styles.errorAlert}>{error}</div>}

          <form onSubmit={handleCreateClass} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Class Identifier Name *</label>
              <input type="text" name="className" placeholder="e.g., Beginners Hip-Hop Core" value={classForm.className} onChange={handleInputChange} style={styles.formInput} required />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Dance Style / Discipline *</label>
              <input type="text" name="danceStyle" placeholder="e.g., Hip-Hop, Salsa, Ballet" value={classForm.danceStyle} onChange={handleInputChange} style={styles.formInput} required />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Batch Schedule Slots *</label>
              <input type="text" name="schedule" placeholder="e.g., Mon/Wed 6:00 PM" value={classForm.schedule} onChange={handleInputChange} style={styles.formInput} required />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Max Studio Capacity *</label>
              <input type="number" name="capacity" placeholder="e.g., 25" value={classForm.capacity} onChange={handleInputChange} style={styles.formInput} required />
            </div>

            {/* Cleaned & integrated Instructor Input field group */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Assign Instructor *</label>
              <input 
                type="text"
                name="instructor"
                placeholder="e.g., Instructor Sarah"
                value={classForm.instructor}
                onChange={handleInputChange}
                style={styles.formInput}
                required 
              />
            </div>

            <button type="submit" disabled={loading} className="admin-submit-btn" style={styles.formSubmitBtn}>
              {loading ? 'Publishing Asset...' : 'Launch Class Session'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const hoverStyles = `
  .admin-submit-btn:hover { background-color: #ff1d60 !important; transform: scale(1.02); cursor: pointer; }
`;

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0a0a0a', color: 'white', padding: '140px 8% 60px 8%', fontFamily: "'Poppins', sans-serif", boxSizing: 'border-box' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: { fontSize: '46px', fontWeight: '700', margin: '0 0 10px 0' },
  subtitle: { fontSize: '18px', color: '#aaa' },
  metricsRow: { display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '50px' },
  metricCard: { backgroundColor: '#141414', border: '1px solid #222', borderRadius: '15px', padding: '30px', width: '280px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' },
  metricLabel: { color: '#aaa', margin: '0 0 10px 0', fontSize: '13px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' },
  metricNum: { fontSize: '42px', fontWeight: '700', margin: '0', color: 'white' },
  dashboardGrid: { display: 'flex', justifyContent: 'center' },
  formPanel: { backgroundColor: '#141414', border: '1px solid #222', padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '550px', boxShadow: '0 4px 30px rgba(0,0,0,0.4)' },
  panelTitle: { color: 'white', fontSize: '22px', fontWeight: '600', margin: '0 0 25px 0', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { color: '#ccc', fontSize: '14px', fontWeight: '400' },
  formInput: { background: '#202020', border: '1px solid #333', padding: '15px', borderRadius: '10px', color: 'white', fontSize: '15px', fontFamily: "'Poppins', sans-serif", outline: 'none', boxSizing: 'border-box', width: '100%' },
  formSubmitBtn: { background: '#ff3c78', color: 'white', border: 'none', padding: '15px', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: '0.3s', marginTop: '10px' },
  successAlert: { backgroundColor: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71', padding: '12px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #2ecc71', fontSize: '14px', textAlign: 'center' },
  errorAlert: { backgroundColor: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', padding: '12px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #e74c3c', fontSize: '14px', textAlign: 'center' }
};