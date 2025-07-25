
// Travel Quest Web App with Embedded KMZ Viewer
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, CheckCircle, Clock } from "lucide-react";

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
  // Add more quests here
];

export default function IndochinaQuestApp() {
  const [filter, setFilter] = useState("All");

  const filteredQuests =
    filter === "All" ? quests : quests.filter(q => q.country === filter);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🌏 Indochina Questbook</h1>
      <div className="flex justify-center gap-4 mb-4">
        {["All", "Laos", "Cambodia", "Vietnam"].map(c => (
          <Button key={c} onClick={() => setFilter(c)}>{c}</Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuests.map((quest, i) => (
          <Card key={i} className="shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{quest.title}</h2>
                <span className="text-sm italic text-gray-500">{quest.type}</span>
              </div>
              <p className="text-gray-700 my-2">{quest.description}</p>
              <div className="text-sm text-gray-600 flex gap-2 items-center">
                <MapPin className="h-4 w-4" /> {quest.location}
                <Clock className="h-4 w-4 ml-4" /> {quest.duration}
                <CheckCircle className="h-4 w-4 ml-4" /> {quest.xp}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-2">🗺️ Route & Map</h2>
        <p className="text-sm text-gray-600 mb-4">
          Your full KMZ route file: <a className="text-blue-600 underline" href="https://yourhost.com/60-Days-INDOCHINA.kmz" target="_blank" rel="noopener noreferrer">60-Days-INDOCHINA.kmz</a>
        </p>
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
