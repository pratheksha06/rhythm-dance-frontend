import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TermsConditions() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>
        <h1 style={styles.title}>Terms & Conditions</h1>
        <p style={styles.subtitle}>Last updated: June 2026</p>
        <hr style={styles.divider} />
        <div style={styles.body}>
          <div style={styles.paragraphBlock}>
            <span style={styles.bulletNumber}>01</span>
            <p style={styles.text}>By accessing and enrolling at Rhythm Performing Arts Academy, you agree to comply with and be bound by our studio rules and billing schedules.</p>
          </div>
          <div style={styles.paragraphBlock}>
            <span style={styles.bulletNumber}>02</span>
            <p style={styles.text}>All class bookings, digital packages, and workshop entries are personal to the student and cannot be transferred to third-party individuals.</p>
          </div>
          <div style={styles.paragraphBlock}>
            <span style={styles.bulletNumber}>03</span>
            <p style={styles.text}>We reserve the right to alter class schedules, substitute scheduled instructors, or adjust digital platform access parameters with reasonable prior announcement notifications.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


const styles = {
  container: { background: '#0a0a0a', minHeight: 'calc(100vh - 80px)', color: 'white', fontFamily: "'Poppins', sans-serif", padding: '60px 20px', display: 'flex', justifyContent: 'center' },
  card: { background: '#141414', border: '1px solid #222', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '800px', boxSizing: 'border-box' },
  backBtn: { background: 'transparent', color: '#ff3c78', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500', marginBottom: '30px', padding: 0 },
  title: { fontSize: '36px', fontWeight: '700', margin: '0 0 5px 0' },
  subtitle: { fontSize: '14px', color: '#666', margin: 0 },
  divider: { border: '0', height: '1px', background: '#222', margin: '30px 0' },
  body: { display: 'flex', flexDirection: 'column', gap: '30px' },
  paragraphBlock: { display: 'flex', gap: '20px', alignItems: 'flex-start' },
  bulletNumber: { color: '#ff3c78', fontWeight: '700', fontSize: '16px', background: 'rgba(255, 60, 120, 0.1)', padding: '4px 8px', borderRadius: '4px' },
  text: { color: '#ccc', fontSize: '15px', lineHeight: '1.7', margin: 0 }
};