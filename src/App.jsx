import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Programs from './pages/Programs';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import Registration from './pages/Registration';
import Instructors from './pages/Instructors';
import AdminDashboard from './pages/AdminDashboard';

// --- NEW INDIVIDUAL POLICY IMPORTS ---
import TermsConditions from './pages/legal/TermsConditions';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import RentalPolicy from './pages/legal/RentalPolicy';
import StudentCode from './pages/legal/StudentCode';

// --- NAVBAR COMPONENT ---
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    alert("Logged out successfully");
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <style>{` .nav-link-item:hover { color: #ff3c78 !important; } `}</style>
      <div style={styles.logo} onClick={() => navigate('/')}>Rhythm</div>
      
      <div style={styles.navLinks}>
        <Link to="/home" className="nav-link-item" style={styles.navLink}>Home</Link>
        <Link to="/about" className="nav-link-item" style={styles.navLink}>About Us</Link>
        <Link to="/programs" className="nav-link-item" style={styles.navLink}>Programs</Link>
        <Link to="/faq" className="nav-link-item" style={styles.navLink}>FAQ</Link>
      </div>

      <div style={styles.authGroup}>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="action-btn" style={styles.loginBtn}>Logout</button>
        ) : (
          <Link to="/login" className="action-btn" style={styles.signupBtn}>Get Started</Link>
        )}
      </div>
    </nav>
  );
}

