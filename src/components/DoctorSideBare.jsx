import { 
  FaChartBar,
  FaUserInjured, 
  FaFolder, 
  FaCalendarAlt, 
  FaInbox, 
  FaUserCircle 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
export default function DoctorSideBare()  {
    const navigate = useNavigate();
  return (
    <div 
      className="flex flex-col w-64 h-screen p-4"
      style={{
        background: 'linear-gradient(to bottom, #fff, #F8FBFC, #50A3AB)'
      }}
    >
      {/* Logo */}
      <div className="text-2xl font-bold mb-8 p-4 border-b border-gray-300 text-gray-800">
       <img src={logo} alt="Logo" />
      </div>
      
      {/* Menu principal */}
      <div className="flex-1">
        <div className="mb-6">
          <h3 className="text-xs uppercase text-gray-600 mb-3">Tableau de bord</h3>
          <ul>
            <li className="mb-2">
              <button 
                onClick={() => navigate('/dashboarddirector')}
                className="flex items-center w-full p-2 rounded hover:bg-gray-200 text-gray-700 hover:text-gray-900 text-left"
              >
                <FaChartBar className="mr-3 text-gray-600" />
                Statistiques
              </button>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xs uppercase text-gray-600 mb-3">Maladies</h3>
          <ul>
            <li className="mb-2">
              <button 
                onClick={() => navigate('/chroniques')}
                className="flex items-center w-full p-2 rounded hover:bg-gray-200 text-gray-700 hover:text-gray-900 text-left"
              >
                <FaSkull className="mr-3 text-gray-600" />
                Maladies criminales
              </button>
            </li>
            <li className="mb-2">
              <button 
                onClick={() => navigate('/contagieuses')}
                className="flex items-center w-full p-2 rounded hover:bg-gray-200 text-gray-700 hover:text-gray-900 text-left"
              >
                <FaViruses className="mr-3 text-gray-600" />
                Maladies contagieuses
              </button>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xs uppercase text-gray-600 mb-3">Patients</h3>
          <ul>
            <li className="mb-2">
              <button 
                onClick={() => navigate('/PatientList')}
                className="flex items-center w-full p-2 rounded hover:bg-gray-200 text-gray-700 hover:text-gray-900 text-left"
              >
                <FaUserInjured className="mr-3 text-gray-600" />
                La liste des patients
              </button>
            </li>
            <li className="mb-2">
              <button 
                onClick={() => navigate('/dossiers')}
                className="flex items-center w-full p-2 rounded hover:bg-gray-200 text-gray-700 hover:text-gray-900 text-left"
              >
                <FaFolder className="mr-3 text-gray-600" />
                Dossier medicules
              </button>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xs uppercase text-gray-600 mb-3">Autres</h3>
          <ul>
            <li className="mb-2">
              <button 
                onClick={() => navigate('/Calendar')}
                className="flex items-center w-full p-2 rounded hover:bg-gray-200 text-gray-700 hover:text-gray-900 text-left"
              >
                <FaCalendarAlt className="mr-3 text-gray-600" />
                Calendrier
              </button>
            </li>
            <li className="mb-2">
              <button 
                onClick={() => navigate('/Demandes')}
                className="flex items-center w-full p-2 rounded hover:bg-gray-200 text-gray-700 hover:text-gray-900 text-left"
              >
                <FaInbox className="mr-3 text-gray-600" />
                Inbox
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Profile */}
      <div className="p-4 border-t border-gray-300">
        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center w-full text-gray-700 hover:text-gray-900"
        >
          <FaUserCircle className="mr-3 text-xl text-gray-600" />
          Profile
        </button>
      </div>
    </div>
  );
};

