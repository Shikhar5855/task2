import React, { useState, useEffect } from "react";
import CrudTable from "./CrudTable";

function CrudTableMaster() {
    const [fields, setFields] = useState(() => {
        const savedFields = JSON.parse(localStorage.getItem("fields"));
        return savedFields || [
            { name: "name", label: "Name" },
            { name: "email", label: "Email" },
            { name: "contact", label: "Contact" },
            { name: "Address", label: "Address" },
        ];
    });

    const [newField, setNewField] = useState({ name: "", label: "" });

    useEffect(() => {
        localStorage.setItem("fields", JSON.stringify(fields));
    }, [fields]);

    // Add a new field
    const addField = () => {
        if (newField.name && newField.label) {
            setFields([...fields, newField]);
            setNewField({ name: "", label: "" });
        }
    };

    // Delete a field
    const deleteField = (fieldName) => {
        const updatedFields = fields.filter((field) => field.name !== fieldName);
        setFields(updatedFields);
    };

    return (
        <div>
            <div className="container1">
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
                    <button className="crudtableminputs redbutton"
 onClick={addField}>Add Field</button>
                </div>

                    <h3>Current Fields</h3>
                    <ul>
                    <div className="crudtableinputs">

                        {fields.map((field) => (
                            <li key={field.name}>
                                {field.label}
                                <button className="redbutton" onClick={() => deleteField(field.name)}>  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 20 20">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg></button>
                            </li>
                        ))}
                </div>
                </ul>
            </div>
            {/* Pass fields to CrudTable */}
        </div>
    );
}

export default CrudTableMaster;
