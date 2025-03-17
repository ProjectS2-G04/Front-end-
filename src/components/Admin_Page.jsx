import React, { useState } from "react"; // Add missing React import
import AdminSidebar from "./AdminSidebar"; // Import AdminSidebar
import AdminList from "./AdminList"; // Import AdminList
import "./Admin_Page.css"; // Import CSS

const AdminPage = () => {
  const [activeList, setActiveList] = useState("medecins");

  const titles = {
    medecins: "La Liste des médecins",
    assistants: "La Liste des assistants médecins",
    directeurs: "La Liste des directeurs",
    patients: "La Liste des patients",
  };

  const handleListClick = (listType) => {
    setActiveList(listType);
  };

  return (
    <div className="admin-page">
      <AdminSidebar onListClick={handleListClick} />
      <AdminList title={titles[activeList]} listType={activeList} />
    </div>
  );
};

export default AdminPage; // Add missing export default