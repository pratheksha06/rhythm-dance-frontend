import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Programs() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/classes')
      .then(res => {
        setPrograms(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={styles.center}>Loading elite dance styles...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>Explore Our <span style={{color: '#ff3c78'}}>Dance Programs</span></h1>
      <p style={styles.subtitle}>Discover your rhythm with industry leading professional instructors</p>

      <div style={styles.grid}>
        {programs.map((program) => {
          // 1. SAFELY READ THE ADMIN LINK IN JAVASCRIPT BEFORE THE RETURN BLOCK
          const cardImage = program.programImageUrl || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500';
          
          return (
            <div key={program._id || program.id} style={styles.card}>
              {/* 2. PLACED BEAUTIFULLY INSIDE YOUR VISUAL LAYOUT ROUTE */}
              <div style={{ ...styles.cardImage, backgroundImage: `url(${cardImage})` }} />
              
              <div style={styles.cardContent}>
                <span style={styles.cardTag}>{program.danceStyle || 'Dance Discipline'}</span>
                <h3 style={styles.cardTitle}>{program.className || 'Untitled Style'}</h3>
                
                {/* Truncated description field to prevent content boxes from skewing sizes */}
                <p style={styles.cardDescription}>
                  {program.description || 'No overview configured for this style yet.'}
                </p>
                
                <button style={styles.learnMoreBtn} onClick={() => setSelectedProgram(program)}>
                  Learn More &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pop-up Details Modal Window */}
      {selectedProgram && (
        <div style={styles.modalOverlay} onClick={() => setSelectedProgram(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ ...styles.modalImage, backgroundImage: `url(${selectedProgram.programImageUrl || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600'})` }} />
            <div style={styles.modalBody}>
              <h2 style={styles.modalTitle}>{selectedProgram.className}</h2>
              <p style={styles.modalText}>{selectedProgram.description}</p>

              <div style={styles.instructorBox}>
                <p style={styles.insLabel}>ASSIGNED INSTRUCTOR</p>
                <h3 style={styles.insName}>{selectedProgram.instructor?.name || 'Assigned Expert'}</h3>
                <p style={styles.insExp}>{selectedProgram.instructorExperience || 'Experience: 10+ Years'}</p>
                <p style={styles.insBio}>{selectedProgram.instructor?.bio || 'Professional residency performance specialist.'}</p>
              </div>

              <div style={styles.modalActions}>
                <button style={styles.backBtn} onClick={() => setSelectedProgram(null)}>Back to Overview</button>
                <button style={styles.registerBtn} onClick={() => navigate('/registration', { state: { selectedClass: selectedProgram } })}>Confirm & Register Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#0a0a0a', color: 'white', padding: '120px 5% 60px 5%', fontFamily: "'Poppins', sans-serif" },
  mainTitle: { textAlign: 'center', fontSize: '36px', fontWeight: '700', margin: '0 0 10px 0' },
  subtitle: { textAlign: 'center', color: '#aaa', fontSize: '15px', marginBottom: '50px' },
  center: { minHeight: '100vh', backgroundColor: '#0a0a0a', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' },
  
  card: { backgroundColor: '#141414', borderRadius: '15px', border: '1px solid #222', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '420px' },
  cardImage: { height: '180px', minHeight: '180px', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%' },
  cardContent: { padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 },
  cardTag: { color: '#ff3c78', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' },
  cardTitle: { fontSize: '22px', fontWeight: '600', margin: '0 0 8px 0', color: '#fff' },
  cardDescription: { color: '#aaa', fontSize: '13px', lineHeight: '1.5', margin: '0 0 15px 0', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', height: '58px' },
  learnMoreBtn: { background: 'none', border: 'none', color: '#fff', fontSize: '14px', fontWeight: '500', cursor: 'pointer', padding: 0, marginTop: 'auto', textAlign: 'left', width: 'fit-content' },
  
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: '#141414', border: '1px solid #282828', width: '100%', maxWidth: '500px', borderRadius: '20px', overflow: 'hidden' },
  modalImage: { height: '200px', backgroundSize: 'cover', backgroundPosition: 'center' },
  modalBody: { padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' },
  modalTitle: { fontSize: '26px', fontWeight: '700', margin: 0, textAlign: 'center' },
  modalText: { color: '#ccc', fontSize: '14px', lineHeight: '1.6', margin: 0, textAlign: 'center' },
  instructorBox: { backgroundColor: '#1c1c1c', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '15px' },
  insLabel: { color: '#666', fontSize: '10px', fontWeight: '700', textAlign: 'center', margin: '0 0 6px 0' },
  insName: { color: '#ff3c78', fontSize: '18px', fontWeight: '600', textAlign: 'center', margin: '0 0 2px 0' },
  insExp: { color: '#aaa', fontSize: '12px', textAlign: 'center', margin: '0 0 8px 0' },
  insBio: { color: '#999', fontSize: '13px', textAlign: 'center', margin: 0, lineHeight: '1.4' },
  modalActions: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' },
  backBtn: { background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '14px' },
  registerBtn: { background: '#ff3c78', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }
};