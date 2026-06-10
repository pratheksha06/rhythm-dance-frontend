import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EMPTY_CLASS_FORM = {
  className: '', danceStyle: '', programImageUrl: '',
  description: '', instructorExperience: '', schedule: '',
  capacity: '', fee: '', instructor: ''
};

const EMPTY_INSTRUCTOR_FORM = {
  name: '', email: '', password: '',
  bio: '', experienceLevel: '', danceStyle: '', imageUrl: ''
};

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({ totalUsers: 0, totalClasses: 0, totalEnrollments: 0 });
  const [enrollments, setEnrollments] = useState([]);
  const [enrollTab, setEnrollTab] = useState(false);
  const [instructorsList, setInstructorsList] = useState([]);
  const [classForm, setClassForm] = useState(EMPTY_CLASS_FORM);
  const [instructorForm, setInstructorForm] = useState(EMPTY_INSTRUCTOR_FORM);
  const [showInstructorForm, setShowInstructorForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [instLoading, setInstLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [instMessage, setInstMessage] = useState('');
  const [instError, setInstError] = useState('');

  const fetchInstructors = async () => {
    const res = await axios.get('http://localhost:5000/api/users');
    const instructors = res.data.filter(u => u.role === 'instructor');
    setInstructorsList(instructors);
    return instructors;
  };

  const refreshDashboardData = async () => {
    try {
      const [usersRes, classesRes, enrollRes] = await Promise.all([
        axios.get('http://localhost:5000/api/users'),
        axios.get('http://localhost:5000/api/classes'),
        axios.get('http://localhost:5000/api/enrollments')
      ]);
      setMetrics({ totalUsers: usersRes.data.length, totalClasses: classesRes.data.length, totalEnrollments: enrollRes.data.length });
      setInstructorsList(usersRes.data.filter(u => u.role === 'instructor'));
      setEnrollments(enrollRes.data);
    } catch (err) {
      console.error('Dashboard sync failure:', err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/enrollments/${id}/status`, { status });
      setEnrollments(prev => prev.map(e => e._id === id ? { ...e, status } : e));
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const handleDeleteEnrollment = async (id) => {
    if (!window.confirm('Delete this enrollment?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/enrollments/${id}`);
      setEnrollments(prev => prev.filter(e => e._id !== id));
      setMetrics(prev => ({ ...prev, totalEnrollments: prev.totalEnrollments - 1 }));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => { refreshDashboardData(); }, []);

  const handleClassInput = (e) =>
    setClassForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleInstructorInput = (e) =>
    setInstructorForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCreateClass = async (e) => {
    e.preventDefault();
    setMessage(''); setError(''); setLoading(true);
    try {
      const payload = {
        ...classForm,
        capacity: Number(classForm.capacity),
        fee: Number(classForm.fee)
      };
      await axios.post('http://localhost:5000/api/classes', payload);
      setMessage('🎉 Program successfully launched!');
      setClassForm(EMPTY_CLASS_FORM);
      refreshDashboardData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create dance class.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInstructor = async (e) => {
    e.preventDefault();
    setInstMessage(''); setInstError(''); setInstLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        ...instructorForm,
        role: 'instructor'
      });
      const newInstructor = res.data;
      setInstMessage(`✅ Instructor "${newInstructor.name}" registered successfully.`);
      setInstructorForm(EMPTY_INSTRUCTOR_FORM);

      // Re-fetch instructors and auto-select the new one
      const updated = await fetchInstructors();
      const match = updated.find(u => u.email === newInstructor.email || u._id === newInstructor._id);
      if (match) setClassForm(prev => ({ ...prev, instructor: match._id || match.id }));

      setShowInstructorForm(false);
    } catch (err) {
      setInstError(err.response?.data?.message || 'Failed to register instructor.');
    } finally {
      setInstLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Studio <span style={{ color: '#ff3c78' }}>Management Center</span></h2>
        <p style={styles.subtitle}>Administrative workspace for real-time tracking configurations</p>
      </div>

      <div style={styles.metricsRow}>
        <div style={styles.metricCard}>
          <h4 style={styles.metricLabel}>Total Registered Profiles</h4>
          <p style={styles.metricNum}>{metrics.totalUsers}</p>
        </div>
        <div style={styles.metricCard}>
          <h4 style={styles.metricLabel}>Active Dance Classes</h4>
          <p style={{ ...styles.metricNum, color: '#ff3c78' }}>{metrics.totalClasses}</p>
        </div>
        <div style={styles.metricCard}>
          <h4 style={styles.metricLabel}>Total Enrollments</h4>
          <p style={{ ...styles.metricNum, color: '#f39c12' }}>{metrics.totalEnrollments}</p>
        </div>
      </div>

      <div style={styles.tabRow}>
        <button onClick={() => setEnrollTab(false)} style={{ ...styles.tabBtn, ...(enrollTab ? {} : styles.tabBtnActive) }}>Publish Class</button>
        <button onClick={() => setEnrollTab(true)}  style={{ ...styles.tabBtn, ...(enrollTab ? styles.tabBtnActive : {}) }}>Enrollments {metrics.totalEnrollments > 0 && <span style={styles.badge}>{metrics.totalEnrollments}</span>}</button>
      </div>

      {enrollTab && (
        <div style={styles.enrollSection}>
          <h3 style={styles.panelTitle}>Student Enrollment Records</h3>
          {enrollments.length === 0 ? (
            <p style={{ color: '#666', textAlign: 'center', padding: '40px 0' }}>No enrollments yet.</p>
          ) : (
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {['Student','Email','Class','Schedule','Phone','Status','Actions'].map(h => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map(e => (
                    <tr key={e._id} style={styles.tr}>
                      <td style={styles.td}>{e.student?.name || '—'}</td>
                      <td style={styles.td}>{e.student?.email || '—'}</td>
                      <td style={styles.td}>{e.class?.className || '—'}</td>
                      <td style={styles.td}>{e.class?.schedule || e.preferredSchedule || '—'}</td>
                      <td style={styles.td}>{e.phone || '—'}</td>
                      <td style={styles.td}>
                        <select
                          value={e.status}
                          onChange={ev => handleStatusChange(e._id, ev.target.value)}
                          style={{ ...styles.statusSelect, borderColor: e.status === 'approved' ? '#2ecc71' : e.status === 'rejected' ? '#e74c3c' : '#f39c12' }}
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td style={styles.td}>
                        <button onClick={() => handleDeleteEnrollment(e._id)} style={styles.deleteBtn}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div style={{ ...styles.dashboardGrid, display: enrollTab ? 'none' : 'flex' }}>
        {/* ── CLASS FORM ── */}
        <div style={styles.formPanel}>
          <h3 style={styles.panelTitle}>Publish a New Dance Program</h3>

          {message && <div style={styles.successAlert}>{message}</div>}
          {error && <div style={styles.errorAlert}>{error}</div>}

          <form onSubmit={handleCreateClass} style={styles.form}>
            <Field label="Dance Program Title / Name *">
              <input type="text" name="className" placeholder="e.g., Hip Hop, Break Dance"
                value={classForm.className} onChange={handleClassInput} style={styles.formInput} required />
            </Field>

            <Field label="Short Category Tag *">
              <input type="text" name="danceStyle" placeholder="e.g., Street Styles, Popping & Locking"
                value={classForm.danceStyle} onChange={handleClassInput} style={styles.formInput} required />
            </Field>

            <Field label="Showcase Card Image URL *">
              <input type="text" name="programImageUrl" placeholder="Paste a direct image link..."
                value={classForm.programImageUrl} onChange={handleClassInput} style={styles.formInput} required />
            </Field>

            <Field label="Program Description *">
              <textarea name="description" placeholder="Type the program overview details..."
                value={classForm.description} onChange={handleClassInput}
                style={{ ...styles.formInput, height: '70px', resize: 'vertical' }} required />
            </Field>

            <Field label="Instructor Experience Label *">
              <input type="text" name="instructorExperience" placeholder="e.g., Experience: 12+ Years"
                value={classForm.instructorExperience} onChange={handleClassInput} style={styles.formInput} required />
            </Field>

            <Field label="Schedule *">
              <input type="text" name="schedule" placeholder="e.g., Monday/Wednesday 6:00PM"
                value={classForm.schedule} onChange={handleClassInput} style={styles.formInput} required />
            </Field>

            <div style={styles.twoCol}>
              <Field label="Max Capacity *">
                <input type="number" name="capacity" placeholder="e.g., 24"
                  value={classForm.capacity} onChange={handleClassInput} style={styles.formInput} required />
              </Field>
              <Field label="Fee ($) *">
                <input type="number" name="fee" placeholder="e.g., 80"
                  value={classForm.fee} onChange={handleClassInput} style={styles.formInput} required />
              </Field>
            </div>

            <Field label="Assign Instructor Profile *">
              <select name="instructor" value={classForm.instructor} onChange={handleClassInput}
                style={styles.formInput} required>
                <option value="">-- Choose Instructor Profile --</option>
                {instructorsList.map((inst) => (
                  <option key={inst._id || inst.id} value={inst._id || inst.id}>
                    {inst.name || inst.email}
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => setShowInstructorForm(v => !v)} style={styles.toggleBtn}>
                {showInstructorForm ? '✕ Cancel New Instructor' : '+ Register New Instructor'}
              </button>
            </Field>

            <button type="submit" disabled={loading} style={styles.formSubmitBtn}>
              {loading ? 'Publishing...' : 'Launch Class Session'}
            </button>
          </form>
        </div>

        {/* ── INSTRUCTOR CREATION PANEL ── */}
        {showInstructorForm && (
          <div style={{ ...styles.formPanel, borderColor: '#ff3c78' }}>
            <h3 style={styles.panelTitle}>Register New <span style={{ color: '#ff3c78' }}>Instructor</span></h3>

            {instMessage && <div style={styles.successAlert}>{instMessage}</div>}
            {instError && <div style={styles.errorAlert}>{instError}</div>}

            <form onSubmit={handleCreateInstructor} style={styles.form}>
              <Field label="Full Name *">
                <input type="text" name="name" placeholder="e.g., Jordan Rivers"
                  value={instructorForm.name} onChange={handleInstructorInput} style={styles.formInput} required />
              </Field>
              <Field label="Email Address *">
                <input type="email" name="email" placeholder="instructor@studio.com"
                  value={instructorForm.email} onChange={handleInstructorInput} style={styles.formInput} required />
              </Field>
              <Field label="Password *">
                <input type="password" name="password" placeholder="Set a secure password"
                  value={instructorForm.password} onChange={handleInstructorInput} style={styles.formInput} required />
              </Field>
              <Field label="Bio / Residency History">
                <textarea name="bio" placeholder="Brief performance or residency background..."
                  value={instructorForm.bio} onChange={handleInstructorInput}
                  style={{ ...styles.formInput, height: '70px', resize: 'vertical' }} />
              </Field>
              <Field label="Dance Style Specialty *">
                <input type="text" name="danceStyle" placeholder="e.g., Hip Hop & Street Styles, Classical Ballet"
                  value={instructorForm.danceStyle} onChange={handleInstructorInput} style={styles.formInput} required />
              </Field>
              <Field label="Profile Picture URL">
                <input type="text" name="imageUrl" placeholder="Paste a direct image link..."
                  value={instructorForm.imageUrl} onChange={handleInstructorInput} style={styles.formInput} />
              </Field>
              <Field label="Experience Level *">
                <select name="experienceLevel" value={instructorForm.experienceLevel}
                  onChange={handleInstructorInput} style={styles.formInput} required>
                  <option value="">-- Select Level --</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </Field>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Role</label>
                <input value="instructor" readOnly style={{ ...styles.formInput, opacity: 0.5, cursor: 'not-allowed' }} />
              </div>
              <button type="submit" disabled={instLoading} style={styles.formSubmitBtn}>
                {instLoading ? 'Registering...' : 'Create Instructor Profile'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Minimal wrapper to reduce JSX repetition
function Field({ label, children }) {
  return (
    <div style={styles.inputGroup}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0a0a0a', color: 'white', padding: '120px 5% 60px 5%', fontFamily: "'Poppins', sans-serif", boxSizing: 'border-box' },
  header: { textAlign: 'center', marginBottom: '30px' },
  title: { fontSize: '36px', fontWeight: '700', margin: '0 0 10px 0' },
  subtitle: { fontSize: '15px', color: '#aaa' },
  metricsRow: { display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' },
  metricCard: { backgroundColor: '#141414', border: '1px solid #222', borderRadius: '12px', padding: '20px', width: '240px', textAlign: 'center' },
  metricLabel: { color: '#aaa', margin: '0 0 10px 0', fontSize: '11px', fontWeight: '500', textTransform: 'uppercase' },
  metricNum: { fontSize: '32px', fontWeight: '700', margin: '0' },
  dashboardGrid: { display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'flex-start' },
  tabRow: { display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px' },
  tabBtn: { background: '#1a1a1a', border: '1px solid #333', color: '#aaa', padding: '10px 28px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' },
  tabBtnActive: { background: '#ff3c78', border: '1px solid #ff3c78', color: '#fff' },
  badge: { background: '#fff', color: '#ff3c78', borderRadius: '10px', padding: '1px 7px', fontSize: '11px', fontWeight: '700', marginLeft: '6px' },
  enrollSection: { backgroundColor: '#141414', border: '1px solid #222', borderRadius: '15px', padding: '30px', marginBottom: '30px' },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
  th: { color: '#888', fontWeight: '600', textTransform: 'uppercase', fontSize: '11px', padding: '10px 14px', borderBottom: '1px solid #2a2a2a', textAlign: 'left', whiteSpace: 'nowrap' },
  tr: { borderBottom: '1px solid #1e1e1e' },
  td: { padding: '12px 14px', color: '#ddd', verticalAlign: 'middle', whiteSpace: 'nowrap' },
  statusSelect: { background: '#1a1a1a', border: '1px solid', color: 'white', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', outline: 'none', cursor: 'pointer' },
  deleteBtn: { background: 'rgba(231,76,60,0.15)', color: '#e74c3c', border: '1px solid #e74c3c', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' },
  formPanel: { backgroundColor: '#141414', border: '1px solid #222', padding: '30px', borderRadius: '15px', width: '100%', maxWidth: '500px' },
  panelTitle: { fontSize: '20px', fontWeight: '600', margin: '0 0 20px 0', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  label: { color: '#ccc', fontSize: '12px' },
  formInput: { background: '#1a1a1a', border: '1px solid #333', padding: '12px', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  formSubmitBtn: { background: '#ff3c78', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' },
  toggleBtn: { marginTop: '8px', background: 'transparent', border: '1px dashed #ff3c78', color: '#ff3c78', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', width: '100%' },
  successAlert: { backgroundColor: 'rgba(46, 204, 113, 0.1)', color: '#2ecc71', padding: '10px', borderRadius: '6px', border: '1px solid #2ecc71', fontSize: '13px', textAlign: 'center' },
  errorAlert: { backgroundColor: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', padding: '10px', borderRadius: '6px', border: '1px solid #e74c3c', fontSize: '13px', textAlign: 'center' }
};
