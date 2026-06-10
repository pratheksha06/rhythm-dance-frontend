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
import TermsConditions from './pages/legal/TermsConditions';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import RentalPolicy from './pages/legal/RentalPolicy';
import StudentCode from './pages/legal/StudentCode';

// ── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('user'));
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/programs', label: 'Programs' },
    { to: '/instructors', label: 'Instructors' },
    { to: '/about', label: 'About' },
    { to: '/faq', label: 'FAQ' },
  ];

  return (
    <nav style={{
      ...S.navbar,
      background: scrolled ? 'rgba(10,10,10,0.97)' : 'rgba(10,10,10,0.75)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid #1e1e1e' : '1px solid transparent',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none'
    }}>
      <style>{`
        .nav-lnk { color: #aaa; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; padding-bottom: 2px; }
        .nav-lnk:hover, .nav-lnk.active { color: #fff; }
        .nav-lnk.active { border-bottom: 2px solid #ff3c78; color: #fff; }
        .nav-cta:hover { opacity: 0.88; transform: translateY(-1px); }
        .logout-btn:hover { background: rgba(255,60,120,0.15) !important; }
      `}</style>

      <div style={S.logo} onClick={() => navigate('/')}>
        <span style={{ color: '#ff3c78' }}>R</span>hythm
      </div>

      <div style={S.navLinks}>
        {navLinks.map(({ to, label }) => (
          <Link key={to} to={to} className={`nav-lnk${location.pathname === to ? ' active' : ''}`}>
            {label}
          </Link>
        ))}
      </div>

      <div style={S.authGroup}>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-btn" style={S.logoutBtn}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={S.loginBtn} className="nav-cta">Login</Link>
            <Link to="/signup" style={S.signupBtn} className="nav-cta">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}

