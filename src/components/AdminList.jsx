import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Admin_Page.css";
import PermissionsTable from "./PermissionTable";
import { useNavigate } from "react-router-dom";

const AdminList = ({ title, listType }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Étudiants");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Fetch users data based on groupName
  const fetchUsers = (groupName) => {
    setLoading(true);
    setErrorMessage("");
    fetch(`http://127.0.0.1:8000/api/groups/${groupName}/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setErrorMessage(data.message);
          setUsers([]);
        } else if (data.group && data.members) {
          setUsers(data.members);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        //setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
      })
      .finally(() => setLoading(false));
  };

  // Fetch dossier data (from your version)
  const fetchData = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
  
      console.log("selectedCategory:", selectedCategory);
  
      let url = "";
      if (selectedCategory === "Étudiants") url = "/etudiants/";
      else if (selectedCategory === "Enseignants") url = "/enseignants/";
      else if (selectedCategory === "ATS") url = "/fonctionnaires/";
  
   
  
      //let token = localStorage.getItem("token");
      //if (!token) throw new Error("No authentication token found.");
  
      let response = await fetch(`http://127.0.0.1:8000/api/dossier-medicale${url}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const data = await response.json();
      console.log("Fetched data:", data);
  
      setUsers(data);
    } catch (error) {
      console.error("Error fetching dossier data:", error);
      setErrorMessage(error.message || "Erreur lors du chargement des dossiers.");
    } finally {
      setLoading(false);
    }
  };
  

  // Merged useEffect: Handles both dossier and user fetching
  useEffect(() => {
    let groupName = '';
    if (listType === "dossiers") {
      fetchData();
    } else {
      switch (listType) {
        case "medecins":
          groupName = "medecin";
          break;
        case "assistants":
          groupName = "assistant-medecin";
          break;
        case "patients":
          groupName = "patient";
          break;
        case "directeurs":
          groupName = "directeur";
          break;
        default:
          break;
      }
      if (groupName) {
        fetchUsers(groupName);
      }
    }
  }, [listType, selectedCategory]); // Added selectedCategory as a dependency for dossier fetching

  // Merged activateUser using axios (from your friend's version)

  const archiveDossier = async (id) => {
    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/dossier-medicale/archive/${id}/`);
      alert(res.data.message);
      fetchData(); // Refresh the list after archiving
    } catch (error) {
      console.error("Error archiving dossier:", error);
      alert("Erreur lors de l'archivage du dossier.");
    }
  };
  

const filteredItems = users.filter((item) => {
  if (listType === "dossiers") {
    return `${item.nom} ${item.prenom}`.toLowerCase().includes(searchTerm.toLowerCase());
  } else {
    return (
      (item.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.email?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }
});
const toggleUserActivation = async (user) => {
  const endpoint = `http://127.0.0.1:8000/api/dossier-medicale/toggle-activation/${user.id}/`;

  try {
    const res = await axios.post(endpoint, {}, { withCredentials: true });
    alert(res.data.message);

    // Option 1: Refresh users (best for consistency)
    await fetchUsers(listType);

  } catch (error) {
    if (error.response?.status === 400) {
      alert(error.response.data.message);
    } else {
      alert("Une erreur s'est produite lors de l'action.");
    }
  }
};

  return (
    <div className="admin-content">
      <div className="Title-search">
        <h3 className="List-title">{title}</h3>
        {listType !== "permissions" && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Rechercher....."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>🔍</button>
          </div>
        )}
      </div>

      {listType === "permissions" ? (
        <PermissionsTable />
      ) : listType === "dossiers" ? (
        <>
          <div className="dropdown">
            <button
              className="dropdown-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedCategory} ▼
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                {["Étudiants", "Enseignants", "ATS"].map((category) => (
                  <li
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="dossier-list">
            {loading ? (
              <p>Chargement...</p>
            ) : errorMessage ? (
              <p className="error">{errorMessage}</p>
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className="dossier-item">
                  <span className="dossier-name">
                    📄 <strong>{item.nom} {item.prenom}</strong>{" "}
                    {item.is_archived && "(Archivé)"}
                  </span>
                  <button
                      className="archive-btn"
                        onClick={() => archiveDossier(item.id)}>
                         {item.is_archived ? "Désarchiver" : "Archiver"}
                         </button>
 
                </div>
              ))
            ) : (
              <p className="no-data">Aucun dossier trouvé.</p>
            )}
          </div>
        </>
      ) : (
        <div>
          {loading && <p>Chargement...</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <table className="admin-table">
            <thead>
              <tr className="table-title">
                <td>Nom</td>
                <td>Prénom</td>
                <td>Email</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.last_name || item.nom || "N/A"}</td>
                    <td>{item.first_name || item.prenom || "N/A"}</td>
                    <td>{item.email}</td>
                    <td>

                     <button
  className={item.is_active ? "deactivate-btn" : "activate-btn"}
  onClick={() => toggleUserActivation(item)}
>
  {item.is_active ? "Désactivé" : "Activé"}
</button>

                    

                    </td>
                  </tr>
                ))
                
              ) : (
                
                <tr>
                  <td colSpan="4" className="no-data">Aucun {listType} trouvé.</td>
                </tr>
              )}
            </tbody>
            
          </table>
          <div className="ajouter-button">
       <button className="AjouterBtn" onClick={() => navigate("/Signup_User")}>
                            Ajouter
</button>
      </div>
        </div>
      )}
      
    </div>
  );
};

export default AdminList;