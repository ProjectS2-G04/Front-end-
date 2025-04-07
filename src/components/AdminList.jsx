import React, { useEffect, useState } from "react";
import "./Admin_Page.css";
import PermissionsTable from "./PermissionTable";

const BASE_URL = "http://127.0.0.1:8000"; // Base URL for API

const AdminList = ({ title, listType }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Étudiants");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [records, setRecords] = useState({
    Étudiants: [],
    Enseignants: [],
    ATS: [],
  });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect triggered with listType:", listType); // Debug log
    if (listType === "dossiers") {
      fetchData();
    } else if (["medecins", "assistants", "directeurs", "patients"].includes(listType)) {
      fetchUsers();
    } else if (listType === "permissions") {
      // Do nothing, handled in render
    }
  }, [selectedCategory, listType]);

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) throw new Error("No refresh token found.");

      const response = await fetch(`${BASE_URL}/api/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) throw new Error("Failed to refresh token.");

      const data = await response.json();
      localStorage.setItem("token", data.access);
      return data.access;
    } catch (error) {
      console.error("Token refresh error:", error);
      setError("Session expirée. Veuillez vous reconnecter.");
      return null;
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      let url = "";
      if (selectedCategory === "Étudiants") url = "/dossiers/etudiants/";
      else if (selectedCategory === "Enseignants") url = "/dossiers/enseignants/";
      else if (selectedCategory === "ATS") url = "/dossiers/ats/";

      let token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found.");

      let response = await fetch(`${BASE_URL}/api/dossier-medicale${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 403) {
        token = await refreshToken();
        if (!token) throw new Error("Unable to refresh token.");
        response = await fetch(`${BASE_URL}/api/dossier-medicale${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setRecords((prev) => ({ ...prev, [selectedCategory]: data }));
    } catch (error) {
      console.error("Error fetching dossier data:", error);
      setError(error.message || "Erreur lors du chargement des dossiers.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      let token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found.");

      const fetchGroup = async (groupName) => {
        let response = await fetch(`${BASE_URL}/api/groups/${groupName}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 403) {
          token = await refreshToken();
          if (!token) throw new Error("Unable to refresh token.");
          response = await fetch(`${BASE_URL}/api/groups/${groupName}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        }

        if (!response.ok) throw new Error(`Failed to fetch ${groupName}: ${response.status}`);
        const data = await response.json();
        console.log(`${groupName} raw data:`, data);
        return data.members || data.users || [];
      };

      const groupMap = {
        medecins: "medecin",
        assistants: "assistant-medecin",
        directeurs: "directeur",
        patients: "patient",
      };
      const groupName = groupMap[listType];
      const groupUsers = await fetchGroup(groupName);

      console.log(`✅ ${listType} Users (fetched):`, groupUsers);
      setUsers(groupUsers);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      setError(error.message || "Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  };

  const activateUser = async (userId, action) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found.");

      const endpoint = `${BASE_URL}/api/dossier-medicale/${action}/${userId}/`;
      let response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 403) {
        token = await refreshToken();
        if (!token) throw new Error("Unable to refresh token.");
        response = await fetch(endpoint, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      if (!response.ok) throw new Error(`Action échouée: ${response.status}`);
      const data = await response.json();
      alert(data.message || `${action === "activate" ? "Activé" : "Désactivé"} avec succès`);

      // Refresh the user list after action
      fetchUsers();
    } catch (error) {
      console.error(`Error ${action} user:`, error);
      alert(error.message || `Erreur lors de ${action === "activate" ? "l'activation" : "la désactivation"}`);
    }
  };

  const filteredItems = records[selectedCategory].filter((item) =>
    `${item.nom} ${item.prenom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter((user) =>
    `${user.first_name || ""} ${user.last_name || ""}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-content">
      <div className="Title-search">
        <h3 className="List-title">{title}</h3>
        {listType !== "permissions" && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Rechercher..."
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
                {Object.keys(records).map((category) => (
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
            {isLoading ? (
              <p>Chargement...</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className="dossier-item">
                  <span className="dossier-name">
                    📄 <strong>{item.nom} {item.prenom}</strong>{" "}
                    {item.is_archived && "(Archivé)"}
                  </span>
                  <button className="archive-btn">
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
        <table className="admin-table">
          <thead>
            <tr className="table-title">
              <td>Nom</td>
              <td>Prénom</td>
              <td>Email</td>
              <td>Rôle</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5">Chargement...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="error">{error}</td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.last_name || "N/A"}</td>
                  <td>{user.first_name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>{user.role || listType.charAt(0).toUpperCase() + listType.slice(1)}</td>
                  <td>
                    <button
                      className="activate-btn"
                      onClick={() => activateUser(user.id, "activate")}
                    >
                      Activer
                    </button>
                    <button
                      className="deactivate-btn"
                      onClick={() => activateUser(user.id, "desactivate")}
                    >
                      Désactiver
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">Aucun utilisateur trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminList;