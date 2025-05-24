// src/pages/Dashboard.jsx
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
  CartesianGrid
} from 'recharts';

export default function DirectorDashboard() {
  const consultations = [
    { month: 'Jan', count: 25 },
    { month: 'Feb', count: 34 },
    { month: 'Mar', count: 12 },
    { month: 'Apr', count: 2 }
  ];

  const totalConsultations = 1962;
  const chronicDiseases = 1187;
  const contagiousDiseases = 775;

  const percentChronic = ((chronicDiseases / totalConsultations) * 100).toFixed(1);
  const percentContagious = ((contagiousDiseases / totalConsultations) * 100).toFixed(1);

  const genderStats = [
    { name: 'Male', value: 35 },
    { name: 'Female', value: 65 }
  ];

  const COLORS = ['#84D8D2', '#F7B3D3'];

  return (
    <div className="flex  overflow-x-hidden" >
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1
           className="text-4xl font-bold mb-4 mx-6 border-0"
           style={{ color: '#2E5077' }}
       >
          Tableau de bord
      </h1>


        {/* Filtres de date */}
   <div
      className="w-full flex gap-4 mb-6 p-4 rounded shadow-2xl items-end border"
      style={{
       backgroundColor: '#ffffff',
       borderColor: '#CCDFDF',
       borderWidth: '5px',
     }}
   >
  <div className="flex-1 border rounded p-2" >
    <label className="block text-gray-600 text-sm mb-1">Date début</label>
   <input
      type="date"
      defaultValue="2024-12-31"
      className="w-full border-2 border-teal-400 rounded px-3 py-2"
   />
  </div>

  <div className="flex-1 border rounded p-2" >
    <label className="block text-gray-600 text-sm mb-1">Date fin</label>
    <input
      type="date"
      defaultValue="2024-12-31"
      className="w-full border-2 border-teal-400 rounded px-3 py-2"
/>
  </div>

  <div className="flex-1">
    <button
      className="w-full text-white px-6 py-2 rounded whitespace-nowrap"
      style={{ backgroundColor: '#BFD9D9' }}
    >
      Appliquer
    </button>
  </div>
</div>



        {/* Statistiques globales */}
        <div className="grid grid-cols-3 gap-4 mb-6">
         <div className="p-4 shadow-2xl rounded text-center border" style={{ backgroundColor: '#E0E9E7', borderColor: '#4DA1A9', borderWidth: '2px' }}>
  <FaTable className="mx-auto text-2xl text-teal-500" />
  <div className="text-gray-700 mt-2">Total Consultations</div>
  <div className="text-xl font-bold">{totalConsultations}</div>
</div>

<div className="p-4 shadow-2xl rounded text-center border" style={{ backgroundColor: '#E0E9E7', borderColor: '#4DA1A9', borderWidth: '2px' }}>
  <FaHeartbeat className="mx-auto text-2xl text-teal-500" />
  <div className="text-gray-700 mt-2">Maladies Chroniques</div>
  <div className="text-xl font-bold">{chronicDiseases} ({percentChronic}%)</div>
</div>

<div className="p-4 shadow-2xl rounded text-center border" style={{ backgroundColor: '#E0E9E7', borderColor: '#4DA1A9', borderWidth: '2px' }}>
  <FaExclamationTriangle className="mx-auto text-2xl text-teal-500" />
  <div className="text-gray-700 mt-2">Maladies Contagieuses</div>
  <div className="text-xl font-bold">{contagiousDiseases} ({percentContagious}%)</div>
</div>

        </div>

        {/* Graphiques */}
      <div className="grid grid-cols-2 gap-6">
  {/* Line chart agrandi */}
  <div className="bg-white p-6 shadow-lg rounded">
    <h2 className="text-xl font-semibold text-[#2E5077] mb-4">Statistique des consultations selon le mois</h2>
    <LineChart width={400} height={250} data={consultations}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="count" stroke="#50A3AB" strokeWidth={2} />
    </LineChart>
  </div>

  {/* Pie chart agrandi */}
 <div className="bg-white p-6 shadow-lg rounded">
  <h2 className="text-xl font-semibold text-[#2E5077] mb-4">Statistique des consultations selon le sexe</h2>

  <PieChart width={400} height={250}>
    <Pie
      data={genderStats}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={100}
      fill="#8884d8"
      label
    >
      {genderStats.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>

  {/* Légende personnalisée */}
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
