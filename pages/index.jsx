import { useState } from 'react';
import quests from '../data/quests.json';

export default function Home() {
  const [checkedQuests, setCheckedQuests] = useState(() =>
    quests.reduce((acc, q, i) => ({ ...acc, [i]: q.checked || false }), {})
  );

  const [expandedCountries, setExpandedCountries] = useState(() =>
    [...new Set(quests.map(q => q.country))].reduce((acc, country) => ({ ...acc, [country]: true }), {})
  );

  const [filterType, setFilterType] = useState('All');
  const [darkMode, setDarkMode] = useState(false);

  const toggleCheckbox = (index) => {
    setCheckedQuests((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleCountry = (country) => {
    setExpandedCountries((prev) => ({ ...prev, [country]: !prev[country] }));
  };

  const totalXP = quests.reduce((sum, q, i) => sum + (checkedQuests[i] ? parseInt(q.xp) : 0), 0);
  const maxXP = quests.reduce((sum, q) => sum + parseInt(q.xp), 0);
  const percent = Math.floor((totalXP / maxXP) * 100);

  const getLevel = (xp) => {
    if (xp >= 3000) return '🧙 Ascended Voyager';
    if (xp >= 1500) return '🧭 Questing Explorer';
    if (xp >= 501) return '🚶 Wandering Pilgrim';
    return '🎒 Novice Nomad';
  };

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

  const getCountryXP = (quests) => {
    const total = quests.reduce((sum, q) => sum + parseInt(q.xp), 0);
    const earned = quests.reduce((sum, q) => sum + (checkedQuests[q.index] ? parseInt(q.xp) : 0), 0);
    const percent = Math.floor((earned / total) * 100);
    return { total, earned, percent };
  };

  const themeStyles = {
    backgroundColor: darkMode ? '#121212' : '#f9f9f9',
    color: darkMode ? '#e0e0e0' : '#121212'
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', ...themeStyles }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌏 Indochina Travel Questbook</h1>
        <button onClick={() => setDarkMode(!darkMode)} style={{ padding: '0.5rem 1rem' }}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <strong>Filter by Type:</strong>{' '}
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="All">All</option>
          <option value="Main">Main</option>
          <option value="Side">Side</option>
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>🏆 Traveler Rank: {getLevel(totalXP)}</div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '0.5rem' }}>🏅 XP Progress: {totalXP} / {maxXP} XP ({percent}%)</div>
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

      {Object.entries(grouped).map(([country, quests]) => {
        const { earned, total, percent } = getCountryXP(quests);
        const visibleQuests = quests.filter(q => filterType === 'All' || q.type === filterType);
        return (
          <div key={country} style={{ marginBottom: '2rem' }}>
            <h2
              onClick={() => toggleCountry(country)}
              style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                cursor: 'pointer',
                background: darkMode ? '#1e1e1e' : '#f0f0f0',
                padding: '0.5rem 1rem',
                borderRadius: '6px'
              }}
            >
              {expandedCountries[country] ? '▼' : '▶'} {countryFlags[country] || ''} {countryTitles[country] || country}
            </h2>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ marginBottom: '0.3rem' }}>🎯 {earned} / {total} XP ({percent}%)</div>
              <div style={{ height: '14px', background: '#eee', borderRadius: '7px', overflow: 'hidden' }}>
                <div style={{ width: `${percent}%`, height: '100%', background: '#2196f3' }}></div>
              </div>
            </div>

            {expandedCountries[country] && visibleQuests.map((q) => (
              <div key={q.index} style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
                backgroundColor: darkMode ? '#1f1f1f' : '#fff',
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
        );
      })}
    </div>
  );
}
