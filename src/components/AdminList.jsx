import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminList = ({ title, listType }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  // Updated mapping to match your model's valid role values
  const roleMapping = {
    medecins: "DOCTOR",
    assistants: "ASSISTANT",
    directeurs: "DIRECTOR",
    patients: "PATIENT",
  };

  useEffect(() => {
    const mappedRole = roleMapping[listType] || listType;
    console.log("Fetching data for role:", mappedRole);

    fetch(`http://127.0.0.1:8000/api/accounts/users/?role=${mappedRole}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setItems(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [listType]);

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/api/accounts/users/${id}/`, {
      method: "DELETE",
    })
      .then(() => setItems(items.filter((item) => item.id !== id)))
      .catch((error) => console.error("Error deleting:", error));
  };

  return (
    <div className="admin-content">
      <h3 className="List-title">{title}</h3>
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className="admin-list-item">
            <span>
              {item.first_name} {item.last_name} ({item.email})
            </span>
            <button
              className="Admin-delete-button"
              onClick={() => handleDelete(item.id)}
            >
              Supprimer
            </button>
          </div>
        ))
      ) : (
        <p>Aucun {listType} trouvé.</p>
      )}
      <button
        className="Admin-add-button"
        onClick={() => navigate("/Signup_User")}
      >
        Ajouter
      </button>
    </div>
  );
};

export default AdminList;
