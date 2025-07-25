
import { useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import "../styles/globals.css";

export default function IndochinaQuestApp() {
  const [filter, setFilter] = useState("All");

  const quests = [
    {
      country: "Laos",
      type: "Main Quest",
      title: "Echoes of the Golden Monks",
      location: "Luang Prabang",
      duration: "Half Day",
      xp: "400 XP",
      description: "Witness the sacred morning alms ritual and climb Mount Phousi."
    },
    {
      country: "Laos",
      type: "Side Quest",
      title: "Waterfall Waltz",
      location: "Kuang Si Falls",
      duration: "Half Day",
      xp: "250 XP",
      description: "Swim beneath Kuang Si’s turquoise cascades."
    }
  ];

  const filtered = filter === "All" ? quests : quests.filter(q => q.country === filter);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🌏 Indochina Questbook</h1>
      <div className="flex justify-center gap-4 mb-4">
        {["All", "Laos", "Cambodia", "Vietnam"].map(c => (
          <Button key={c} onClick={() => setFilter(c)}>{c}</Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((q, i) => (
          <Card key={i} className="shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{q.title}</h2>
                <span className="text-sm italic text-gray-500">{q.type}</span>
              </div>
              <p className="text-gray-700 my-2">{q.description}</p>
              <div className="text-sm text-gray-600">
                📍 {q.location} | ⏱ {q.duration} | ✨ {q.xp}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-2">🗺️ Route & Map</h2>
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1keaf_ShloMMXen8BvXcSQ96eGOua8NE&ehbc=2E312F"
          width="100%"
          height="500"
          className="border rounded-md"
        ></iframe>
      </div>
    </div>
  );
}
