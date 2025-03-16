import React from "react";
import AdminLogo from "../assets/logo.png";

const admin_sidebar = ({onListClick}) => {
  return (
    <div className="Admin-sidebar">
      <img
        src={AdminLogo}
        alt="Medeciel Logo"
        className="Admin-sidebar-logo"
      />
      <nav>
        <ul className="Admin-sidebar-ul">
        <li onClick={() => onListClick("medecins")}>La Liste des medecins</li>
        <li onClick={() => onListClick("assistants")}>La Liste des assistants medecins</li>
        <li onClick={() => onListClick("directeurs")}>La Liste des directeurs</li>
        <li onClick={() => onListClick("patients")}>La Liste des patients</li>
        </ul>
      </nav>
    </div>
  );
};

export default admin_sidebar;
