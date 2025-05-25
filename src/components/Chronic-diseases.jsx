import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from './DirectorSideBare';
import axios from 'axios';

const ChartSection = ({ title, data }) => (
  <div className="bg-white rounded-xl shadow-md p-4">
    <h2 className="text-center font-semibold text-lg mb-4">{title}</h2>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Homme" fill="#7ED3D1" />
        <Bar dataKey="Femme" fill="#FFAEDD" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default function ChronicDiseasesStats() {
  const [stats, setStats] = useState({
    maladies_repertoires: [],
    maladies_mentales: [],
    maladies_cardiaques: [],
    maladies_digestives: [],
  });
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/statistics/api/chronic-diseases-stats/', {
        params: { start_date: startDate, end_date: endDate },
      });
      setStats(response.data);
      setError(null);
    } catch (error) {
      setError('Échec du chargement des statistiques. Veuillez réessayer.');
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [startDate, endDate]);

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h1 className="text-4xl font-bold mb-4 mx-6 border-0" style={{ color: '#2E5077' }}>
          Les maladies chroniques
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div
          className="w-full flex gap-4 mb-6 p-4 rounded shadow-2xl items-end border"
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#CCDFDF',
            borderWidth: '5px',
          }}
        >
          <div className="flex-1 border rounded p-2">
            <label className="block text-gray-600 text-sm mb-1">Date début</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border-2 border-teal-400 rounded px-3 py-2"
            />
          </div>
          <div className="flex-1 border rounded p-2">
            <label className="block text-gray-600 text-sm mb-1">Date fin</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border-2 border-teal-400 rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <button
              onClick={fetchStats}
              className="w-full text-white px-6 py-2 rounded whitespace-nowrap"
              style={{ backgroundColor: '#BFD9D9' }}
            >
              Appliquer
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <ChartSection title="Les maladies répertoriées" data={stats.maladies_repertoires} />
          <ChartSection title="Les maladies mentales" data={stats.maladies_mentales} />
          <ChartSection title="Les maladies cardiaques" data={stats.maladies_cardiaques} />
          <ChartSection title="Les maladies digestives" data={stats.maladies_digestives} />
        </div>
      </div>
    </div>
  );
}