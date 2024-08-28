import React from 'react';
import CrudTable from './CrudTable';
import { useState,useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';

export default function AdminPanel() {
  
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
    <>
            <CrudTable fields={fields} />
            </>
  );
}
