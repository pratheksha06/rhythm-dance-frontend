import React from 'react';

export default function AboutUs() {
  return (
    <div style={styles.container}>
      <h2 style={styles.headerTitle}>About Vibe Dance Academy</h2>
      <p style={styles.headerSub}>Where passion meets movement and dreams take center stage.</p>

      {/* VISION BLOCK */}
      <div style={styles.row}>
        <div style={styles.imageBlock}>
          <img src="https://static.royacdn.com/Site-acd43afb-bc1d-4062-9a5b-83fa4878eaea/myopia_assets/img_1.png" alt="Vision" style={styles.img} />
        </div>
        <div style={styles.textBlock}>
          <h3 style={styles.sectionTitle}>Our Vision</h3>
          <p style={styles.p}>At Vibe Dance Academy, we envision a world where dance is a universal language that connects people, transcends boundaries, and empowers individuals to express their authentic selves.</p>
          <p style={styles.p}>We strive to be a catalyst for artistic innovation, nurturing the next generation of dancers who will shape the future of performing arts with creativity, technical excellence, and passion.</p>
        </div>
      </div>

      {/* MISSION BLOCK */}
      <div style={{ ...styles.row, flexDirection: 'row-reverse' }}>
        <div style={styles.imageBlock}>
          <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=500" alt="Mission" style={styles.img} />
        </div>
        <div style={styles.textBlock}>
          <h3 style={styles.sectionTitle}>Our Mission</h3>
          <p style={styles.p}>Our mission is to provide exceptional dance education that inspires creativity, builds confidence, and develops technical proficiency in a supportive and inclusive environment.</p>
          <p style={styles.p}>We are committed to offering diverse dance styles, experienced instruction, and performance opportunities that allow every student to discover their unique artistic voice and thrive as dancers.</p>
        </div>
      </div>

      {/* CORE VALUES */}
      <div style={{ marginTop: '80px' }}>
        <h3 style={{ ...styles.sectionTitle, textAlign: 'center', marginBottom: '40px' }}>Our Core Values</h3>
        <div style={styles.grid}>
          {['Excellence', 'Creativity', 'Community', 'Passion', 'Growth', 'Respect'].map((value, i) => (
            <div key={i} style={styles.valueCard}>
              <h4 style={styles.cardHeading}>{value}</h4>
              <p style={{ color: '#888', fontSize: '13px', lineHeight: '1.4' }}>We strive to maintain the highest standards across every element of performing art education.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { background: '#0e131f', padding: '60px 10%', color: 'white', minHeight: '100vh', fontFamily: "'Poppins', sans-serif" },
  headerTitle: { fontSize: '32px', fontWeight: '700', textAlign: 'center', marginBottom: '6px' },
  headerSub: { fontSize: '13px', color: '#6b7280', textAlign: 'center', marginBottom: '60px' },
  row: { display: 'flex', gap: '50px', alignItems: 'center', marginBottom: '60px', flexWrap: 'wrap' },
  imageBlock: { flex: 1, minWidth: '300px' },
  img: { width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px' },
  textBlock: { flex: 1, minWidth: '300px' },
  sectionTitle: { fontSize: '24px', fontWeight: '700', color: '#fff', marginBottom: '20px' },
  p: { color: '#9ca3af', fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' },
  valueCard: { background: '#111827', padding: '25px', borderRadius: '8px', borderLeft: '3px solid #f59e0b' },
  cardHeading: { fontSize: '16px', fontWeight: '600', marginBottom: '8px' }
};