// --- MAIN HERO DASHBOARD ---
function MainDashboard() {
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setEnquiry({ name: '', email: '', message: '' });
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <div style={styles.homeContainer}>
      <style>{`
        .action-btn:hover { transform: scale(1.04); cursor: pointer; transition: transform 0.2s ease; }
        .footer-link { color: #888; text-decoration: none; transition: color 0.2s; font-size: 14px; cursor: pointer; display: inline-block; }
        .footer-link:hover { color: #ff3c78; }
        .form-input { width: 100%; background: #161616; border: 1px solid #333; padding: 12px; borderRadius: 8px; color: white; outline: none; margin-bottom: 15px; box-sizing: border-box; font-family: inherit; }
        .form-input:focus { border-color: #ff3c78; }
      `}</style>
      
      {/* 1. HERO SECTION */}
      <header style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Feel The <span style={{ color: '#ff3c78' }}>Rhythm</span> Of <br /> Dance</h1>
          <p style={styles.heroSubtitle}>
            Learn from professional instructors, explore multiple dance styles, and join the most energetic dance community. From absolute beginners to seasoned stage performers—your journey starts here.
          </p>
          <div style={styles.btnGroup}>
            <button onClick={() => navigate('/programs')} className="action-btn" style={styles.exploreBtn}>Explore Classes</button>
            <button onClick={() => navigate('/signup')} className="action-btn" style={styles.secondaryBtn}>Join Academy</button>
          </div>
        </div>
      </header>

      {/* 2. ACADEMY STATS METRIC PANEL */}
      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}><h3 style={styles.statNumber}>15+</h3><p style={styles.statLabel}>Dance Styles</p></div>
          <div style={styles.statCard}><h3 style={styles.statNumber}>25+</h3><p style={styles.statLabel}>Expert Trainers</p></div>
          <div style={styles.statCard}><h3 style={styles.statNumber}>1,500+</h3><p style={styles.statLabel}>Active Students</p></div>
          <div style={styles.statCard}><h3 style={styles.statNumber}>40+</h3><p style={styles.statLabel}>Industry Awards</p></div>
        </div>
      </section>

      {/* 3. STUDENT TESTIMONIALS */}
      <section style={styles.sectionPadding}>
        <h2 style={styles.sectionTitle}>What Our <span style={{ color: '#ff3c78' }}>Dancers</span> Say</h2>
        <div style={styles.testimonialGrid}>
          <div style={styles.testimonialCard}>
            <p style={styles.quote}>"The instructors don't just drill routines—they break down the musicality and feeling behind the style. My freestyle confidence has completely transformed."</p>
            <div style={{ fontWeight: '600', color: '#ff3c78', marginBottom: '2px' }}>— Amara K.</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Hip Hop Track</div>
          </div>
          <div style={styles.testimonialCard}>
            <p style={styles.quote}>"The community atmosphere here is unmatched. It's incredibly welcoming, the studio acoustics are flawless, and scheduling around my work is completely stress-free."</p>
            <div style={{ fontWeight: '600', color: '#ff3c78', marginBottom: '2px' }}>— Jordan T.</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Salsa & Contemporary</div>
          </div>
        </div>
      </section>

      {/* 4. CONTACT INFRASTRUCTURE & ENQUIRY FORM */}
      <section style={{ ...styles.sectionPadding, background: '#0b0b0b', borderTop: '1px solid #141414' }}>
        <div style={styles.contactRowGrid}>
          <div>
            <h2 style={{ ...styles.sectionTitle, textAlign: 'left', marginBottom: '15px' }}>Have Questions?<br />Drop Us a <span style={{ color: '#ff3c78' }}>Message</span></h2>
            <p style={{ color: '#888', fontSize: '14px', lineHeight: '1.6', maxWidth: '440px', marginBottom: '30px' }}>
              Want to check slot structures, ask about private family sessions, evaluate studio spaces, or secure corporate discounts? Fill out the inquiry sheet, and our management desk will jump on it.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '15px' }}>
              <div>✉️ <span style={{ marginLeft: '8px', color: '#eee' }}>support@rhythmdance.com</span></div>
              <div>📞 <span style={{ marginLeft: '8px', color: '#eee' }}>+1 (555) 019-2834</span></div>
              <div>📍 <span style={{ marginLeft: '8px', color: '#555' }}>123 Creative Studio Lane, New York, NY</span></div>
            </div>
          </div>

          <div style={styles.enquiryCard}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>Enquiry Form</h3>
            {success && <div style={styles.successAlert}>Message routed! We will respond within 24 business hours.</div>}
            <form onSubmit={handleEnquirySubmit}>
              <input 
                type="text" 
                placeholder="Your Full Name" 
                className="form-input" 
                value={enquiry.name}
                onChange={(e) => setEnquiry({...enquiry, name: e.target.value})}
                required 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="form-input" 
                value={enquiry.email}
                onChange={(e) => setEnquiry({...enquiry, email: e.target.value})}
                required 
              />
              <textarea 
                placeholder="What details are you looking for?" 
                className="form-input" 
                rows="4"
                value={enquiry.message}
                onChange={(e) => setEnquiry({...enquiry, message: e.target.value})}
                style={{ resize: 'none' }}
                required 
              ></textarea>
              <button type="submit" style={styles.submitEnquiryBtn}>Send Enquiry</button>
            </form>
          </div>
        </div>
      </section>

      {/* 5. CORPORATE NETWORK FOOTER */}
      <footer style={styles.footerContainer}>
        <div style={styles.footerGrid}>
          <div style={styles.footerColumn}>
            <h3 style={{ color: '#ff3c78', fontSize: '22px', margin: '0 0 15px 0', fontWeight: '700', letterSpacing: '0.5px' }}>Rhythm</h3>
            <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              Empowering artists across global standards with elite technical training, state-of-the-art wooden flooring layouts, and high-production performance showcases.
            </p>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>Navigation</h4>
            <div style={styles.footerLinkList}>
              <span onClick={() => navigate('/home')} className="footer-link">Home Portal</span>
              <span onClick={() => navigate('/about')} className="footer-link">About Us</span>
              <span onClick={() => navigate('/programs')} className="footer-link">Dance Programs</span>
              <span onClick={() => navigate('/faq')} className="footer-link">FAQ Desk</span>
            </div>
          </div>

          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>Admissions</h4>
            <div style={styles.footerLinkList}>
              <span onClick={() => navigate('/registration')} className="footer-link">Application Form</span>
              <span onClick={() => navigate('/instructors')} className="footer-link">Our Instructors</span>
              <span onClick={() => navigate('/login')} className="footer-link">Student Login</span>
              <span onClick={() => navigate('/signup')} className="footer-link">Create Account</span>
            </div>
          </div>

          {/* CHANNELS REDIRECTING TO UNIQUE LINKS */}
          <div style={styles.footerColumn}>
            <h4 style={styles.footerHeading}>Legal Compliance</h4>
            <div style={styles.footerLinkList}>
              <span onClick={() => navigate('/terms-conditions')} className="footer-link">Terms & Conditions</span>
              <span onClick={() => navigate('/privacy-policy')} className="footer-link">Privacy Policy</span>
              <span onClick={() => navigate('/rental-policy')} className="footer-link">Studio Rental Policy</span>
              <span onClick={() => navigate('/student-code')} className="footer-link">Student Code</span>
            </div>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p style={{ margin: 0 }}>© 2026 Rhythm Performing Arts Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// --- CORE ROUTER ROOT ---
export default function App() {
  return (
    <Router>
      <Navbar /> 
      <div style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)', background: '#0a0a0a' }}>
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/home" element={<MainDashboard />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* INDIVIDUALIZED LEGAL ROUTES MAP */}
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/rental-policy" element={<RentalPolicy />} />
          <Route path="/student-code" element={<StudentCode />} />
        </Routes>
      </div>
    </Router>
  );
}

