import React, { useState } from "react";
import PermissionsTable from "./PermissionTable"; // Import the PermissionsTable component
import "./Admin_Page.css";

const AdminList = ({ title, listType }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Étudiants");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dummy Data
  const dummyUsers = {
    medecins: [
      { id: 1, first_name: "John", last_name: "Doe", email: "john.doe@example.com" },
      { id: 2, first_name: "Jane", last_name: "Smith", email: "jane.smith@example.com" },
    ],
    assistants: [{ id: 3, first_name: "Alice", last_name: "Brown", email: "alice.brown@example.com" }],
    patients: [{ id: 5, first_name: "Lucas", last_name: "Martin", email: "lucas.martin@example.com" }],
  };

  const dummyDossiers = {
    Étudiants: [{ id: 1, name: "Dossier Étudiant - Jean Dupont" }],
    ATS: [{ id: 2, name: "Dossier ATS - Marc Lemoine" }],
    Enseignants: [{ id: 3, name: "Dossier Enseignant - Claire Fontaine" }],
  };

  // Determine Items to Display
  const items = listType === "dossiers" ? dummyDossiers[selectedCategory] || [] : dummyUsers[listType] || [];

  // Filter items based on search
  const filteredItems = items.filter((item) =>
    listType === "dossiers"
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
      : item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
              placeholder="Rechercher..."
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
      ) : listType === "dossiers" ? (
        <>
          {/* Dropdown for selecting dossier category */}
          <div className="dropdown">
            <button className="dropdown-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {selectedCategory} ▼
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                {Object.keys(dummyDossiers).map((category) => (
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

          {/* Display Medical Records */}
          <div className="dossier-list">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className="dossier-item">
                  <span className="dossier-name">📄 <strong>{item.name}</strong></span>
                  <button className="archive-btn">Archiver</button>
                </div>
              ))
            ) : (
              <p className="no-data">Aucun dossier trouvé.</p>
            )}
          </div>
        </>
      ) : (
        /* User Management Table */
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
                    <button className="activate-btn">Activer</button>
                    <button className="deactivate-btn">Désactiver</button>
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
      )}
    </div>
  );
};

export default AdminList;
