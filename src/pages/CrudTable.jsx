import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import AdminNavbar from "../components/AdminNavbar";

function CrudTable({ fields = [] }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  const initialUserState = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  useEffect(() => {
    setNewUser(initialUserState);
  }, [fields]);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const addData = () => {
    const isAtLeastOneFieldFilled = fields.some(
      (field) => newUser[field.name].trim() !== ""
    );

    if (!isAtLeastOneFieldFilled) {
      alert("Please fill out at least one field before submitting.");
      return;
    }

    let updatedUsers;

    if (editingIndex !== null) {
      // Update existing user
      updatedUsers = users.map((user, index) =>
        index === editingIndex ? newUser : user
      );
      setEditingIndex(null);
    } else {
      // Add new user
      updatedUsers = [...users, newUser];
    }

    setUsers(updatedUsers);
    setNewUser(initialUserState);
    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save to local storage
  };

  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleBulkUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const parsedData = results.data;
          const updatedUsers = [...users, ...parsedData];
          setUsers(updatedUsers);
          localStorage.setItem("users", JSON.stringify(updatedUsers));
        },
        skipEmptyLines: true,
      });
    }
  };

  const startEditing = (index) => {
    setNewUser(users[index]);
    setEditingIndex(index);
  };

  const handleCancel = () => {
    setNewUser(initialUserState); // Reset the form
    setEditingIndex(null); // Exit editing mode
  };

  return (
    <>
      <AdminNavbar />
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

        {/* Bulk Upload Input */}
        <div>
          <input  type="file" className="red" accept=".csv" onChange={handleBulkUpload} />
        </div>

        <div className="crudinputtable">
          {fields.map((field) => (
            <input
              key={field.name}
              className="crudtableinputs"
              type="text"
              name={field.name}
              placeholder={field.label}
              value={newUser[field.name] || ""}
              onChange={handleChange}
            />
          ))}
          <button className="addUserbutton" onClick={addData}>
            {editingIndex !== null ? "Save Data" : "Submit"}
          </button>
        </div>

        <table className="crudtable" border="5">
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
                    {editingIndex === index ? (
                      <button onClick={handleCancel} className="cancelbutton">
                        Cancel
                      </button>
                    ) : (
                      <>
                        <button
                          className="editbutton editbtn"
                          onClick={() => startEditing(index)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" className="bi bi-pencil" viewBox="0 0 20 20">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                          </svg>
                        </button>
                        <button
                          className="editbutton deletebtn"
                          onClick={() => deleteUser(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            fill="red"
                            className="bi bi-trash"
                            viewBox="0 0 20 20"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CrudTable;
