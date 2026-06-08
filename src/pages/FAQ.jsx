import React, { useState } from 'react';

const faqData = [
  { q: "Do I need prior dance experience?", a: "No. We welcome beginners, intermediate learners, and advanced dancers. Our trainers guide students according to their skill levels." },
  { q: "What dance styles do you teach?", a: "We provide deep structural classes covering Hip Hop, Classical Ballet, Jazz, Contemporary choreography, and Latin Fusion/Salsa." },
  { q: "What are the available class timings?", a: "Classes run across flexible batches: Morning slots (7 AM - 10 AM) and Evening groups (4 PM - 9 PM) on weekdays and weekends." },
  { q: "Can I attend trial classes?", a: "Yes! Every new user can select and attend one premium introductory style session for free before final registration." },
  { q: "How many days can I attend classes in a week?", a: "Standard plans unlock 3 specialized sessions weekly, while advanced premium plans allow unlimited structural studio access." },
  { q: "Do you conduct stage performances?", a: "Absolutely! We organize a high-production semi-annual dance showcase event where all students display their routines on a professional theater stage." }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Frequently Asked Questions</h2>
      <p style={styles.subtitle}>Everything you need to know about Rhythm Dance Academy</p>

      <div style={styles.wrapper}>
        {faqData.map((item, i) => {
          const isOpen = activeIndex === i;
          return (
            <div key={i} style={styles.item}>
              <div 
                onClick={() => setActiveIndex(isOpen ? null : i)}
                style={{ ...styles.questionBar, background: isOpen ? '#ff3c78' : '#161616' }}
              >
                <span style={styles.qText}>{item.q}</span>
                <span style={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
              </div>
              {isOpen && (
                <div style={styles.answerBar}>
                  <p style={styles.aText}>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '60px 5%', background: '#0a0a0a', minHeight: '100vh', color: 'white', fontFamily: "'Poppins', sans-serif" },
  title: { fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '10px' },
  subtitle: { fontSize: '14px', color: '#666', textAlign: 'center', marginBottom: '50px' },
  wrapper: { maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' },
  item: { borderRadius: '8px', overflow: 'hidden' },
  questionBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 25px', cursor: 'pointer', transition: 'background 0.2s ease' },
  qText: { fontSize: '15px', fontWeight: '500', color: 'white' },
  arrow: { fontSize: '12px', color: 'white' },
  answerBar: { background: '#1f1f1f', padding: '20px 25px', borderTop: '1px solid #2a2a2a' },
  aText: { fontSize: '14px', color: '#aaa', lineHeight: '1.6', margin: 0 }
};