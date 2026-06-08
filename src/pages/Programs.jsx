import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Comprehensive dataset with corresponding instructors, full details, and optimized live imagery
const programData = [
  { 
    id: 1, 
    name: 'Hip Hop', 
    text: 'Learn powerful hip hop moves, freestyle techniques, and stage performance.', 
    img: 'https://i.pinimg.com/736x/57/64/d3/5764d37e09a07b024613a05368a98738.jpg',
    details: 'Master foundational bounce, body isolations, complex routine transitions, and freestyle battle dynamics. This course focuses heavily on street authenticity and musical syncopation.',
    instructor: { name: 'Marcus "Wave" Carter', experience: '8+ Years', bio: 'Former back-up dancer for elite global artists and specialist in pop-and-lock mechanics.' }
  },
  { 
    id: 2, 
    name: 'Ballet', 
    text: 'Improve flexibility, grace, and classical dance fundamentals with expert trainers.', 
    img: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=600',
    details: 'Develop absolute alignment, point technique, turn discipline, and classical storytelling grace. Perfect for building profound core stability and posture.',
    instructor: { name: 'Elena Rostova', experience: '12+ Years', bio: 'Classically trained prima ballerina with extensive performance history in European theater tours.' }
  },
  { 
    id: 3, 
    name: 'Contemporary', 
    text: 'Express emotions through modern contemporary choreography and movement.', 
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvcX0IJhW-3xZ5qv1bNwFceOreEWGXk26jeQ&s',
    details: 'Express raw emotional narratives through fluid floor extensions, weight manipulation, and abstract kinetic breath control.',
    instructor: { name: 'Sarah Jenkins', experience: '6+ Years', bio: 'Juilliard graduate specializing in modern expressive release techniques and spatial staging.' }
  },
  { 
    id: 4, 
    name: 'Jazz', 
    text: 'Improve flexibility, grace, and classical dance fundamentals with expert trainers.', 
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTivFgAmOWwpggVXLKAAvtID8kjgsgY2uJHw&s',
    details: 'Blend explosive syncopations, dramatic leaps, turns, and broad commercial showmanship styles into high-velocity routines.',
    instructor: { name: 'David Vance', experience: '9+ Years', bio: 'Broadway theater veteran passionate about classic jazz rhythms and high-impact stage presence.' }
  },
  { 
    id: 5, 
    name: 'Salsa', 
    text: 'Improve flexibility, grace, and classical dance fundamentals with expert trainers.', 
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600',
    details: 'Lock into fast-paced Latin syncopation steps, dynamic multi-directional partner spins, and authentic timing patterns.',
    instructor: { name: 'Carlos & Sofia', experience: '10+ Years Duo', bio: 'International Latin Congress champions dedicated to authentic timing, leading, and following.' }
  },
  { 
    id: 6, 
    name: 'K-Pop', 
    text: 'Improve flexibility, grace, and classical dance fundamentals with expert trainers.', 
    img: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=600',
    details: 'Learn official high-energy dynamic configurations, facial performance rules, and sharp team synchronization routines directly from current global hits.',
    instructor: { name: 'Ji-Min Park', experience: '5+ Years', bio: 'Seoul agency background training prospective idols in hyper-synchronized formation routines.' }
  },
  { 
    id: 7, 
    name: 'Break dance', 
    text: 'Improve flexibility, grace, and classical dance fundamentals with expert trainers.', 
    img: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=600',
    details: 'Build gravity-defying athletic conditioning. Master power-moves, floor footwork patterns, spins, freezes, and drops safely.',
    instructor: { name: 'B-Boy Rush', experience: '11+ Years', bio: 'Red Bull BC One regional contender specializing in complex power-move combinations.' }
  },
  { 
    id: 8, 
    name: 'Traditional', 
    text: 'Improve flexibility, grace, and classical dance fundamentals with expert trainers.', 
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbioABgAwNhmN2GJqqyMymml6-UYnCi34w4g&s',
    details: 'Connect deeply with structural heritage roots, exploring classical rhythmic folk syncopations, traditional postures, and cultural storytelling beats.',
    instructor: { name: 'Amara Devi', experience: '15+ Years', bio: 'National heritage fellow specializing in classical regional storytelling and traditional mudras.' }
  }
];

