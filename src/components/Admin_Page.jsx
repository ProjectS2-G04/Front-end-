import React from "react";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminList from "./AdminList";
import "./Admin_Page.css";

const AdminPage = () => {
  const [activeList, setActiveList] = useState("medecins"); // Default list

  const titles = {
    medecins: "La Liste des medecins",
    assistants: "La Liste des assistants medecins",
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

export default AdminPage;
