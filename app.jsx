import { useState } from "react";  
import {  
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,  
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell  
} from "recharts";  
  
const players = [  
  { num: "11", name: "Jaquiaize Gant", gp: 20, ppg: 11.8, efg: 49.3, ast: 3.1, reb: 5.8, stl: 1.9, blk: 0.7, to: 2.1, fgPct: 47.8, threePct: 27.3, ftPct: 44.3, vps: 1.14 },  
  { num: "40", name: "Jeremy Cleveland", gp: 28, ppg: 12.3, efg: 39.1, ast: 2.4, reb: 6.9, stl: 3.5, blk: 0.3, to: 4.0, fgPct: 36.8, threePct: 17.3, ftPct: 57.9, vps: 0.99 },  
  { num: "2", name: "Cash Lanegrasse", gp: 29, ppg: 6.7, efg: 46.6, ast: 1.8, reb: 2.3, stl: 1.5, blk: 0.2, to: 2.0, fgPct: 34.0, threePct: 33.1, ftPct: 64.6, vps: 1.09 },  
  { num: "33", name: "Christian Bourgeois", gp: 29, ppg: 6.0, efg: 42.5, ast: 1.1, reb: 2.8, stl: 2.1, blk: 0.2, to: 1.9, fgPct: 39.0, threePct: 19.6, ftPct: 51.5, vps: 0.91 },  
  { num: "22", name: "Cody Torbert", gp: 26, ppg: 3.0, efg: 50.8, ast: 1.3, reb: 1.9, stl: 1.5, blk: 0.1, to: 1.7, fgPct: 50.0, threePct: 9.1, ftPct: 60.0, vps: 1.07 },  
  { num: "50", name: "Micah Nieves", gp: 27, ppg: 5.4, efg: 42.4, ast: 0.3, reb: 3.0, stl: 1.1, blk: 0.0, to: 1.6, fgPct: 39.1, threePct: 24.4, ftPct: 50.0, vps: 0.75 },  
  { num: "35", name: "Gavin Domangue", gp: 27, ppg: 2.4, efg: 29.8, ast: 0.9, reb: 1.7, stl: 0.6, blk: 0.1, to: 1.9, fgPct: 28.7, threePct: 7.4, ftPct: 50.0, vps: 0.80 },  
  { num: "5", name: "Tamyren Crandle", gp: 26, ppg: 2.5, efg: 35.7, ast: 1.1, reb: 2.2, stl: 1.0, blk: 0.0, to: 1.5, fgPct: 33.8, threePct: 23.1, ftPct: 60.0, vps: 0.89 },  
  { num: "4", name: "Tyreke Cooper", gp: 26, ppg: 2.4, efg: 36.0, ast: 0.8, reb: 2.4, stl: 1.8, blk: 0.1, to: 1.4, fgPct: 34.7, threePct: 8.0, ftPct: 40.0, vps: 0.75 },  
  { num: "24", name: "Zylan Folse", gp: 22, ppg: 2.1, efg: 41.0, ast: 0.1, reb: 2.0, stl: 0.7, blk: 0.0, to: 0.7, fgPct: 40.0, threePct: 100, ftPct: 33.3, vps: 0.74 },  
  { num: "1", name: "Alex Freeman", gp: 14, ppg: 0.9, efg: 31.3, ast: 0.4, reb: 0.4, stl: 0.2, blk: 0.1, to: 0.6, fgPct: 25.0, threePct: 28.6, ftPct: 66.7, vps: 0.75 },  
  { num: "20", name: "Peyton Hines", gp: 12, ppg: 0.9, efg: 50.0, ast: 0.2, reb: 1.1, stl: 0.2, blk: 0.0, to: 0.3, fgPct: 44.4, threePct: 50.0, ftPct: 22.2, vps: 1.09 },  
  { num: "42", name: "Kayden Melancon", gp: 11, ppg: 1.6, efg: 35.4, ast: 0.4, reb: 0.7, stl: 0.4, blk: 0.0, to: 0.2, fgPct: 29.2, threePct: 20.0, ftPct: 50.0, vps: 0.86 },  
];  
  
const ACCENT = "#F5A623";  
  
const normalize = (val, min, max) =>  
  Math.round(((val - min) / (max - min)) * 100);  
  
const getRadarData = (p) => [  
  { stat: "Scoring", value: normalize(p.ppg, 0, 13) },  
  { stat: "eFG%", value: normalize(p.efg, 25, 55) },  
  { stat: "Assists", value: normalize(p.ast, 0, 3.5) },  
  { stat: "Rebounds", value: normalize(p.reb, 0, 7) },  
  { stat: "Defense", value: normalize(p.stl + p.blk, 0, 4.5) },  
  { stat: "Ball Care", value: normalize(10 - p.to, 4, 10) },  
];  
  
export default function App() {  
  const [selected, setSelected] = useState(players[0]);  
  
  const scoringData = [...players]  
    .sort((a, b) => b.ppg - a.ppg)  
    .slice(0, 8);  
  
  return (  
    <div style={{ padding: 20, color: "#eee", background: "#060606", minHeight: "100vh" }}>  
      <h1>Central Lafourche Trojans</h1>  
  
      <div style={{ display: "flex", gap: 20 }}>  
        <div>  
          {players.map((p) => (  
            <div  
              key={p.name}  
              onClick={() => setSelected(p)}  
              style={{ cursor: "pointer", marginBottom: 8 }}  
            >  
              {p.name} — {p.ppg} PPG  
            </div>  
          ))}  
        </div>  
  
        <div style={{ width: 400 }}>  
          <h2>{selected.name}</h2>  
  
          <ResponsiveContainer width="100%" height={250}>  
            <RadarChart data={getRadarData(selected)}>  
              <PolarGrid />  
              <PolarAngleAxis dataKey="stat" />  
              <Radar dataKey="value" stroke={ACCENT} fill={ACCENT} fillOpacity={0.3} />  
            </RadarChart>  
          </ResponsiveContainer>  
        </div>  
      </div>  
  
      <h2 style={{ marginTop: 40 }}>Top Scorers</h2>  
  
      <ResponsiveContainer width="100%" height={300}>  
        <BarChart data={scoringData}>  
          <XAxis dataKey="name" />  
          <YAxis />  
          <Tooltip />  
          <Bar dataKey="ppg">  
            {scoringData.map((_, i) => (  
              <Cell key={i} fill={i === 0 ? ACCENT : "#333"} />  
            ))}  
          </Bar>  
        </BarChart>  
      </ResponsiveContainer>  
    </div>  
  );  
}  