export default function Programs() {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState(null);

  return (
    <div style={styles.container}>
      <style>{`
        .program-card { transition: all 0.3s ease; cursor: pointer; }
        .program-card:hover { transform: translateY(-5px); border-color: #ff3c78 !important; box-shadow: 0 10px 20px rgba(255, 60, 120, 0.1); }
        .modal-btn { transition: background 0.2s; }
        .modal-close:hover { color: #ff3c78 !important; }
      `}</style>

      <h2 style={styles.mainTitle}>Our Dance Programs</h2>
      <p style={styles.subTitle}>Choose your favorite dance style and start your journey today.</p>
      
      <div style={styles.grid}>
        {programData.map((item) => (
          <div 
            key={item.id} 
            className="program-card" 
            style={styles.card}
            onClick={() => setSelectedProgram(item)}
          >
            <div style={styles.imgWrapper}>
              <img src={item.img} alt={item.name} style={styles.img} />
            </div>
            <div style={styles.content}>
              <h3 style={styles.cardTitle}>{item.name}</h3>
              <p style={styles.cardText}>{item.text}</p>
              <div style={styles.learnMoreLink}>Learn More & Register ➜</div>
            </div>
          </div>
        ))}
      </div>

      {/* INTERACTIVE COMPONENT MODAL OVERLAY */}
      {selectedProgram && (
        <div style={styles.modalOverlay} onClick={() => setSelectedProgram(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" style={styles.closeBtn} onClick={() => setSelectedProgram(null)}>✕</span>
            
            <div style={styles.modalBody}>
              <img src={selectedProgram.img} alt={selectedProgram.name} style={styles.modalImg} />
              
              <div style={styles.modalInfoGrid}>
                <div>
                  <h3 style={styles.modalTitle}>{selectedProgram.name}</h3>
                  <p style={styles.modalDetailsText}>{selectedProgram.details}</p>
                </div>

                <div style={styles.instructorBox}>
                  <h4 style={styles.instructorTitle}>Assigned Instructor</h4>
                  <div style={{ fontWeight: '600', color: '#ff3c78', marginBottom: '4px' }}>{selectedProgram.instructor.name}</div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Experience: {selectedProgram.instructor.experience}</div>
                  <p style={{ fontSize: '13px', color: '#aaa', margin: 0, lineHeight: '1.4' }}>{selectedProgram.instructor.bio}</p>
                </div>
              </div>

              <div style={styles.modalFooter}>
                <button style={styles.cancelBtn} onClick={() => setSelectedProgram(null)}>Back to Overview</button>
                <button 
                  className="modal-btn" 
                  style={styles.registerBtn} 
                  onClick={() => {
                    localStorage.setItem('selectedClass', selectedProgram.name);
                    navigate('/registration');
                  }}
                >
                  Confirm & Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '40px 5% 80px', background: '#0a0a0a', color: 'white', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" },
  mainTitle: { fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '10px', letterSpacing: '0.5px' },
  subTitle: { fontSize: '14px', color: '#666', textAlign: 'center', marginBottom: '50px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' },
  card: { background: '#141414', borderRadius: '16px', overflow: 'hidden', border: '1px solid #222', display: 'flex', flexDirection: 'column' },
  imgWrapper: { width: '100%', height: '180px', background: '#1f1f1f' },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  content: { padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 },
  cardTitle: { fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'white' },
  cardText: { fontSize: '13px', color: '#888', lineHeight: '1.5', marginBottom: '15px', flexGrow: 1 },
  learnMoreLink: { fontSize: '13px', color: '#ff3c78', fontWeight: '600', marginTop: 'auto' },
  
  // MODAL LAYOUT BLUEPRINTS
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, padding: '20px', boxSizing: 'border-box' },
  modalContent: { background: '#111', borderRadius: '20px', width: '100%', maxWidth: '640px', border: '1px solid #282828', position: 'relative', overflow: 'hidden', animation: 'fadeIn 0.2s ease-out' },
  closeBtn: { position: 'absolute', top: '15px', right: '20px', color: '#aaa', fontSize: '20px', cursor: 'pointer', zIndex: 10 },
  modalBody: { display: 'flex', flexDirection: 'column' },
  modalImg: { width: '100%', height: '240px', objectFit: 'cover', borderBottom: '1px solid #222' },
  modalInfoGrid: { padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' },
  modalTitle: { fontSize: '26px', fontWeight: '700', margin: '0 0 10px 0', color: 'white' },
  modalDetailsText: { fontSize: '14px', color: '#aaa', lineHeight: '1.6', margin: 0 },
  instructorBox: { background: '#161616', padding: '16px', borderRadius: '12px', border: '1px solid #222' },
  instructorTitle: { fontSize: '14px', fontWeight: '600', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' },
  modalFooter: { padding: '0 30px 30px', display: 'flex', justifyContent: 'flex-end', gap: '12px' },
  cancelBtn: { background: 'transparent', color: '#aaa', border: 'none', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
  registerBtn: { background: '#ff3c78', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }
};