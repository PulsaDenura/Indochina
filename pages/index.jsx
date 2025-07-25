import { useState } from 'react';
import quests from '../data/quests.json';

export default function Home() {
  const [checkedQuests, setCheckedQuests] = useState(() =>
    quests.reduce((acc, q, i) => ({ ...acc, [i]: q.checked || false }), {})
  );

  const [expandedCountries, setExpandedCountries] = useState(() =>
    [...new Set(quests.map(q => q.country))].reduce((acc, country) => ({ ...acc, [country]: true }), {})
  );

  const toggleCheckbox = (index) => {
    setCheckedQuests((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleCountry = (country) => {
    setExpandedCountries((prev) => ({ ...prev, [country]: !prev[country] }));
  };

  const totalXP = quests.reduce((sum, q, i) => sum + (checkedQuests[i] ? parseInt(q.xp) : 0), 0);
  const maxXP = quests.reduce((sum, q) => sum + parseInt(q.xp), 0);
  const percent = Math.floor((totalXP / maxXP) * 100);

  const grouped = quests.reduce((acc, q, i) => {
    if (!acc[q.country]) acc[q.country] = [];
    acc[q.country].push({ ...q, index: i });
    return acc;
  }, {});

  const countryTitles = {
    'Laos': '🦣 Kingdom of the Million Elephants',
    'Vietnam': '🐉 Realm of the Ascending Dragon',
    'Cambodia': '🛕 Empire of Temples'
  };

  const countryFlags = {
    'Laos': '🇱🇦',
    'Vietnam': '🇻🇳',
    'Cambodia': '🇰🇭'
  };

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

      {Object.entries(grouped).map(([country, quests]) => (
        <div key={country} style={{ marginBottom: '2rem' }}>
          <h2
            onClick={() => toggleCountry(country)}
            style={{
              fontSize: '1.5rem',
              marginBottom: '1rem',
              cursor: 'pointer',
              background: '#f0f0f0',
              padding: '0.5rem 1rem',
              borderRadius: '6px'
            }}
          >
            {expandedCountries[country] ? '▼' : '▶'} {countryFlags[country] || ''} {countryTitles[country] || country}
          </h2>
          {expandedCountries[country] && quests.map((q) => (
            <div key={q.index} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'start',
              gap: '1rem'
            }}>
              <input type="checkbox" checked={checkedQuests[q.index]} onChange={() => toggleCheckbox(q.index)} />
              <div>
                <p><strong>🗺️ Country:</strong> {countryFlags[q.country] || ''} {q.country}</p>
                <h2>{q.type === "Main" ? "🎯" : "🛤️"} {q.title}</h2>
                <p><strong>📍</strong> {q.location} | <strong>⏱</strong> {q.duration} | <strong>✨</strong> {q.xp} XP</p>
                <p>{q.description}</p>
                <p><strong>🎒 Gear:</strong> {q.gear}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
