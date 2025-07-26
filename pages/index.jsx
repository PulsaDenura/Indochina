import { useState, useEffect } from 'react';
import quests from '../data/quests.json';

export default function Home() {
  const getInitialChecked = (quests) => {
    const saved = localStorage.getItem('checkedQuests');
    return saved ? JSON.parse(saved) : quests.reduce((acc, q, i) => ({ ...acc, [i]: q.checked || false }), {});
  };

  const getInitialDarkMode = () => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  };

  const [checkedQuests, setCheckedQuests] = useState(() => getInitialChecked(quests));
  const [darkMode, setDarkMode] = useState(() => getInitialDarkMode());
  const [expandedCountries, setExpandedCountries] = useState(() =>
    [...new Set(quests.map(q => q.country))].reduce((acc, country) => ({ ...acc, [country]: true }), {})
  );
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    localStorage.setItem('checkedQuests', JSON.stringify(checkedQuests));
  }, [checkedQuests]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

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
    if (xp >= 3000) return { title: '🧙 Ascended Voyager', badge: 'gold', next: null };
    if (xp >= 1500) return { title: '🧭 Questing Explorer', badge: 'silver', next: 3000 };
    if (xp >= 501) return { title: '🚶 Wandering Pilgrim', badge: 'bronze', next: 1500 };
    return { title: '🎒 Novice Nomad', badge: 'starter', next: 501 };
  };

  const badgeColors = {
    starter: '#aaa',
    bronze: '#cd7f32',
    silver: '#c0c0c0',
    gold: '#ffd700'
  };

  const { title, badge, next } = getLevel(totalXP);

  const grouped = quests.reduce((acc, q, i) => {
    if (!acc[q.country]) acc[q.country] = [];
    acc[q.country].push({ ...q, index: i });
    return acc;
  }, {});

  const countryTitles = {
    'Laos': '🌊 Kingdom of Rivers and Mist',
    'Vietnam': '🐉 Lands of the Dragon’s Breath',
    'Cambodia': '🌿 Realm of Jungle Temples'
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

  const handleAnchorClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ padding: 'clamp(1rem, 4vw, 2rem)', fontFamily: 'sans-serif', ...themeStyles }}>
      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: themeStyles.backgroundColor,
        zIndex: 10,
        paddingBottom: '0.5rem',
        paddingTop: '1rem',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}>🌏 איש קטן בעולם הגדול</h1>
          <button onClick={() => setDarkMode(!darkMode)} style={{ padding: '0.5rem 1rem' }}>
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginTop: '0.5rem' }}>
          <div>
            <strong>Filter by Type:</strong>{' '}
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="All">All</option>
              <option value="Main">Main</option>
              <option value="Side">Side</option>
            </select>
          </div>
          <div>{Object.keys(grouped).map((country) => (
            <button
              key={country}
              onClick={() => handleAnchorClick(country)}
              style={{ marginRight: '0.5rem', padding: '0.3rem 0.6rem' }}
            >
              {countryFlags[country]} {country}
            </button>
          ))}</div>
        </div>

        <div style={{ marginBottom: '1rem', marginTop: '0.5rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>🏅 XP Progress: {totalXP} / {maxXP} XP ({percent}%)</div>
          <div style={{ height: '20px', background: '#eee', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${percent}%`, height: '100%', background: '#4caf50' }}></div>
          </div>
          <div style={{
            marginTop: '0.5rem',
            display: 'inline-block',
            padding: '0.3rem 0.6rem',
            borderRadius: '10px',
            backgroundColor: badgeColors[badge],
            color: badge === 'starter' ? '#000' : '#000',
            fontWeight: 'bold'
          }}>
            {title}
          </div>
          {next && <div style={{ marginTop: '0.3rem' }}>🧱 {next - totalXP} XP to next level</div>}
        </div>
      </div>

      <iframe
        src="https://www.google.com/maps/d/embed?mid=1keaf_ShloMMXen8BvXcSQ96eGOua8NE&ehbc=2E312F"
        width="100%"
        height="360"
        style={{ border: 0, borderRadius: '12px', marginBottom: '2rem' }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>

      {Object.entries(grouped).map(([country, quests]) => {
        const { earned, total, percent } = getCountryXP(quests);
        const visibleQuests = quests.filter(q => filterType === 'All' || q.type === filterType);
        return (
          <div key={country} id={country} style={{ marginBottom: '2rem' }}>
            <h2
              onClick={() => toggleCountry(country)}
              style={{
                fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                marginBottom: '1rem',
                cursor: 'pointer',
                background: darkMode ? '#1e1e1e' : '#f0f0f0',
                padding: '0.5rem 1rem',
                borderRadius: '6px'
              }}
            >
              {expandedCountries[country] ? '▼' : '▶'} {countryTitles[country] || country}
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
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <input
                  type="checkbox"
                  checked={checkedQuests[q.index]}
                  onChange={() => toggleCheckbox(q.index)}
                  style={{ transform: 'scale(1.3)', marginTop: '5px' }}
                />
                <div>
                  <p>{countryFlags[q.country] || ''} {q.country}</p>
                  <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', margin: '0.3rem 0' }}>{q.type === "Main" ? "🎯" : "🛤️"} {q.title}</h2>
                  <p style={{ margin: '0.2rem 0' }}><strong>📍</strong> {q.location} | <strong>⏱</strong> {q.duration} | <strong>✨</strong> {q.xp} XP</p>
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
