import React, { useState, useEffect } from 'react';
import axios from 'axios';

const staticInstructors = [
  {
    id: 1,
    name: "Marcus 'Matrix' Vance",
    style: "Hip Hop & Street Styles",
    phone: "+1 (555) 019-8831",
    email: "marcus.v@rhythmdance.com",
    achievements: "2x World Dance Music Awards Choreographer of the Year, Finalist on 'So You Think You Can Dance'.",
    bio: "Marcus has spent over a decade touring with global pop icons. He specializes in popping, locking, and advanced choreography, focusing intensely on musicality and performance presence.",
    image: "https://i.pinimg.com/236x/33/76/51/3376512b9f4ca10915b4a869f173914e.jpg"
  },
  {
    id: 2,
    name: "Elena Rostova",
    style: "Classical Ballet",
    phone: "+1 (555) 019-4422",
    email: "elena.r@rhythmdance.com",
    achievements: "Former Principal Dancer at the Royal Ballet Company, Vaganova Method Certified Specialist.",
    bio: "Trained in St. Petersburg, Elena brings world-class technical discipline to Rhythm. Her classes focus heavily on foundational core strength, posture mastery, and precise pointe work.",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=600"
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    style: "Contemporary & Lyrical",
    phone: "+1 (555) 019-5573",
    email: "sarah.j@rhythmdance.com",
    achievements: "BFA in Dance from Juilliard, Best Original Choreography winner at the NY Fringe Festival.",
    bio: "Sarah guides students through fluid emotional expression and abstract movement patterns. Her methodology explores floor work transitions, weight distribution, and deep creative improvisation.",
    image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=600"
  },
  {
    id: 4,
    name: "Carlos & Sofia Mendez",
    style: "Salsa & Latin Fusion",
    phone: "+1 (555) 019-9914",
    email: "latin.duo@rhythmdance.com",
    achievements: "World Latin Dance Cup Champions (Partner Division), Featured Performers at the Miami Salsa Congress.",
    bio: "Carlos and Sofia bring the ultimate partner chemistry and syncopated footwork mastery to the floor. They focus on complex spinning patterns, timing precision, and styling techniques.",
    image: "https://i.pinimg.com/170x/5c/0a/2c/5c0a2cb245eb8adabf93649aa28ed29b.jpg"
  }
];

export default function Instructors() {
  const [instructorData, setInstructorData] = useState(staticInstructors);

  // Resolve dynamic target API endpoint paths safely
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://rhythm-dance-backend-2.onrender.com';

  useEffect(() => {
    window.scrollTo(0, 0);
    // Updated to handle backend endpoints dynamically
    axios.get(`${API_BASE_URL}/api/users?role=instructor`)
      .then(res => {
        const dbInstructors = res.data
          .filter(u => u.role === 'instructor')
          .map(u => ({
            id: u._id,
            name: u.name,
            style: u.danceStyle || u.experienceLevel || 'Instructor',
            phone: u.phone || 'Contact via studio',
            email: u.email,
            achievements: u.bio || 'Professional dance instructor.',
            bio: u.bio || '',
            image: u.imageUrl || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600'
          }));
        setInstructorData([...staticInstructors, ...dbInstructors]);
      })
      .catch(err => console.error('Failed to load instructors:', err));
  }, [API_BASE_URL]);

  return (
    <div style={styles.container}>
      <style>{`
        .instructor-card {
          background: #141414;
          border: 1px solid #222;
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .instructor-card:hover {
          transform: translateY(-5px);
          border-color: #ff3c78;
        }
        .contact-link {
          color: #aaa;
          text-decoration: none;
          font-size: 13.5px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .contact-link:hover {
          color: #ff3c78;
        }
      `}</style>

      {/* Header section matching style layouts */}
      <header style={styles.header}>
        <h1 style={styles.mainTitle}>Meet Our <span style={{ color: '#ff3c78' }}>Elite Instructors</span></h1>
        <p style={styles.subtitle}>Learn from certified, world-class movement professionals dedicated to your growth</p>
      </header>

      {/* Instructors Showcase Grid */}
      <div style={styles.grid}>
        {instructorData.map((coach) => (
          <div key={coach.id} className="instructor-card">
            <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
              <img 
                src={coach.image} 
                alt={coach.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <span style={styles.badge}>{coach.style}</span>
            </div>

            <div style={styles.cardContent}>
              <h2 style={styles.coachName}>{coach.name}</h2>
              
              <div style={styles.metaSection}>
                <div style={{ marginBottom: '6px' }}>
                  <strong style={{ color: '#ff3c78', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Key Accomplishments:</strong>
                  <p style={styles.achievementText}>{coach.achievements}</p>
                </div>
                <p style={styles.bioText}>{coach.bio}</p>
              </div>

              <div style={styles.footerContact}>
                <a href={`tel:${coach.phone}`} className="contact-link">
                  <span>📞</span> {coach.phone}
                </a>
                <a href={`mailto:${coach.email}`} className="contact-link">
                  <span>✉️</span> Email Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: '#0a0a0a',
    minHeight: 'calc(100vh - 80px)',
    color: 'white',
    fontFamily: "'Poppins', sans-serif",
    padding: '60px 5% 100px',
    boxSizing: 'border-box'
  },
  header: {
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto 60px'
  },
  mainTitle: {
    fontSize: '40px',
    fontWeight: '700',
    margin: '0 0 15px 0',
    letterSpacing: '0.5px'
  },
  subtitle: {
    fontSize: '15px',
    color: '#888',
    lineHeight: '1.6',
    margin: 0
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  badge: {
    position: 'absolute',
    bottom: '15px',
    left: '15px',
    background: '#ff3c78',
    color: 'white',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.3px',
    boxShadow: '0 4px 12px rgba(255, 60, 120, 0.3)'
  },
  cardContent: {
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  coachName: {
    fontSize: '22px',
    fontWeight: '600',
    margin: '0 0 15px 0',
    color: '#fff'
  },
  metaSection: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    borderBottom: '1px solid #222',
    paddingBottom: '20px',
    marginBottom: '15px'
  },
  achievementText: {
    fontSize: '13px',
    color: '#eee',
    margin: '4px 0 0 0',
    lineHeight: '1.5',
    fontWeight: '500'
  },
  bioText: {
    fontSize: '13.5px',
    color: '#888',
    lineHeight: '1.6',
    margin: 0
  },
  footerContact: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px'
  }
};