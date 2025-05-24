import Sidebaredir from '../components/DirectorSideBare'

import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell
} from 'recharts';

export default function Heartsicks() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const savedRole = localStorage.getItem('role') || 'directeur';
    setRole(savedRole);
  }, []);

  const dataBar = [
    { name: 'Grippe saisonnière', Femme: 20, Homme: 40 },
    { name: 'Tuberculose pulmonaire', Femme: 30, Homme: 15 },
    { name: 'Hépatite virale', Femme: 22, Homme: 25 },
    { name: 'Gastro-entérite', Femme: 20, Homme: 20 }
  ];

  const dataPie = [
  { name: 'Hépatite virale', value: 520 },
  { name: 'Grippe saisonnière', value: 40 },
  { name: 'Tuberculose pulmonaire', value: 10 },
  { name: 'Gastro-entérite', value: 12 },
];

const COLORS = ['#9BF1F0', '#A4DDED', '#E3A9BE', '#89D2DC'];

  

 return (
  <div className="bg-white min-h-screen flex overflow-x-hidden">
    {/* Conteneur Sidebar avec largeur fixe */}
    <div className="w-64 flex-shrink-0">
      <Sidebaredir />
    </div>

    {/* Contenu principal qui prend tout l'espace restant */}
    <div className="p-6 flex-1">
      <h1 className="text-4xl font-bold mb-4 mx-6 border-0" style={{ color: '#2E5077' }}>
        Maladies Contagieuses
      </h1>

      {/* Filtres de date */}
      <div
        className="w-full flex gap-4 mb-6 p-4 rounded shadow-2xl items-end border"
        style={{ backgroundColor: '#ffffff', borderColor: '#CCDFDF', borderWidth: '5px' }}
      >
        <div className="flex-1 border rounded p-2">
          <label className="block text-gray-600 text-sm mb-1">Date début</label>
          <input
            type="date"
            defaultValue="2024-01-01"
            className="w-full border-2 border-teal-400 rounded px-3 py-2"
          />
        </div>

        <div className="flex-1 border rounded p-2">
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

      {/* Graphiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded shadow-xl border border-sky-100">
          <BarChart width={450} height={300} data={dataBar}>
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

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded shadow-xl border border-sky-100">
          <div className="flex">
            <PieChart width={450} height={300}>
              <Pie
                data={dataPie}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>

            <div className="flex flex-col justify-center ml-6 space-y-2">
              {dataPie.map((entry, index) => (
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
