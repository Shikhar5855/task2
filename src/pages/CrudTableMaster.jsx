import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function CrudTableMaster() {
    const [fields, setFields] = useState([]);
    const [newField, setNewField] = useState({ name: '', label: '' });
    const navigate = useNavigate();

    // Fetch fields from API on component mount
    useEffect(() => {
        const fetchFields = async () => {
            try {
                const response = await fetch("https://androidkey.alobhatech.com/api/data/getservice/");
                if (response.ok) {
                    const fieldsData = await response.json();
                    console.log("Fetched Fields Data:", fieldsData); // Debug log
                    setFields(fieldsData);
                } else {
                    console.error("Failed to fetch fields. Status:", response.status);
                }
            } catch (error) {
                console.error("Error fetching fields:", error.message);
            }
        };
        fetchFields();
    }, []);
    // Store fields in local storage whenever fields state changes
    useEffect(() => {
        localStorage.setItem("fields", JSON.stringify(fields));
    }, [fields]);

    // Add a new field to the database and update local state
    const addField = async () => {
        if (newField.name.trim() && newField.label.trim()) {
            try {
                const apiPayload = {
                  [ newField.name]:newField.label
                };
    
                const response = await fetch("https://androidkey.alobhatech.com/api/data/addfield", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(apiPayload),
                });
    
                if (response.ok) {
                    console.log("Added field response:", await response.json()); // Debugging: log added field response
                    setNewField({ name: '', label: '' }); // Clear input fields after adding
                    window.location.reload(); // Refresh the page
                } else {
                    console.error("Failed to add field. Status:", response.status);
                }
            } catch (error) {
                console.error("Error adding field:", error.message);
            }
        } else {
            console.error("Field name and label cannot be empty.");
        }
    };
    

    // Navigate to admin page
    const adminpage = () => {
        navigate("/AdminPanel");
    };

    // Delete a field from the database and update local state
    const deleteField = async (fieldName) => {
        try {
            // Construct the payload with the dynamic field name
            const payload = {
                [fieldName]: ""
            };
    
            const response = await fetch("https://androidkey.alobhatech.com/api/data/deletefield", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
    
            if (response.ok) {
                console.log("Field deleted successfully.");
    
                // Remove the field from the local state immediately
                setFields(prevFields => prevFields.map(fieldObj => {
                    // Filter out the key that matches the deleted field name
                    return Object.fromEntries(Object.entries(fieldObj).filter(([key]) => key !== fieldName));
                }).filter(fieldObj => Object.keys(fieldObj).length > 0)); // Ensure no empty objects remain in the array
            } else {
                console.error("Failed to delete field. Status:", response.status);
                const errorText = await response.text();
                console.error("Error details:", errorText);
            }
        } catch (error) {
            console.error("Error deleting field:", error.message);
        }
    };
    
    

    console.log(fields.length, "fields??????");
    return (
        <div>
            <AdminNavbar />
            <div className="container1">
                <button onClick={adminpage}>Admin Table</button>
                <h2>Crud Table Master</h2>
                <div className="inputs">
                    <input
                        className="crudtableminputs"
                        type="text"
                        placeholder="Field Name"
                        value={newField.name}
                        onChange={(e) =>
                            setNewField({ ...newField, name: e.target.value })
                        }
                    />
                    <input
                        className="crudtableminputs"
                        type="text"
                        placeholder="Field Label"
                        value={newField.label}
                        onChange={(e) =>
                            setNewField({ ...newField, label: e.target.value })
                        }
                    />
                    <button className="crudtableminputs redbutton" onClick={addField}>
                        Add Field
                    </button>
                </div>

                <h3>Current Fields</h3>
                <ul>
                <div className="crudtableinputs">
  {
    fields
      .slice(-1) // Select the last item from the fields array
      .filter(item => Object.keys(item).some(key => key !== '__v' && key !== '_id')) // Filter out fields with columnName "wle" and "_id"
      .map((item, index) => (
        <li className="list" key={index}>
          {Object.keys(item).map((key, keyIndex) => (
            key !== '__v' && key !== '_id' ? ( // Ensure unwanted fields are excluded here as well
              <div className="deleteParent" key={keyIndex}>
                <li key={key}>{key}</li>
                <button className="deletebtn" onClick={() => deleteField(key)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="red"
                    className="bi bi-trash"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </button>
              </div>
            ) : null // Render nothing for unwanted fields
          ))}
        </li>
      ))
  }
</div>

                </ul>
            </div>
        </div>
    );
}

export default CrudTableMaster;
