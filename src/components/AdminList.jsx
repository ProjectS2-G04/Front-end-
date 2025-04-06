import React, { useState, useEffect } from "react";
import PermissionsTable from "./PermissionTable";
import "./Admin_Page.css";
import axios from "axios";

const AdminList = ({ title, listType }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Étudiants");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
      default:
        break;
    }

    if (groupName) {
      fetchUsers(groupName);
    }
  }, [listType]);

  const activateUser = async (userId, action) => {
    const endpoint = `http://127.0.0.1:8000/api/dossier-medicale/${action}/${userId}/`;
    try {
      const res = await axios.post(endpoint, {}, {
        withCredentials: true,
      });
      alert(res.data.message);
      fetchUsers(listType);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  const dummyDossiers = {
    Étudiants: [{ id: 1, nom: "Jean", prenom: "Dupont" }],
    ATS: [{ id: 2, nom: "Dossier ATS -", prenom: "Marc Lemoine" }],
    Enseignants: [{ id: 3, nom: "Dossier Enseignant -", prenom: "Marc Lemoine" }],
  };

  const items = listType === "dossiers"
    ? dummyDossiers[selectedCategory] || []
    : users;

  const filteredItems = items.filter((item) =>
    listType === "dossiers"
      ? (item.nom + " " + item.prenom).toLowerCase().includes(searchTerm.toLowerCase())
      : item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
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
      ) : (
        <div>
          {loading && <p>Chargement...</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <table className="admin-table">
            <thead>
              <tr className="table-title">
                <td>Nom</td>
                <td>Prénom</td>
                {listType !== "dossiers" && <td>Email</td>}
                {listType !== "dossiers" && <td>Actions</td>}
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.first_name || item.nom}</td>
                    <td>{item.last_name || item.prenom}</td>
                    {listType !== "dossiers" && <td>{item.email || "-"}</td>}
                    {listType !== "dossiers" && (
                      <td>
                        <button className="activate-btn" onClick={() => activateUser(item.id, 'activate')}>Activer</button>
                        <button className="deactivate-btn" onClick={() => activateUser(item.id, 'desactivate')}>Désactiver</button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={listType === "dossiers" ? "2" : "4"} className="no-data">Aucun {listType} trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminList;