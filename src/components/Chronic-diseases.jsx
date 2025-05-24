// src/components/ChronicDiseasesStats.jsx

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Sidebar from './DirectorSideBare'

// Données
const maladiesRepertoires = [
  { name: 'Asthme', Homme: 40, Femme: 30 },
  { name: 'Allergie', Homme: 20, Femme: 35 },
  { name: 'Tuberculose', Homme: 30, Femme: 25 },
  { name: 'Inflammation des poumons', Homme: 25, Femme: 20 },
];

const maladiesMentales = [
  { name: 'Dépression', Homme: 36, Femme: 38 },
  { name: 'TOC / Bipolaire', Homme: 13, Femme: 22 },
  { name: 'Autre', Homme: 17, Femme: 13 },
];

const maladiesCardiaques = [
  { name: 'Hypertension', Homme: 28, Femme: 30 },
  { name: 'Rhumatisme', Homme: 30, Femme: 35 },
  { name: 'Rhum. aigu', Homme: 28, Femme: 30 },
  { name: 'Trouble rythme', Homme: 20, Femme: 18 },
];

const maladiesDigestives = [
  { name: 'Hépatite', Homme: 30, Femme: 35 },
  { name: 'Crohn', Homme: 20, Femme: 28 },
  { name: 'Cœliaque', Homme: 22, Femme: 25 },
  { name: 'Ulcère', Homme: 15, Femme: 18 },
];

// Composant graphique
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
  return (
   <div className="flex min-h-screen  overflow-x-hidden">
  {/* Sidebar à gauche */}
  <Sidebar />

  {/* Contenu principal */}
  <div className="ml-64 p-6 w-full">
    {/* Titre */}
    <h1 className="text-4xl font-bold mb-4 mx-6 border-0" style={{ color: '#2E5077' }}>
      Les maladies chroniques
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
      <div className="flex-1 border rounded p-2">
        <label className="block text-gray-600 text-sm mb-1">Date début</label>
        <input
          type="date"
          defaultValue="2024-12-31"
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
    <div className="grid md:grid-cols-2 gap-6">
      <ChartSection title="Les maladies répertoriées" data={maladiesRepertoires} />
      <ChartSection title="Les maladies mentales" data={maladiesMentales} />
      <ChartSection title="Les maladies cardiaques" data={maladiesCardiaques} />
      <ChartSection title="Les maladies digestives" data={maladiesDigestives} />
    </div>
  </div>
</div>

  );
}