// --- STYLESHEET CONFIGURATIONS ---
const styles = {
  homeContainer: { width: '100%', minHeight: 'calc(100vh - 80px)', background: '#0a0a0a', color: 'white', fontFamily: "'Poppins', sans-serif" },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 5%', background: '#0a0a0a', position: 'fixed', top: 0, left: 0, width: '100%', height: '80px', zIndex: 1000, borderBottom: '1px solid #1a1a1a', boxSizing: 'border-box' },
  logo: { fontSize: '26px', fontWeight: '700', color: '#ff3c78', letterSpacing: '1px', cursor: 'pointer' },
  navLinks: { display: 'flex', gap: '30px', alignItems: 'center' },
  navLink: { color: 'white', textDecoration: 'none', fontSize: '15px', fontWeight: '500', transition: 'color 0.2s' },
  authGroup: { display: 'flex', gap: '12px', alignItems: 'center' },
  loginBtn: { background: 'transparent', color: 'white', border: '2px solid #ff3c78', padding: '8px 25px', borderRadius: '20px', fontSize: '14px', cursor: 'pointer' },
  signupBtn: { background: '#ff3c78', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '20px', fontSize: '14px', textDecoration: 'none', fontWeight: '600' },
  heroSection: { height: 'calc(85vh - 80px)', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1974')", backgroundSize: 'cover', backgroundPosition: 'center' },
  heroContent: { textAlign: 'center', maxWidth: '850px', padding: '0 20px' },
  heroTitle: { fontSize: '56px', fontWeight: '700', marginBottom: '20px', lineHeight: '1.2' },
  heroSubtitle: { fontSize: '15px', color: '#aaa', marginBottom: '35px', lineHeight: '1.7', maxWidth: '680px', margin: '0 auto 35px' },
  btnGroup: { display: 'flex', justifyContent: 'center', gap: '15px' },
  exploreBtn: { background: '#ff3c78', color: 'white', border: 'none', padding: '14px 35px', borderRadius: '30px', fontSize: '15px', fontWeight: '600' },
  secondaryBtn: { background: 'transparent', color: 'white', border: '2px solid white', padding: '12px 35px', borderRadius: '30px', fontSize: '15px', fontWeight: '600' },
  statsSection: { background: '#111', padding: '50px 5%', borderTop: '1px solid #1c1c1c', borderBottom: '1px solid #1c1c1c' },
  statsGrid: { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '30px', maxWidth: '1200px', margin: '0 auto' },
  statCard: { textAlign: 'center', minWidth: '160px' },
  statNumber: { fontSize: '36px', color: '#ff3c78', margin: '0 0 5px 0', fontWeight: '700' },
  statLabel: { color: '#777', margin: 0, fontSize: '14px', fontWeight: '500' },
  sectionPadding: { padding: '90px 10% 100px' },
  sectionTitle: { fontSize: '32px', fontWeight: '700', textAlign: 'center', marginBottom: '50px', letterSpacing: '0.5px' },
  testimonialGrid: { display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' },
  testimonialCard: { background: '#141414', border: '1px solid #222', padding: '35px', borderRadius: '16px', maxWidth: '480px', flex: '1', minWidth: '290px' },
  quote: { fontStyle: 'italic', color: '#bbb', fontSize: '14.5px', lineHeight: '1.65', marginBottom: '25px', marginTop: 0 },
  contactRowGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', maxWidth: '1200px', margin: '0 auto', alignItems: 'center' },
  enquiryCard: { background: '#141414', border: '1px solid #222', padding: '35px', borderRadius: '16px', boxSizing: 'border-box' },
  successAlert: { background: 'rgba(46, 204, 113, 0.12)', color: '#2ecc71', border: '1px solid rgba(46, 204, 113, 0.3)', padding: '12px', borderRadius: '6px', fontSize: '13px', marginBottom: '20px', textAlign: 'center' },
  submitEnquiryBtn: { background: '#ff3c78', color: 'white', border: 'none', padding: '13px 25px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', width: '100%', cursor: 'pointer', transition: 'background 0.2s' },
  footerContainer: { background: '#050505', borderTop: '1px solid #141414', padding: '70px 10% 25px' },
  footerGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' },
  footerColumn: { display: 'flex', flexDirection: 'column' },
  footerHeading: { fontSize: '14px', fontWeight: '600', marginBottom: '22px', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#999' },
  footerLinkList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  footerBottom: { maxWidth: '1200px', margin: '50px auto 0', paddingTop: '25px', borderTop: '1px solid #111', textAlign: 'center', fontSize: '12px', color: '#444' }
};