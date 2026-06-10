import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);

  // Contact Form State
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });

  // Sync login status from localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const parsedUser = JSON.parse(storedUserData);
      setIsLoggedIn(true);
      setCurrentUser(parsedUser);
    }
  }, []);

  // Fetch the dance class schedule directly from your live database
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/classes');
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching studio schedule layouts:", error);
      } finally {
        setLoadingClasses(false);
      }
    };
    fetchClasses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setCurrentUser(null);
    alert("Logged out successfully");
    navigate('/login');
  };

  const checkRegistrationLogin = () => {
    if (isLoggedIn && currentUser) {
      navigate('/registration', { state: { userId: currentUser._id } }); 
    } else {
      alert("Please login first");
      navigate('/login');
    }
  };

  const handleEnroll = async (classId) => {
    if (!isLoggedIn || !currentUser) {
      alert("Please login to register for a class session.");
      return navigate('/login');
    }

    try {
      const response = await axios.post('http://localhost:5000/api/classes/enroll',{
        userId: currentUser._id,
        classId: classId
      });

      if (response.status === 200 || response.status === 201) {
        alert("🎉 Awesome! You have successfully registered for this class session.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Could not complete enrollment right now.");
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${contactData.name}! Your message has been sent to Rhythm Academy.`);
    setContactData({ name: '', email: '', message: '' });
  };

  return (
    <div style={styles.homeContainer}>
      <style>{hoverStyles}</style>

      {/* --- 1. NAVIGATION BAR --- */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>Rhythm</div>
        
        <div style={styles.navLinks}>
          <a href="#home" style={styles.navLink}>Home</a>
          <a href="#why" style={styles.navLink}>Why Us</a>
          <a href="#programs" style={styles.navLink}>Programs</a>
          <a href="#faq" style={styles.navLink}>FAQ</a>
          <a href="#contact" style={styles.navLink}>Contact</a>
          
          {/* This forces the admin link into your navbar menu */}
          <a href="/admin" style={styles.navLink}>Admin</a>
        </div>

        <div style={styles.authGroup}>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="action-btn" style={styles.loginBtn}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="action-btn" style={styles.loginBtn}>
                Login
              </Link>
              <Link to="/signup" className="action-btn" style={styles.signupBtn}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* --- 2. HERO SECTION --- */}
      <header id="home" style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Feel The <span style={{ color: '#ff3c78' }}>Rhythm</span> Of Dance
          </h1>
          <p style={styles.heroSubtitle}>
            Learn from professional instructors, explore multiple dance styles, and 
            join the most energetic dance community. From beginners to advanced 
            dancers — we have something for everyone.
          </p>
          
          <div style={styles.btnGroup}>
            <button onClick={checkRegistrationLogin} className="action-btn" style={styles.getStartedBtn}>
              Setup Profile
            </button>
            <a href="#live-schedule" style={{ textDecoration: 'none' }}>
              <button className="action-btn" style={styles.exploreBtn}>
                Explore Classes
              </button>
            </a>
          </div>
        </div>
      </header>

      {/* --- 3. PREMIUM SECTOR: OUR ELITE PROGRAMS --- */}
      <section id="programs" style={styles.sectionPadding}>
        <h2 style={styles.sectionHeading}>Our Elite <span style={{ color: '#ff3c78' }}>Programs</span></h2>
        <p style={styles.sectionSubtitle}>Select a dance discipline to discover curriculum and scheduling structure</p>
        
        <div style={styles.gridContainer}>
          <div className="premium-card" style={styles.programCard}>
            <div style={{...styles.cardImage, backgroundImage: "url('https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=500&auto=format&fit=crop')"}}></div>
            <h3 style={styles.cardTitleTitle}>Urban Hip-Hop</h3>
            <p style={styles.cardText}>Master high-energy grooves, isolation techniques, and modern commercial industry choreography.</p>
          </div>
          <div className="premium-card" style={styles.programCard}>
            <div style={{...styles.cardImage, backgroundImage: "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=500&auto=format&fit=crop')"}}></div>
            <h3 style={styles.cardTitleTitle}>Salsa & Latin Fusion</h3>
            <p style={styles.cardText}>Unlock explosive footwork, intricate partner turn patterns, and rhythmic timing structures.</p>
          </div>
          <div className="premium-card" style={styles.programCard}>
            <div style={{...styles.cardImage, backgroundImage: "url('https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=500&auto=format&fit=crop')"}}></div>
            <h3 style={styles.cardTitleTitle}>Contemporary Flow</h3>
            <p style={styles.cardText}>Express deep storytelling narrative dynamics utilizing floor-work and fluid weight distribution.</p>
          </div>
        </div>
      </section>

      {/* --- LIVE SERVER SCHEDULE ATTACHMENT --- */}
      <section id="live-schedule" style={{...styles.sectionPadding, backgroundColor: '#090909', borderTop: '1px solid #1f1f1f'}}>
        <h2 style={styles.sectionHeading}>Available <span style={{ color: '#ff3c78' }}>Dance Sessions</span></h2>
        <p style={styles.sectionSubtitle}>Reserve your live spot inside our current tracking cycles</p>
        
        {loadingClasses ? (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>Spinning up live schedule charts...</p>
        ) : classes.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>No live classes found. Register new classes in your database to populate this area!</p>
        ) : (
          <div style={styles.gridContainer}>
            {classes.map((cls) => (
              <div key={cls._id} className="live-class-card" style={styles.classCard}>
                <h3 style={styles.classTitle}>{cls.className}</h3>
                <p style={styles.classMeta}><strong>Style:</strong> {cls.danceStyle}</p>
                <p style={styles.classMeta}><strong>Schedule:</strong> {cls.schedule}</p>
                <p style={styles.classMeta}><strong>Capacity:</strong> {cls.enrolledStudents?.length || 0} / {cls.capacity} Enrolled</p>
                <button 
                  onClick={() => handleEnroll(cls._id)}
                  className="action-btn enroll-card-btn" 
                  style={styles.enrollBtn}
                >
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- 4. PREMIUM SECTOR: THE RHYTHM EXPERIENCE --- */}
      <section id="about" style={{ ...styles.sectionPadding, backgroundColor: '#141414' }}>
        <h2 style={styles.sectionHeading}>The Rhythm <span style={{ color: '#ff3c78' }}>Experience</span></h2>
        <p style={styles.sectionSubtitle}>Why our academy stands out as a leading global movement community</p>
        
        {/* Metric Counter Blocks */}
        <div style={styles.metricsWrapper}>
          <div style={styles.metricItem}>
            <div style={styles.metricNumber}>25+</div>
            <div style={styles.metricLabel}>Expert Instructors</div>
          </div>
          <div style={styles.metricItem}>
            <div style={styles.metricNumber}>1,500+</div>
            <div style={styles.metricLabel}>Active Registered Dancers</div>
          </div>
          <div style={styles.metricItem}>
            <div style={styles.metricNumber}>5</div>
            <div style={styles.metricLabel}>State-of-the-Art Hubs</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', maxWidth: '650px', margin: '40px auto 0 auto', color: '#aaa', lineHeight: '1.8', fontSize: '15px' }}>
          Our advanced sprung flooring layouts, world-class certified instructor boards, 
          and inclusive studio spaces ensure every dancer has the optimal environments needed to thrive.
        </div>
      </section>

      {/* --- 5. PREMIUM SECTOR: GET IN TOUCH WITH FORM --- */}
      <section id="contact" style={styles.sectionPadding}>
        <h2 style={styles.sectionHeading}>Get In <span style={{ color: '#ff3c78' }}>Touch</span></h2>
        <p style={styles.sectionSubtitle}>Have questions? Drop us a message or visit our studios directly</p>
        
        <div style={styles.contactContainer}>
          {/* Form Left Info */}
          <div style={styles.contactInfo}>
            <h3 style={{color: '#fff', fontSize: '22px', margin: '0 0 15px 0'}}>Studio Information</h3>
            <p style={styles.infoText}>📧 contact@rhythmdance.com</p>
            <p style={styles.infoText}>📞 +1 (555) 019-2834</p>
            <p style={styles.infoText}>📍 789 Choreography Way, New York, NY</p>
            <div style={styles.accentLine}></div>
          </div>

          {/* Form Right Input Field */}
          <form onSubmit={handleContactSubmit} style={styles.contactForm}>
            <input 
              type="text" 
              placeholder="Your Name" 
              value={contactData.name}
              onChange={(e) => setContactData({...contactData, name: e.target.value})}
              style={styles.formInput} 
              required 
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={contactData.email}
              onChange={(e) => setContactData({...contactData, email: e.target.value})}
              style={styles.formInput} 
              required 
            />
            <textarea 
              placeholder="Write your message here..." 
              rows="4" 
              value={contactData.message}
              onChange={(e) => setContactData({...contactData, message: e.target.value})}
              style={styles.formTextarea} 
              required
            ></textarea>
            <button type="submit" className="action-btn" style={styles.msgSubmitBtn}>Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
}

// Global CSS Overrides for interactive motion states
const hoverStyles = `
  .action-btn:hover { transform: scale(1.04); cursor: pointer; }
  .enroll-card-btn:hover { background-color: #ff1d60 !important; }
  .premium-card:hover { transform: translateY(-10px); box-shadow: 0 10px 25px rgba(255, 60, 120, 0.15); border-color: #ff3c78 !important; }
  .live-class-card:hover { border-color: #ff3c78 !important; box-shadow: 0 0 15px rgba(255, 60, 120, 0.1); }
  a:hover { color: #ff3c78 !important; }
`;

const styles = {
  homeContainer: { width: '100%', minHeight: '100vh', background: '#0d0d0d', color: 'white', fontFamily: "'Poppins', sans-serif" },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 8%', background: 'rgba(13, 13, 13, 0.95)', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, boxSizing: 'border-box', borderBottom: '1px solid #141414' },
  logo: { fontSize: '28px', fontWeight: '700', color: '#ff3c78', letterSpacing: '1px' },
  navLinks: { display: 'flex', gap: '30px' },
  navLink: { color: 'white', textDecoration: 'none', fontSize: '16px', fontWeight: '400', transition: '0.3s' },
  loginBtn: { background: '#ff3c78', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '20px', fontSize: '15px', fontWeight: '500', textDecoration: 'none', display: 'inline-block', transition: '0.3s' },
  heroSection: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1974&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '80px', boxSizing: 'border-box' },
  heroContent: { textAlign: 'center', maxWidth: '800px', padding: '0 20px' },
  heroTitle: { fontSize: '64px', fontWeight: '700', marginBottom: '20px', lineHeight: '1.2', letterSpacing: '1px' },
  heroSubtitle: { fontSize: '18px', color: '#ccc', marginBottom: '40px', lineHeight: '1.6' },
  btnGroup: { display: 'flex', justifyContent: 'center', gap: '20px' },
  getStartedBtn: { background: '#ff3c78', color: 'white', border: 'none', padding: '14px 35px', borderRadius: '30px', fontSize: '16px', fontWeight: '500', transition: '0.3s' },
  exploreBtn: { background: 'transparent', color: 'white', border: '2px solid #ff3c78', padding: '12px 35px', borderRadius: '30px', fontSize: '16px', fontWeight: '500', transition: '0.3s' },
  
  sectionPadding: { padding: '90px 8%', backgroundColor: '#111111', boxSizing: 'border-box' },
  sectionHeading: { fontSize: '40px', textAlign: 'center', fontWeight: '700', marginBottom: '8px', margin: '0' },
  sectionSubtitle: { fontSize: '15px', color: '#888', textAlign: 'center', marginBottom: '0', marginTop: '4px' },
  gridContainer: { display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '50px' },
  
  // Premium Layout Program Cards styles
  programCard: { backgroundColor: '#181818', borderRadius: '12px', width: '300px', overflow: 'hidden', border: '1px solid #222', transition: '0.3s ease-in-out', display: 'flex', flexDirection: 'column' },
  cardImage: { height: '180px', backgroundSize: 'cover', backgroundPosition: 'center' },
  cardTitleTitle: { color: '#fff', fontSize: '20px', margin: '20px 20px 10px 20px', fontWeight: '600' },
  cardText: { color: '#aaa', fontSize: '14px', margin: '0 20px 25px 20px', lineHeight: '1.5' },

  // Live DB Classes Cards layouts
  classCard: { backgroundColor: '#141414', padding: '25px', borderRadius: '12px', border: '1px solid #222', width: '280px', display: 'flex', flexDirection: 'column', gap: '10px', transition: '0.3s' },
  classTitle: { color: '#ffffff', fontSize: '22px', fontWeight: '600', margin: '0 0 5px 0' },
  classMeta: { color: '#b3b3b3', fontSize: '14px', margin: 0 },
  enrollBtn: { marginTop: '15px', background: '#ff3c78', color: '#fff', border: 'none', padding: '12px', borderRadius: '25px', fontSize: '14px', fontWeight: '600', width: '100%', transition: '0.3s' },

  // Premium metrics counters layouts
  metricsWrapper: { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '30px', marginTop: '50px', backgroundColor: '#191919', padding: '40px', borderRadius: '12px', border: '1px solid #252525' },
  metricItem: { textAlign: 'center' },
  metricNumber: { fontSize: '48px', fontWeight: '700', color: '#ff3c78', textShadow: '0 0 10px rgba(255,60,120,0.3)' },
  metricLabel: { fontSize: '14px', color: '#bbb', marginTop: '5px' },

  // Contact wrapper box styling arrays
  contactContainer: { display: 'flex', gap: '40px', flexWrap: 'wrap', marginTop: '50px', justifyContent: 'center' },
  contactInfo: { flex: '1', minWidth: '280px', maxWidth: '400px', backgroundColor: '#181818', padding: '40px', borderRadius: '12px', border: '1px solid #222', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  infoText: { color: '#ccc', fontSize: '15px', margin: '10px 0' },
  accentLine: { height: '3px', width: '60px', backgroundColor: '#ff3c78', marginTop: '20px', borderRadius: '2px' },
  contactForm: { flex: '1.5', minWidth: '300px', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '15px' },
  formInput: { width: '100%', padding: '14px', backgroundColor: '#181818', border: '1px solid #222', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box', outline: 'none', transition: '0.3s' },
  formTextarea: { width: '100%', padding: '14px', backgroundColor: '#181818', border: '1px solid #222', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box', outline: 'none', resize: 'none', fontFamily: 'sans-serif' },
  msgSubmitBtn: { background: '#ff3c78', color: '#fff', border: 'none', padding: '14px', borderRadius: '30px', fontSize: '16px', fontWeight: '600', transition: '0.3s', alignSelf: 'flex-start', minWidth: '160px', marginTop: '5px' }
};