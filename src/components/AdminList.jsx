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
    const apiMapping = {
      medecins: "groups/medecin/",
      assistants: "groups/assistant-medecin/",
      directeurs: "groups/directeur/",
      patients: "groups/patient/",
    };
  
    const apiEndpoint = apiMapping[listType];
  
    if (!apiEndpoint) {
      console.error("Invalid list type:", listType);
      return;
    }
  
    console.log("Fetching data from:", `http://127.0.0.1:8000/api/${apiEndpoint}`);
  
    fetch(`http://127.0.0.1:8000/api/${apiEndpoint}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setItems(data.members || []); // تأكد أن البيانات تحتوي على `members`
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [listType]);
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