// ── HOMEPAGE ─────────────────────────────────────────────────────────────────
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

  const stats = [
    { num: '15+', label: 'Dance Styles' },
    { num: '25+', label: 'Expert Trainers' },
    { num: '1,500+', label: 'Active Students' },
    { num: '40+', label: 'Industry Awards' },
  ];

  const testimonials = [
    { quote: '"The instructors don\'t just drill routines—they break down the musicality and feeling behind every move. My freestyle confidence has completely transformed."', name: '— Amara K.', track: 'Hip Hop Track' },
    { quote: '"The community here is unmatched. Incredibly welcoming, flawless studio acoustics, and scheduling around my work is completely stress-free."', name: '— Jordan T.', track: 'Salsa & Contemporary' },
  ];

  const programs = [
    { title: 'Urban Hip-Hop', tag: 'Street Styles', img: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=500', desc: 'Master high-energy grooves, isolation techniques, and modern commercial choreography.' },
    { title: 'Salsa & Latin Fusion', tag: 'Latin', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=500', desc: 'Explosive footwork, intricate partner turn patterns, and rhythmic timing structures.' },
    { title: 'Contemporary Flow', tag: 'Contemporary', img: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=500', desc: 'Deep storytelling using fluid floor-work, weight distribution and creative expression.' },
  ];

  return (
    <div style={{ width: '100%', background: '#0a0a0a', color: 'white', fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        .prog-card:hover { transform: translateY(-8px); border-color: #ff3c78 !important; box-shadow: 0 20px 40px rgba(255,60,120,0.12); }
        .prog-card { transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .testi-card { transition: border-color 0.3s ease; }
        .testi-card:hover { border-color: #ff3c78 !important; }
        .cta-primary:hover { background: #e0325e !important; transform: translateY(-2px); }
        .cta-secondary:hover { background: rgba(255,255,255,0.08) !important; transform: translateY(-2px); }
        .cta-primary, .cta-secondary { transition: all 0.25s ease; }
        .form-inp { width: 100%; background: #161616; border: 1px solid #2a2a2a; padding: 13px 16px; border-radius: 10px; color: white; outline: none; font-size: 14px; font-family: 'Poppins', sans-serif; margin-bottom: 14px; box-sizing: border-box; }
        .form-inp:focus { border-color: #ff3c78; }
        .footer-lnk { color: #666; font-size: 13px; cursor: pointer; transition: color 0.2s; display: inline-block; }
        .footer-lnk:hover { color: #ff3c78; }
      `}</style>

      {/* ── HERO ── */}
      <header style={H.hero}>
        <div style={H.heroOverlay} />
        <div style={H.heroContent}>
          <span style={H.heroBadge}>🎵 World-Class Dance Training</span>
          <h1 style={H.heroTitle}>
            Feel The <span style={{ color: '#ff3c78' }}>Rhythm</span><br />Of Dance
          </h1>
          <p style={H.heroSub}>
            Learn from professional instructors, explore multiple dance styles, and join the most energetic dance community. From absolute beginners to seasoned stage performers.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/programs')} className="cta-primary" style={H.ctaPrimary}>Explore Programs</button>
            <button onClick={() => navigate('/signup')} className="cta-secondary" style={H.ctaSecondary}>Join Academy</button>
          </div>
        </div>
      </header>

      {/* ── STATS ── */}
      <section style={H.statsBar}>
        {stats.map(s => (
          <div key={s.label} style={H.statItem}>
            <div style={H.statNum}>{s.num}</div>
            <div style={H.statLabel}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── PROGRAMS ── */}
      <section style={H.section}>
        <p style={H.sectionTag}>WHAT WE OFFER</p>
        <h2 style={H.sectionTitle}>Our Elite <span style={{ color: '#ff3c78' }}>Programs</span></h2>
        <p style={H.sectionSub}>Select a discipline to discover curriculum and scheduling structure</p>
        <div style={H.threeGrid}>
          {programs.map(p => (
            <div key={p.title} className="prog-card" style={H.progCard}>
              <div style={{ ...H.progImg, backgroundImage: `url(${p.img})` }} />
              <div style={{ padding: '22px' }}>
                <span style={H.progTag}>{p.tag}</span>
                <h3 style={H.progTitle}>{p.title}</h3>
                <p style={H.progDesc}>{p.desc}</p>
                <button onClick={() => navigate('/programs')} style={H.progBtn}>View Details →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ ...H.section, background: '#0d0d0d', borderTop: '1px solid #161616', borderBottom: '1px solid #161616' }}>
        <p style={H.sectionTag}>WHY RHYTHM</p>
        <h2 style={H.sectionTitle}>The Rhythm <span style={{ color: '#ff3c78' }}>Experience</span></h2>
        <div style={H.whyGrid}>
          {[
            { icon: '🏆', title: 'World-Class Instructors', desc: 'Certified professionals with international stage and competition experience.' },
            { icon: '🎯', title: 'Structured Curriculum', desc: 'Progressive skill-building tracks from beginner foundations to performance-ready mastery.' },
            { icon: '🏟️', title: 'Premium Studio Spaces', desc: 'State-of-the-art sprung flooring, mirrored walls, and professional sound systems.' },
            { icon: '🤝', title: 'Inclusive Community', desc: 'A welcoming environment for all ages, backgrounds, and experience levels.' },
          ].map(item => (
            <div key={item.title} style={H.whyCard}>
              <div style={H.whyIcon}>{item.icon}</div>
              <h4 style={H.whyTitle}>{item.title}</h4>
              <p style={H.whyDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={H.section}>
        <p style={H.sectionTag}>STUDENT STORIES</p>
        <h2 style={H.sectionTitle}>What Our <span style={{ color: '#ff3c78' }}>Dancers</span> Say</h2>
        <div style={H.twoGrid}>
          {testimonials.map(t => (
            <div key={t.name} className="testi-card" style={H.testiCard}>
              <p style={H.testiQuote}>{t.quote}</p>
              <div style={{ fontWeight: '600', color: '#ff3c78', fontSize: '14px' }}>{t.name}</div>
              <div style={{ fontSize: '12px', color: '#555', marginTop: '3px' }}>{t.track}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section style={{ ...H.section, background: '#0d0d0d', borderTop: '1px solid #161616' }}>
        <div style={H.contactGrid}>
          <div>
            <p style={H.sectionTag}>GET IN TOUCH</p>
            <h2 style={{ ...H.sectionTitle, textAlign: 'left', marginBottom: '16px' }}>
              Have Questions?<br />Drop Us a <span style={{ color: '#ff3c78' }}>Message</span>
            </h2>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.7', marginBottom: '32px', maxWidth: '420px' }}>
              Want to check slot availability, ask about private sessions, or corporate pricing? Our team will respond within 24 hours.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[['✉️', 'support@rhythmdance.com'], ['📞', '+1 (555) 019-2834'], ['📍', '123 Creative Studio Lane, New York, NY']].map(([icon, text]) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#aaa', fontSize: '14px' }}>
                  <span style={{ fontSize: '18px' }}>{icon}</span>{text}
                </div>
              ))}
            </div>
          </div>

          <div style={H.contactCard}>
            <h3 style={{ margin: '0 0 22px 0', fontSize: '18px', fontWeight: '600' }}>Send an Enquiry</h3>
            {success && <div style={H.successBox}>✅ Message sent! We'll respond within 24 hours.</div>}
            <form onSubmit={handleEnquirySubmit}>
              <input type="text" placeholder="Your Full Name" className="form-inp" value={enquiry.name} onChange={e => setEnquiry({ ...enquiry, name: e.target.value })} required />
              <input type="email" placeholder="Email Address" className="form-inp" value={enquiry.email} onChange={e => setEnquiry({ ...enquiry, email: e.target.value })} required />
              <textarea placeholder="What are you looking for?" className="form-inp" rows="4" value={enquiry.message} onChange={e => setEnquiry({ ...enquiry, message: e.target.value })} style={{ resize: 'none', marginBottom: '18px' }} required />
              <button type="submit" style={H.ctaPrimary} className="cta-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={H.footer}>
        <div style={H.footerGrid}>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#ff3c78', marginBottom: '14px', letterSpacing: '1px' }}>Rhythm</div>
            <p style={{ color: '#444', fontSize: '13px', lineHeight: '1.7', maxWidth: '260px' }}>
              Empowering artists with elite technical training and high-production performance showcases.
            </p>
          </div>
          {[
            { heading: 'Navigation', links: [['Home', '/home'], ['Programs', '/programs'], ['Instructors', '/instructors'], ['FAQ', '/faq']] },
            { heading: 'Admissions', links: [['Registration', '/registration'], ['Login', '/login'], ['Create Account', '/signup'], ['About Us', '/about']] },
            { heading: 'Legal', links: [['Terms & Conditions', '/terms-conditions'], ['Privacy Policy', '/privacy-policy'], ['Rental Policy', '/rental-policy'], ['Student Code', '/student-code']] },
          ].map(col => (
            <div key={col.heading}>
              <h4 style={H.footerHeading}>{col.heading}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map(([label, path]) => (
                  <Link key={label} to={path} className="footer-lnk">{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={H.footerBottom}>
          <span>© 2026 Rhythm Performing Arts Academy. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

// ── APP ROUTER ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '70px' }}>
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
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/rental-policy" element={<RentalPolicy />} />
          <Route path="/student-code" element={<StudentCode />} />
        </Routes>
      </div>
    </Router>
  );
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const S = {
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 6%', position: 'fixed', top: 0, left: 0, width: '100%', height: '70px', zIndex: 1000, boxSizing: 'border-box', transition: 'all 0.3s ease' },
  logo: { fontSize: '24px', fontWeight: '700', letterSpacing: '1px', cursor: 'pointer', color: 'white' },
  navLinks: { display: 'flex', gap: '32px', alignItems: 'center' },
  authGroup: { display: 'flex', gap: '10px', alignItems: 'center' },
  loginBtn: { color: '#ccc', fontSize: '14px', fontWeight: '500', padding: '8px 18px', borderRadius: '8px', border: '1px solid #2a2a2a', transition: 'all 0.2s' },
  signupBtn: { background: '#ff3c78', color: 'white', fontSize: '14px', fontWeight: '600', padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' },
  logoutBtn: { background: 'transparent', color: '#ccc', fontSize: '14px', padding: '8px 18px', borderRadius: '8px', border: '1px solid #2a2a2a', cursor: 'pointer', transition: 'all 0.2s' },
};

const H = {
  hero: { position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: "url('https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1974')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' },
  heroOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.6) 60%, rgba(10,10,10,1) 100%)' },
  heroContent: { position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '780px', padding: '0 24px' },
  heroBadge: { display: 'inline-block', background: 'rgba(255,60,120,0.15)', border: '1px solid rgba(255,60,120,0.3)', color: '#ff3c78', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '24px' },
  heroTitle: { fontSize: 'clamp(42px, 7vw, 72px)', fontWeight: '800', lineHeight: '1.1', marginBottom: '22px', letterSpacing: '-1px' },
  heroSub: { fontSize: '16px', color: '#aaa', lineHeight: '1.75', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' },
  ctaPrimary: { background: '#ff3c78', color: 'white', border: 'none', padding: '14px 36px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' },
  ctaSecondary: { background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', padding: '13px 36px', borderRadius: '10px', fontSize: '15px', fontWeight: '500', cursor: 'pointer' },

  statsBar: { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', padding: '50px 8%', background: '#0d0d0d', borderBottom: '1px solid #161616' },
  statItem: { textAlign: 'center' },
  statNum: { fontSize: '38px', fontWeight: '800', color: '#ff3c78', letterSpacing: '-1px' },
  statLabel: { fontSize: '13px', color: '#666', marginTop: '4px', fontWeight: '500' },

  section: { padding: '90px 8%', background: '#0a0a0a' },
  sectionTag: { textAlign: 'center', fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: '#ff3c78', marginBottom: '10px', textTransform: 'uppercase' },
  sectionTitle: { fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: '700', textAlign: 'center', marginBottom: '10px' },
  sectionSub: { textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '50px' },

  threeGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1100px', margin: '0 auto' },
  progCard: { background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', overflow: 'hidden' },
  progImg: { height: '200px', backgroundSize: 'cover', backgroundPosition: 'center' },
  progTag: { display: 'inline-block', background: 'rgba(255,60,120,0.12)', color: '#ff3c78', fontSize: '10px', fontWeight: '700', letterSpacing: '1px', padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase', marginBottom: '10px' },
  progTitle: { fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#fff' },
  progDesc: { fontSize: '13px', color: '#777', lineHeight: '1.6', marginBottom: '18px' },
  progBtn: { background: 'none', border: 'none', color: '#ff3c78', fontSize: '13px', fontWeight: '600', cursor: 'pointer', padding: 0 },

  whyGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', maxWidth: '1100px', margin: '50px auto 0' },
  whyCard: { background: '#111', border: '1px solid #1e1e1e', borderRadius: '14px', padding: '28px 24px' },
  whyIcon: { fontSize: '28px', marginBottom: '14px' },
  whyTitle: { fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#fff' },
  whyDesc: { fontSize: '13px', color: '#666', lineHeight: '1.6' },

  twoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '900px', margin: '50px auto 0' },
  testiCard: { background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '32px' },
  testiQuote: { fontSize: '14px', color: '#bbb', lineHeight: '1.75', marginBottom: '20px', fontStyle: 'italic' },

  contactGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', maxWidth: '1100px', margin: '0 auto', alignItems: 'start' },
  contactCard: { background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '36px' },
  successBox: { background: 'rgba(46,204,113,0.1)', color: '#2ecc71', border: '1px solid rgba(46,204,113,0.3)', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', textAlign: 'center' },

  footer: { background: '#060606', borderTop: '1px solid #111', padding: '70px 8% 28px' },
  footerGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px', maxWidth: '1100px', margin: '0 auto' },
  footerHeading: { fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#444', marginBottom: '20px' },
  footerBottom: { maxWidth: '1100px', margin: '50px auto 0', paddingTop: '22px', borderTop: '1px solid #111', textAlign: 'center', fontSize: '12px', color: '#333' },
};
