import { useState, useEffect } from 'react';
import Sidebar from '../components/DirectorSideBare';
import { FaHeartbeat, FaTable, FaExclamationTriangle } from 'react-icons/fa';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';
import axios from 'axios';

export default function DirectorDashboard() {
  const [stats, setStats] = useState({
    total_consultations: 0,
    chronic_diseases: 0,
    percent_chronic: 0,
    contagious_diseases: 0,
    percent_contagious: 0,
    consultations_by_month: [],
    gender_stats: [],
  });
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/statistics/api/dashboard-stats/', {
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

  const COLORS = ['#F7B3D3', '#7ED3D1']; 


  return (
    <div className="flex overflow-x-hidden">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h1 className="text-4xl font-bold mb-4 mx-6 border-0" style={{ color: '#2E5077' }}>
          Tableau de bord
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Date Filters */}
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

        {/* Global Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div
            className="p-4 shadow-2xl rounded text-center border"
            style={{ backgroundColor: '#E0E9E7', borderColor: '#4DA1A9', borderWidth: '2px' }}
          >
            <FaTable className="mx-auto text-2xl text-teal-500" />
            <div className="text-gray-700 mt-2">Total Consultations</div>
            <div className="text-xl font-bold">{stats.total_consultations}</div>
          </div>
          <div
            className="p-4 shadow-2xl rounded text-center border"
            style={{ backgroundColor: '#E0E9E7', borderColor: '#4DA1A9', borderWidth: '2px' }}
          >
            <FaHeartbeat className="mx-auto text-2xl text-teal-500" />
            <div className="text-gray-700 mt-2">Maladies Chroniques</div>
            <div className="text-xl font-bold">
              {stats.chronic_diseases} ({stats.percent_chronic}%)
            </div>
          </div>
          <div
            className="p-4 shadow-2xl rounded text-center border"
            style={{ backgroundColor: '#E0E9E7', borderColor: '#4DA1A9', borderWidth: '2px' }}
          >
            <FaExclamationTriangle className="mx-auto text-2xl text-teal-500" />
            <div className="text-gray-700 mt-2">Maladies Contagieuses</div>
            <div className="text-xl font-bold">
              {stats.contagious_diseases} ({stats.percent_contagious}%)
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="bg-white p-6 shadow-lg rounded">
            <h2 className="text-xl font-semibold text-[#2E5077] mb-4">
              Statistique des consultations selon le mois
            </h2>
            <LineChart width={400} height={250} data={stats.consultations_by_month}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="count" stroke="#50A3AB" strokeWidth={2} />
            </LineChart>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 shadow-lg rounded">
            <h2 className="text-xl font-semibold text-[#2E5077] mb-4">
              Statistique des consultations selon le sexe
            </h2>
            <PieChart width={400} height={250}>
              <Pie
                data={stats.gender_stats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {stats.gender_stats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-pink-400"></div>
                <span className="text-gray-700">Femme</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#7ED3D1' }}></div>
                <span className="text-gray-700">Homme</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}