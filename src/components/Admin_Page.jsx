import React, { useState } from "react";
import AdminList from "./AdminList";
import AdminSidebar from "./AdminSidebar";
import "./Admin_Page.css";

const AdminPage = () => {
  const [activeList, setActiveList] = useState("medecins");

  const titles = {
    medecins: "La Liste des médecins",
    assistants: "La Liste des assistants médecins",
    directeurs: "La Liste des directeurs",
    patients: "La Liste des patients",
    dossiers: "La Liste des dossiers médicaux",
    permissions: "Gestion des permissions",
  };
  console.log("Rendering AdminList with activeList:", activeList); // Ad

  return (
    <div className="admin-page">
      <AdminSidebar onListClick={setActiveList} activeList={activeList} />
      <AdminList title={titles[activeList]} listType={activeList} />
    </div>
  );
};

export default AdminPage;
