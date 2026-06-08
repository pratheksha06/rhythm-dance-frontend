import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    // Simulating password reset email trigger
    setSubmitted(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        
        {!submitted ? (
          <>
            <p style={styles.subtitle}>Enter your email address and we'll send you link to restore your access.</p>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  style={styles.input}
                />
              </div>
              <button type="submit" style={styles.submitBtn}>Send Reset Link</button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#ff3c78', fontSize: '15px', marginBottom: '20px', lineHeight: '1.6' }}>
              ✓ Reset link successfully dispatched to <strong>{email}</strong>! Please check your spam folder if you do not receive it shortly.
            </p>
          </div>
        )}

        <p style={styles.footerText}>
          Remember your password? <Link to="/login" style={{ color: '#ff3c78', textDecoration: 'none', fontWeight: '600' }}>Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { width: '100%', minHeight: '100vh', background: '#0a0a0a', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Poppins', sans-serif" },
  card: { width: '100%', maxWidth: '420px', background: '#111', padding: '40px', borderRadius: '16px', border: '1px solid #222', boxSizing: 'border-box' },
  title: { color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '8px', textAlign: 'center' },
  subtitle: { color: '#666', fontSize: '14px', marginBottom: '24px', textAlign: 'center', lineHeight: '1.5' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { color: '#aaa', fontSize: '13px', fontWeight: '500' },
  input: { background: '#1a1a1a', border: '1px solid #222', padding: '12px 16px', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none' },
  submitBtn: { background: '#ff3c78', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' },
  footerText: { color: '#666', fontSize: '14px', textAlign: 'center', marginTop: '24px' }
};