import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell
} from 'recharts';
import Sidebaredir from '../components/DirectorSideBare';
import axios from 'axios';

export default function Heartsicks() {
  const [role, setRole] = useState('');
  const [stats, setStats] = useState({
    bar_data: [],
    pie_data: [],
  });
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('role') || 'directeur';
    setRole(savedRole);
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/statistics/api/contagious-diseases-stats/', {
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

  const COLORS = ['#9BF1F0', '#A4DDED', '#E3A9BE', '#89D2DC'];

  return (
    <div className="bg-white min-h-screen flex overflow-x-hidden">
      <div className="w-64 flex-shrink-0">
        <Sidebaredir />
      </div>
      <div className="p-6 flex-1">
        <h1 className="text-4xl font-bold mb-4 mx-6 border-0" style={{ color: '#2E5077' }}>
          Maladies Contagieuses
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div
          className="w-full flex gap-4 mb-6 p-4 rounded shadow-2xl items-end border"
          style={{ backgroundColor: '#ffffff', borderColor: '#CCDFDF', borderWidth: '5px' }}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow-xl border border-sky-100">
            <BarChart width={450} height={300} data={stats.bar_data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Femme" fill="#F5A9D0" />
              <Bar dataKey="Homme" fill="#63D1D1" />
            </BarChart>
            <h2 className="text-center font-bold text-lg mt-2 text-sky-900">
              Les maladies contagieux (selon sexe)
            </h2>
          </div>

          <div className="bg-white p-4 rounded shadow-xl border border-sky-100">
            <div className="flex">
              <PieChart width={450} height={300}>
                <Pie
                  data={stats.pie_data}
                  cx={200}
                  cy={150}
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {stats.pie_data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
              <div className="flex flex-col justify-center ml-6 space-y-2">
                {stats.pie_data.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-gray-700">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <h2 className="text-center font-bold text-lg mt-4 text-sky-900">
              Les maladies contagieux (en générale)
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}