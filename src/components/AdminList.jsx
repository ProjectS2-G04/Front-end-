import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

 

const sampleData = {
  
    medecins: ["Dr. Mohamed Amin", "Dr. Amina Salah", "Dr. Karim Belaid"],
    assistants: ["Assistant 1", "Assistant 2", "Assistant 3"],
    directeurs: ["Directeur 1", "Directeur 2"],
    patients: ["Patient 1", "Patient 2", "Patient 3", "Patient 4"]
  };
const AdminList = ({ title ,listType}) => {
    const navigate = useNavigate(); 
    const [items, setItems] = useState(sampleData[listType]);
    useEffect(() => {
        setItems(sampleData[listType]);
      }, [listType]);
    const handleDelete = (index) => {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
    };
  
    

  return (
    <div className="admin-content">
     <h3 className="List-title">{title}</h3>
      {items && items.map((item, index) => (
        <div key={index} className="admin-list-item ">
          <span>{item}</span>
          <button className="Admin-delete-button" onClick={() => handleDelete(index)}>
            Supprimer
          </button>
        </div>
      ))}
      <button className="Admin-add-button" onClick={() => navigate('/Signup_User')}>
        Ajouter
      </button>
</div>
  );
};

export default AdminList;
