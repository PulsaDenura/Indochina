import { useState } from 'react';
import quests from '../data/quests.json';

export default function Home() {
  const [checkedQuests, setCheckedQuests] = useState(() =>
    quests.reduce((acc, q, i) => ({ ...acc, [i]: q.checked || false }), {})
  );

  const toggleCheckbox = (index) => {
    setCheckedQuests((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const totalXP = quests.reduce((sum, q, i) => sum + (checkedQuests[i] ? parseInt(q.xp) : 0), 0);
  const maxXP = quests.reduce((sum, q) => sum + parseInt(q.xp), 0);
  const percent = Math.floor((totalXP / maxXP) * 100);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌏 Indochina Travel Questbook</h1>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>🏆 XP Progress: {totalXP} / {maxXP} XP ({percent}%)</div>
        <div style={{ height: '20px', background: '#eee', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${percent}%`, height: '100%', background: '#4caf50' }}></div>
        </div>
      </div>

      <iframe
        src="https://www.google.com/maps/d/embed?mid=1keaf_ShloMMXen8BvXcSQ96eGOua8NE&ehbc=2E312F"
        width="100%"
        height="480"
        style={{ border: 0, borderRadius: '12px', marginBottom: '2rem' }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>

      {quests.map((q, i) => (
        <div key={i} style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'start',
          gap: '1rem'
        }}>
          <input type="checkbox" checked={checkedQuests[i]} onChange={() => toggleCheckbox(i)} />
          <div>
            <p><strong>🗺️ Country:</strong> {q.country}</p>
            <h2>{q.type === "Main" ? "🎯" : "🛤️"} {q.title}</h2>
            <p><strong>📍</strong> {q.location} | <strong>⏱</strong> {q.duration} | <strong>✨</strong> {q.xp} XP</p>
            <p>{q.description}</p>
            <p><strong>🎒 Gear:</strong> {q.gear}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
