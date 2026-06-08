import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const navigate = useNavigate();
  
  // 1. STATE INITIALIZATION WITH FORM BACKUPS
  const [formData, setFormData] = useState({
    age: '23',
    experience: 'Beginner',
    classFormat: 'Salsa', // Default fallback
    batchSchedule: 'Tue/Thu 6:00 PM',
    location: 'Downtown Hub',
    parentName: '',
    phone: '9983743542',
    address: 'prateksha126@gmail.com',
    notes: 'nil'
  });

  const [successMessage, setSuccessMessage] = useState('');

  // 2. AUTO-CATCH SELECTED DANCE SELECTION FROM THE PROGRAMS MODAL
  useEffect(() => {
    const savedClass = localStorage.getItem('selectedClass');
    if (savedClass) {
      setFormData(prev => ({ ...prev, classFormat: savedClass }));
      // Optional: clean it up so it doesn't linger forever
      localStorage.removeItem('selectedClass');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, name: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate API registration submission
    setSuccessMessage('🎉 Registration Complete! Your studio placement is secured.');
    
    setTimeout(() => {
      navigate('/home');
    }, 2500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Student <span style={{ color: '#ff3c78' }}>Registration</span></h2>
        <p style={styles.subtitle}>Fill out the parameters below to configure your studio placement tracking</p>

        {/* CLEAN SUCCESS NOTIFICATION OVERLAY */}
        {successMessage && (
          <div style={styles.successBox}>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* STUDENT AGE */}
          <div style={styles.inputGroupFull}>
            <label style={styles.label}>Student's Age *</label>
            <input 
              type="number" 
              name="age"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              style={styles.input} 
              required 
            />
          </div>

          {/* SPLIT ROW 1 */}
          <div style={styles.row}>
            <div style={styles.inputGroupHalf}>
              <label style={styles.label}>Dance Experience Level</label>
              <select 
                name="experience" 
                value={formData.experience} 
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                style={styles.select}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div style={styles.inputGroupHalf}>
              <label style={styles.label}>Preferred Class Format *</label>
              <select 
                name="classFormat" 
                value={formData.classFormat} 
                onChange={(e) => setFormData({...formData, classFormat: e.target.value})}
                style={styles.select}
              >
                <option value="Hip Hop">Hip Hop</option>
                <option value="Ballet">Ballet</option>
                <option value="Contemporary">Contemporary</option>
                <option value="Jazz">Jazz</option>
                <option value="Salsa">Salsa</option>
                <option value="K-Pop">K-Pop</option>
                <option value="Break dance">Break dance</option>
                <option value="Traditional">Traditional</option>
              </select>
            </div>
          </div>

          {/* SPLIT ROW 2 */}
          <div style={styles.row}>
            <div style={styles.inputGroupHalf}>
              <label style={styles.label}>Preferred Batch Schedule *</label>
              <select 
                name="batchSchedule" 
                value={formData.batchSchedule} 
                onChange={(e) => setFormData({...formData, batchSchedule: e.target.value})}
                style={styles.select}
              >
                <option value="Tue/Thu 6:00 PM">Tue/Thu 6:00 PM</option>
                <option value="Mon/Wed 5:00 PM">Mon/Wed 5:00 PM</option>
                <option value="Sat/Sun 10:00 AM">Sat/Sun 10:00 AM</option>
              </select>
            </div>

            <div style={styles.inputGroupHalf}>
              <label style={styles.label}>Studio Location *</label>
              <select 
                name="location" 
                value={formData.location} 
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                style={styles.select}
              >
                <option value="Downtown Hub">Downtown Hub</option>
                <option value="Westside Annex">Westside Annex</option>
              </select>
            </div>
          </div>

          {/* SPLIT ROW 3 */}
          <div style={styles.row}>
            <div style={styles.inputGroupHalf}>
              <label style={styles.label}>Parent/Guardian Name (If Under 18)</label>
              <input 
                type="text" 
                placeholder="Enter full name" 
                value={formData.parentName}
                onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                style={styles.input} 
              />
            </div>

            <div style={styles.inputGroupHalf}>
              <label style={styles.label}>Active Phone Number *</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                style={styles.input} 
                required 
              />
            </div>
          </div>

          {/* MAILING ADDRESS */}
          <div style={styles.inputGroupFull}>
            <label style={styles.label}>Complete Mailing Address</label>
            <input 
              type="text" 
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              style={styles.input} 
            />
          </div>

          {/* SPECIAL NOTES */}
          <div style={styles.inputGroupFull}>
            <label style={styles.label}>Special Objectives or Physical Notes</label>
            <textarea 
              rows="4" 
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              style={styles.textarea}
            ></textarea>
          </div>

          {/* SUBMIT BUTTON */}
          <button type="submit" style={styles.submitBtn}>
            Complete Studio Placement Registration
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { background: '#0a0a0a', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', color: 'white', fontFamily: "'Poppins', sans-serif" },
  formCard: { background: '#141414', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '700px', border: '1px solid #222', boxSizing: 'border-box' },
  title: { fontSize: '28px', fontWeight: '700', textAlign: 'center', margin: '0 0 10px 0' },
  subtitle: { fontSize: '13px', color: '#666', textAlign: 'center', marginBottom: '30px' },
  successBox: { background: 'rgba(46, 204, 113, 0.15)', color: '#2ecc71', border: '1px solid #2ecc71', padding: '15px', borderRadius: '8px', textAlign: 'center', fontSize: '14px', marginBottom: '25px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  row: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  inputGroupFull: { display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' },
  inputGroupHalf: { display: 'flex', flexDirection: 'column', gap: '8px', flex: '1', minWidth: '280px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#ddd' },
  input: { background: '#1f242e', border: '1px solid #333', borderRadius: '8px', padding: '12px 16px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box', width: '100%' },
  select: { background: '#1f242e', border: '1px solid #333', borderRadius: '8px', padding: '12px 16px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box', width: '100%', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23fff\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '14px' },
  textarea: { background: '#1f242e', border: '1px solid #333', borderRadius: '8px', padding: '12px 16px', color: 'white', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', width: '100%' },
  submitBtn: { background: '#ff3c78', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '10px', transition: 'background 0.2s' }
};