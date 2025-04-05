import React from "react";
import AdminLogo from "../assets/logo.png";

const AdminSidebar = ({ onListClick }) => {
  return (
    <div className="Admin-sidebar">
      <img src={AdminLogo} alt="Medeciel Logo" className="Admin-sidebar-logo" />
      <nav>
        <ul className="Admin-sidebar-ul">
          <li onClick={() => onListClick("medecins")}>La Liste des médecins</li>
          <li onClick={() => onListClick("assistants")}>La Liste des assistants médecins</li>
          <li onClick={() => onListClick("directeurs")}>La Liste des directeurs</li>
          <li onClick={() => onListClick("patients")}>La Liste des patients</li>
          <li onClick={() => onListClick("dossiers")}>La Liste des dossiers médicaux</li>
          <li onClick={() => onListClick("permissions")}>Gestion des permissions</li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;

