import React, { useState } from "react";
import "./PermissionTable.css"; // Make sure to style it correctly

const PermissionsTable = () => {
  // Define roles and permissions
  const roles = ["Admin", "Médecin", "Assistant", "Patient", "Directeur"];
  const permissions = [
    "Consulter un dossier médicale",
    "Modifier un dossier médicale",
    "Archiver un dossier médicale",
    "Créer un dossier médicale",
    "Consulter la liste des dossiers médicales",
  ];

  // State to manage permissions (for now, just local state)
  const [permissionsState, setPermissionsState] = useState(
    Array(permissions.length).fill(Array(roles.length).fill(false))
  );

  // Handle checkbox toggle
  const togglePermission = (permIndex, roleIndex) => {
    setPermissionsState((prevState) =>
      prevState.map((perm, pIdx) =>
        pIdx === permIndex
          ? perm.map((role, rIdx) =>
              rIdx === roleIndex ? !role : role
            )
          : perm
      )
    );
  };

  return (
    
    <div className="permissions-table-container">
  
      <table className="permissions-table">
        <thead>
          <tr>
            <th>Roles</th>
            {roles.map((role, index) => (
              <th key={index}>{role}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission, permIndex) => (
            <tr key={permIndex}>
              <td>{permission}</td>
              {roles.map((_, roleIndex) => (
                <td key={roleIndex}>
                  <input
                    type="checkbox"
                    className="permission-checkbox"
                    checked={permissionsState[permIndex][roleIndex]}
                    onChange={() => togglePermission(permIndex, roleIndex)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionsTable;
