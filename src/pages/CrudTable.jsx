import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CrudTable({ fields = [] }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Initialize new user state based on fields
  const initialUserState = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  const [newUser, setNewUser] = useState(initialUserState);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  // Update the initial user state when fields change
  useEffect(() => {
    setNewUser(initialUserState);
  }, [fields]);

  const addData = () => {
    // Check if at least one field is filled
    const isAtLeastOneFieldFilled = fields.some((field) => newUser[field.name].trim() !== "");

    if (!isAtLeastOneFieldFilled) {
      alert("Please fill out at least one field before submitting.");
      return;
    }

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setNewUser(initialUserState);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const updateUser = (index) => {
    const updatedUsers = users.map((user, i) =>
      i === index ? editingUser : user
    );
    setUsers(updatedUsers);
    setEditingUser(null);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div className="container1">
      <div className="adduserbutton">
        <div>
          <button className="redbutton" onClick={() => navigate("/CrudTableMaster")}>
            Admin Master
          </button>
        </div>
        <div>
          <h2>Admin Table</h2>
        </div>
        <div>
          <button onClick={() => navigate("/adduser")} className="btn btn-primary redbutton">
            Add User
          </button>
        </div>
      </div>
      {/* Input fields for adding a new user */}
      <div className="crudinputtable">
        {fields.map((field) => (
          <input
            key={field.name}
            className="crudtableinputs"
            type="text"
            placeholder={field.label}
            value={newUser[field.name] || ""}
            onChange={(e) => setNewUser({ ...newUser, [field.name]: e.target.value })}
          />
        ))}
        <button className="addUserbutton" onClick={addData}>Submit data</button>
      </div>

      {/* Table */}
      <table className="crudtable" border="1">
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field.name}>{field.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="crudtable">
          {users.map((user, index) => (
            <tr key={index}>
              {fields.map((field) => (
                <td key={field.name}>{user[field.name]}</td>
              ))}
              <td>
                <div className="END">
                {/* Edit User */}
                {editingUser === null ? (
                  <button className="editbutton" onClick={() => setEditingUser(user)}> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil" viewBox="0 0 20 20">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                    </svg> 
                  </button>
                ) : (
                  <>
                    {fields.map((field) => (
                      <input
                        key={field.name}
                        className={`crudtable${field.name}`}
                        type="text"
                        value={editingUser[field.name] || ""}
                        onChange={(e) =>
                          setEditingUser({ ...editingUser, [field.name]: e.target.value })
                        }
                      />
                    ))}
                    <button onClick={() => updateUser(index)}>Save</button>
                  </>
                )}
                {/* Delete User */}

                <button className="editbutton" onClick={() => deleteUser(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash" viewBox="0 0 20 20">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg> 
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CrudTable;
