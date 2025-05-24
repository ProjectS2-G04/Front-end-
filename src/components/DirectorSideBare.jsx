
import { FaChartLine, FaHeartbeat, FaUser, FaTable } from 'react-icons/fa';
import './CreateForm.css'
import logo from '../assets/logo.png';

export default function DirectorSideBare() {
  return (
   <div className="h-screen w-64 bg-[linear-gradient(to_bottom,_#F6F4F0,_#F8FBFC,_#50A3AB)] p-6 shadow-lg fixed">
      <div className="text-2xl font-bold text-teal-700 mb-10">
        <img src={logo} alt="Logo" />
      </div>

      <ul className="space-y-4 text-gray-700 font-medium">
        <li>
          <button className="flex items-center gap-3 w-full text-left px-2 py-2 rounded hover:bg-teal-200 text-teal-600">
            <FaTable /> Tableau de bord
          </button>
        </li>
        <li>
          <button className="flex items-center gap-3 w-full text-left px-2 py-2 rounded hover:bg-teal-200">
            <FaChartLine /> Statistiques
          </button>
        </li>

        <li className="ml-4 text-sm text-gray-500">Maladies :</li>
        <li>
          <button className="ml-4 text-left w-full text-sm px-2 py-2 rounded hover:bg-teal-100">
            Maladies chroniques
          </button>
        </li>
        <li>
          <button className="ml-4 text-left w-full text-sm px-2 py-2 rounded hover:bg-teal-100">
            Maladies contagieuses
          </button>
        </li>

        <li>
          <button className="flex items-center gap-3 w-full text-left px-2 py-2 rounded hover:bg-teal-200">
            <FaUser /> Profile
          </button>
        </li>
      </ul>
    </div>
  );
}
