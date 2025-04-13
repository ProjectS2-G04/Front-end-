import React, { useState, useEffect } from "react";
import PermissionsTable from "./PermissionTable"; // Import the PermissionsTable component
import "./Admin_Page.css";
import axios from "axios";

const AdminList = ({ title, listType }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Étudiants");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch users data based on the listType
  const fetchUsers = (groupName) => {
    setLoading(true);
    setErrorMessage(""); // Clear any previous error messages

    fetch(`http://127.0.0.1:8000/api/groups/${groupName}/`) // Fetch from the Django API
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setErrorMessage(data.message); // Display error if no members are found
          setUsers([]);
        } else if (data.group && data.members) {
          setUsers(data.members); // Set the users list from the API response
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Update users when listType changes (i.e., groupName changes)
  useEffect(() => {
    let groupName = '';
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
      // Add more cases if needed for other user types
      default:
        break;
    }

    if (groupName) {
      fetchUsers(groupName); // Fetch data when listType changes
    }
  }, [listType]);

  const handleActivation = async (userId, action) => {
    try {
      // Choose the appropriate action (activate or deactivate)
      const endpoint = `http://127.0.0.1:8000/api/dossier-medicale/${action}/${userId}/`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'), // CSRF token management
        },
        credentials: 'include', // Ensures cookies are sent with request
      });

      if (!response.ok) throw new Error('Action échouée'); // Handle failed request

      // Refresh the list after the action
      fetchUsers(listType); // Pass the current listType to fetch users again
    } catch (error) {
      alert(error.message); // Display any error encountered during the fetch
    }
  };

  const renderActions = (user) => (
    <td>
      {user.is_active ? (
        <button
          className="deactivate-btn"
          onClick={() => handleActivation(user.id, 'desactivate')} // Call the desactivate API
        >
          Désactiver
        </button>
      ) : (
        <button
          className="activate-btn"
          onClick={() => handleActivation(user.id, 'activate')} // Call the activate API
        >
          Activer
        </button>
      )}
    </td>
  );
  const activateUser = async (userId, action) => {
    const endpoint = `http://127.0.0.1:8000/api/dossier-medicale/${action}/${userId}/`;

    try {
      const res = await axios.post(endpoint, {}, {

        withCredentials: true,
      });
      alert(res.data.message)
    } catch (error) {
      if (error.status == 400) {
        alert(error.response.data.message)
      }
    }

  }





  const filteredItems = users.filter((item) =>
    item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-content">
      <div className="Title-search">
        <h3 className="List-title">{title}</h3>

        {/* Hide search bar for permissions table */}
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

      {/* Render Permissions Table when listType is "permissions" */}
      {listType === "permissions" ? (
        <PermissionsTable />
      ) : (
        /* User Management Table */
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
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.email}</td>
                    <td>
                      <button className="activate-btn" onClick={() => activateUser(item.id, 'activate')}>Activer</button>
                      <button className="deactivate-btn" onClick={() => activateUser(item.id, 'desactivate')}>Désactiver</button>
                      
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
        <button>Ajouter</button>
      </div>
        </div>
      )}
      
    </div>
  );
};

export default AdminList;