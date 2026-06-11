import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 1. Resolve API destination dynamically based on environment
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://rhythm-dance-backend-2.onrender.com';

    try {
      // 2. Transmit request using template strings to support production server
      const res = await axios.post(`${API_BASE_URL}/api/users/login`, {
        email: formData.email,
        password: formData.password
      });
      const user = res.data;

      if (role === 'admin' && user.role !== 'admin') {
        setError('Access denied. This account does not have admin privileges.');
        setLoading(false);
        return;
      }

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', user.role);

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.card}>
        {/* PORTAL ROLE TAB SELECTOR */}
        <div style={loginStyles.tabContainer}>
          <button 
            type="button"
            onClick={() => setRole('user')} 
            style={{
              ...loginStyles.tab, 
              borderBottom: role === 'user' ? '3px solid #ff3c78' : '3px solid transparent',
              color: role === 'user' ? '#ff3c78' : '#888'
            }}
          >
            User Portal
          </button>
          <button 
            type="button"
            onClick={() => setRole('admin')} 
            style={{
              ...loginStyles.tab, 
              borderBottom: role === 'admin' ? '3px solid #ff3c78' : '3px solid transparent',
              color: role === 'admin' ? '#ff3c78' : '#888'
            }}
          >
            Admin Portal
          </button>
        </div>

        <h2 style={loginStyles.title}>{role === 'admin' ? 'Admin Dashboard Entry' : 'Welcome Back'}</h2>
        <p style={loginStyles.subtitle}>Enter your account management credentials below</p>

        {error && <div style={loginStyles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} style={loginStyles.form}>
          <div style={loginStyles.inputGroup}>
            <label style={loginStyles.label}>Email Address</label>
            <input 
              type="email" 
              name="email" 
              required 
              onChange={handleChange} 
              placeholder="name@example.com" 
              style={loginStyles.input}
            />
          </div>

          <div style={loginStyles.inputGroup}>
            <div style={loginStyles.passwordHeader}>
              <label style={loginStyles.label}>Password</label>
              {/* FORGOT PASSWORD LINK LINKED TO CORRECT ROUTE */}
              <Link to="/forgot-password" style={loginStyles.forgotLink}>Forgot Password?</Link>
            </div>
            <input 
              type="password" 
              name="password" 
              required 
              onChange={handleChange} 
              placeholder="••••••••" 
              style={loginStyles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={loginStyles.submitBtn}>
            {loading ? 'Processing Authentication...' : `Login as ${role === 'admin' ? 'Admin' : 'User'}`}
          </button>
        </form>

        {role === 'user' && (
          <p style={loginStyles.footerText}>
            New to Rhythm? <Link to="/signup" style={{ color: '#ff3c78', textDecoration: 'none', fontWeight: '600' }}>Create an Account</Link>
          </p>
        )}
      </div>
    </div>
  );
}

const loginStyles = {
  container: { width: '100%', minHeight: 'calc(100vh - 70px)', background: '#0a0a0a', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Poppins', sans-serif", padding: '40px 20px', boxSizing: 'border-box' },
  card: { width: '100%', maxWidth: '420px', background: '#111', padding: '40px', borderRadius: '16px', border: '1px solid #222', boxSizing: 'border-box' },
  tabContainer: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '1px solid #222' },
  tab: { flex: 1, background: 'transparent', border: 'none', padding: '12px 0', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
  title: { color: 'white', fontSize: '24px', fontWeight: '700', marginBottom: '8px', textAlign: 'center' },
  subtitle: { color: '#666', fontSize: '14px', marginBottom: '24px', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  passwordHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  label: { color: '#aaa', fontSize: '13px', fontWeight: '500' },
  forgotLink: { color: '#ff3c78', fontSize: '13px', textDecoration: 'none', fontWeight: '500' },
  input: { background: '#1a1a1a', border: '1px solid #222', padding: '12px 16px', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none' },
  submitBtn: { background: '#ff3c78', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' },
  errorAlert: { backgroundColor: 'rgba(231,76,60,0.1)', color: '#e74c3c', padding: '12px', borderRadius: '8px', marginBottom: '10px', fontSize: '13px', border: '1px solid #e74c3c', textAlign: 'center' },
  footerText: { color: '#666', fontSize: '14px', textAlign: 'center', marginTop: '24px' }
};