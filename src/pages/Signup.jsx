import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(''); // Tracks active input field for focus glow
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      setLoading(true);
      
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'student'
      });

      if (response.status === 201) {
        const newUser = response.data;
        alert(`Account created successfully for ${newUser.name}!`);
        navigate('/registration', { state: { userId: newUser._id } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to append pink active styles dynamically
  const getInputStyle = (fieldName) => ({
    ...styles.input,
    ...(focusedField === fieldName ? styles.inputFocus : {})
  });

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join Rhythm Dance Academy</p>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField('')}
              style={getInputStyle('name')} 
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
              style={getInputStyle('email')} 
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField('')}
              style={getInputStyle('password')} 
              required 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onFocus={() => setFocusedField('confirmPassword')}
              onBlur={() => setFocusedField('')}
              style={getInputStyle('confirmPassword')} 
              required 
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh', 
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1511406584303-d34002996170?auto=format&fit=crop&q=80&w=1200')", 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '40px 20px',
    boxSizing: 'border-box'
  },
  card: { 
    backgroundColor: 'rgba(23, 23, 23, 0.85)', 
    backdropFilter: 'blur(12px)', 
    WebkitBackdropFilter: 'blur(12px)',
    padding: '40px', 
    borderRadius: '20px', 
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(255, 46, 126, 0.15)', 
    width: '100%', 
    maxWidth: '440px', 
    textAlign: 'left', 
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxSizing: 'border-box'
  },
  title: { 
    color: '#ffffff', 
    fontSize: '32px', 
    margin: '0 0 8px 0', 
    fontFamily: 'sans-serif', 
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: { 
    color: '#b3b3b3', 
    fontSize: '14px', 
    margin: '0 0 35px 0',
    textAlign: 'center'
  },
  errorAlert: { 
    backgroundColor: 'rgba(255, 77, 77, 0.1)', 
    color: '#ff4d4d', 
    padding: '12px', 
    borderRadius: '8px', 
    marginBottom: '20px', 
    fontSize: '14px', 
    border: '1px solid rgba(255, 77, 77, 0.3)' 
  },
  form: { 
    width: '100%' 
  },
  inputGroup: { 
    marginBottom: '24px' 
  },
  label: { 
    display: 'block', 
    color: '#ffffff', 
    marginBottom: '10px', 
    fontSize: '15px',
    fontWeight: '500'
  },
  input: { 
    width: '100%', 
    padding: '14px 16px', 
    borderRadius: '10px', 
    border: '1px solid #3a3a3a', 
    backgroundColor: '#1e1e1e', 
    color: '#fff', 
    boxSizing: 'border-box', 
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.2s ease-in-out'
  },
  inputFocus: {
    borderColor: '#ff2e7e',
    boxShadow: '0 0 0 2px rgba(255, 46, 126, 0.4)',
    backgroundColor: '#242424'
  },
  button: { 
    width: '100%', 
    padding: '14px', 
    borderRadius: '12px', 
    border: 'none', 
    backgroundColor: '#ff2e7e', 
    color: '#fff', 
    fontSize: '16px', 
    fontWeight: 'bold', 
    cursor: 'pointer', 
    marginTop: '10px',
    transition: 'background-color 0.2s ease',
    boxShadow: '0 4px 15px rgba(255, 46, 126, 0.3)'
  },
  footerText: { 
    color: '#b3b3b3', 
    marginTop: '25px', 
    fontSize: '14px',
    textAlign: 'center'
  },
  link: { 
    color: '#ff2e7e', 
    textDecoration: 'none', 
    fontWeight: 'bold',
    marginLeft: '5px'
  }
};

export default Signup;