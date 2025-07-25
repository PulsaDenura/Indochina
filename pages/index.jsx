import quests from '../data/quests.json';

export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌏 Indochina Travel Questbook</h1>
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
          backgroundColor: '#fff'
        }}>
          <h2>{q.type === "Main" ? "🎯 " : "🛤️ "} {q.title}</h2>
          <p><strong>📍</strong> {q.location} | <strong>⏱</strong> {q.duration} | <strong>✨</strong> {q.xp} XP</p>
          <p>{q.description}</p>
          <p><strong>🎒 Gear:</strong> {q.gear}</p>
        </div>
      ))}
    </div>
  );
}