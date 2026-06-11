import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Registration() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedClass = state?.selectedClass || null;

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [formData, setFormData] = useState({
    age: '',
    experienceLevel: 'Beginner',
    preferredFormat: selectedClass?.className || '',
    preferredSchedule: selectedClass?.schedule || '',
    studioLocation: 'Downtown Hub',
    parentGuardian: '',
    phone: '',
    mailingAddress: '',
    specialObjectives: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/enrollments', {
        student: user._id || user.id,
        class: selectedClass?._id || selectedClass?.id,
        ...formData,
        age: Number(formData.age)
      });
    } catch (err) {
      console.error('Enrollment error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
      setSuccessMessage('done');
      setTimeout(() => navigate('/home'), 4000);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Student <span style={{ color: '#ff3c78' }}>Registration</span></h2>
        <p style={styles.subtitle}>Fill out the parameters below to configure your studio placement tracking</p>

        {selectedClass && (
          <div style={styles.classPreview}>
            <span style={styles.classTag}>{selectedClass.danceStyle}</span>
            <strong style={{ color: '#fff' }}>{selectedClass.className}</strong>
            <span style={styles.classMeta}>📅 {selectedClass.schedule} &nbsp;|&nbsp; 💰 ${selectedClass.fee}</span>
          </div>
        )}

        {error && <div style={styles.errorBox}>{error}</div>}

        {successMessage ? (
          <div style={styles.confirmationScreen}>
            <div style={styles.checkIcon}>✓</div>
            <h3 style={styles.confirmTitle}>Registration Confirmed!</h3>
            <p style={styles.confirmText}>Your studio placement for <strong style={{color:'#ff3c78'}}>{selectedClass?.className}</strong> has been secured.</p>
            <p style={styles.confirmSub}>Redirecting you to home...</p>
          </div>
        ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroupFull}>
            <label style={styles.label}>Student's Age *</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} style={styles.input} required />
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroupHalf}>
              <label style={styles.label}>Dance Experience Level</label>
              <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} style={styles.select}>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div style={styles.inputGroupHalf}>
              <label style={styles.label}>Preferred Class Format *</label>
              <input type="text" name="preferredFormat" value={formData.preferredFormat} onChange={handleChange} style={styles.input} required />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroupHalf}>
              <label style={styles.label}>Preferred Batch Schedule *</label>
              <input type="text" name="preferredSchedule" value={formData.preferredSchedule} onChange={handleChange} style={styles.input} required />
            </div>
            <div style={styles.inputGroupHalf}>
              <label style={styles.label}>Studio Location *</label>
              <select name="studioLocation" value={formData.studioLocation} onChange={handleChange} style={styles.select}>
                <option value="Downtown Hub">Downtown Hub</option>
                <option value="Westside Annex">Westside Annex</option>
              </select>
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroupHalf}>
              <label style={styles.label}>Parent/Guardian Name (If Under 18)</label>
              <input type="text" name="parentGuardian" placeholder="Enter full name" value={formData.parentGuardian} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.inputGroupHalf}>
              <label style={styles.label}>Active Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={styles.input} required />
            </div>
          </div>

          <div style={styles.inputGroupFull}>
            <label style={styles.label}>Complete Mailing Address</label>
            <input type="text" name="mailingAddress" value={formData.mailingAddress} onChange={handleChange} style={styles.input} />
          </div>

          <div style={styles.inputGroupFull}>
            <label style={styles.label}>Special Objectives or Physical Notes</label>
            <textarea rows="4" name="specialObjectives" value={formData.specialObjectives} onChange={handleChange} style={styles.textarea} />
          </div>

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? 'Submitting...' : 'Complete Studio Placement Registration'}
          </button>
        </form>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { background: '#0a0a0a', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', color: 'white', fontFamily: "'Poppins', sans-serif" },
  formCard: { background: '#141414', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '700px', border: '1px solid #222', boxSizing: 'border-box' },
  title: { fontSize: '28px', fontWeight: '700', textAlign: 'center', margin: '0 0 10px 0' },
  subtitle: { fontSize: '13px', color: '#666', textAlign: 'center', marginBottom: '25px' },
  classPreview: { display: 'flex', flexDirection: 'column', gap: '4px', background: '#1c1c1c', border: '1px solid #2a2a2a', borderRadius: '10px', padding: '14px 18px', marginBottom: '25px' },
  classTag: { color: '#ff3c78', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' },
  classMeta: { color: '#888', fontSize: '12px', marginTop: '4px' },
  successBox: { background: 'rgba(46, 204, 113, 0.15)', color: '#2ecc71', border: '1px solid #2ecc71', padding: '15px', borderRadius: '8px', textAlign: 'center', fontSize: '14px', marginBottom: '25px' },
  errorBox: { background: 'rgba(231, 76, 60, 0.1)', color: '#e74c3c', border: '1px solid #e74c3c', padding: '15px', borderRadius: '8px', textAlign: 'center', fontSize: '14px', marginBottom: '25px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  row: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  inputGroupFull: { display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' },
  inputGroupHalf: { display: 'flex', flexDirection: 'column', gap: '8px', flex: '1', minWidth: '280px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#ddd' },
  input: { background: '#1f242e', border: '1px solid #333', borderRadius: '8px', padding: '12px 16px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box', width: '100%' },
  select: { background: '#1f242e', border: '1px solid #333', borderRadius: '8px', padding: '12px 16px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box', width: '100%' },
  textarea: { background: '#1f242e', border: '1px solid #333', borderRadius: '8px', padding: '12px 16px', color: 'white', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', width: '100%' },
  submitBtn: { background: '#ff3c78', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' },
  confirmationScreen: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '40px 20px', textAlign: 'center' },
  checkIcon: { width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(46,204,113,0.15)', border: '2px solid #2ecc71', color: '#2ecc71', fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  confirmTitle: { fontSize: '22px', fontWeight: '700', color: '#fff', margin: 0 },
  confirmText: { color: '#ccc', fontSize: '14px', margin: 0 },
  confirmSub: { color: '#555', fontSize: '12px', margin: 0 }
};
