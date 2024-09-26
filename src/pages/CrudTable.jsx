import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { useFormik, Formik, Form, Field } from 'formik';
import axios from 'axios';

function CrudTable() {
  const [fields, setFields] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  // Fetch fields data from the API
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await fetch("https://androidkey.alobhatech.com/api/data/getservice/");
        if (response.ok) {
          const fieldsData = await response.json();
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

  // Fetch users data from the API
// Fetch users data from the API
const fetchUsers = async () => {
  try {
    const response = await fetch("https://androidkey.alobhatech.com/api/data/getservice/");
    if (response.ok) {
      const usersData = await response.json();

      if (usersData.length > 0) {
        // Ensure the users are displayed if they have fields other than _id and __v
        const validUsers = usersData.filter(user => {
          const userFields = Object.keys(user);
          const filteredFields = userFields.filter(key => key !== '_id' && key !== '__v');
          return filteredFields.length > 0;  // Keep users that have at least one field other than _id and __v
        });

        if (validUsers.length > 0) {
          const allFields = Object.keys(validUsers[0]).filter(key => key !== '_id' && key !== '__v');

          const formattedFields = allFields.map((key) => ({
            columnName: key,
            data: validUsers[0][key],
          }));

          setFields(formattedFields);
          setUsers(validUsers);
        } else {
          console.log("No users with relevant fields found.");
          setFields([]); // Clear any previous fields
          setUsers([]);  // Clear any previous users
        }
      } else {
        console.log("No user data found.");
        setFields([]);  // No users data at all
        setUsers([]);
      }
    } else {
      console.error("Failed to fetch users. Status:", response.status);
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('file', values.file);

      try {
        const response = await axios.post('https://androidkey.alobhatech.com/api/data/uploadbulk', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('File uploaded successfully:', response.data);
        window.location.reload(); // Reload the page after successful file upload
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
  });


  const initialValues = fields.reduce((acc, field) => {
    acc[field.columnName] = newUser[field.columnName] || "";
    return acc;
  }, {});

  const addData = async (values) => {
    const isAtLeastOneFieldFilled = fields.some(
      (field) => values[field.columnName] && values[field.columnName].trim() !== ""
    );
  
    if (!isAtLeastOneFieldFilled) {
      return;
    }
  
    try {
      const url = editingIndex !== null
        ? `https://androidkey.alobhatech.com/api/data/editdata`
        : "https://androidkey.alobhatech.com/api/data/service";
  
      const method = "POST";
  
      // Filter out id and __v fields from the values
      const filteredValues = Object.keys(values).reduce((acc, key) => {
        if (key !== '_id' && key !== '__v') {
          acc[key] = values[key];
        }
        return acc;
      }, {});
  
      const payload = editingIndex !== null
        ? { ...filteredValues, id: users[editingIndex]._id }
        : filteredValues;
  
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        let updatedUsers;
        if (editingIndex !== null) {
          // Update the edited user in the users array
          updatedUsers = users.map((user, index) =>
            index === editingIndex ? responseData : user
          );
          setEditingIndex(null);
        } else {
          // Add the new user to the users array
          updatedUsers = [...users, responseData];
        }
  
        // Update the state and localStorage
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
  
        // Clear the form fields
        setNewUser({});
  
        // Refresh the page after save (if needed)
        // window.location.reload(); 
      } else {
        const errorText = await response.text();
        console.error("Failed to save user data. Status:", response.status, "Response:", errorText);
      }
    } catch (error) {
      console.error("Error saving user data:", error.message);
    }
  };
  


  const deleteUser = async (index) => {
    const userToDelete = users[index];

    try {
      const response = await fetch(`https://androidkey.alobhatech.com/api/data/deleteuser/${userToDelete._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      } else {
        const errorText = await response.text();
        console.error("Failed to delete user. Status:", response.status, "Response:", errorText);
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };


  const startEditing = (index) => {
    setNewUser(users[index]);
    setEditingIndex(index);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setNewUser({});
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <div className="adduserbutton">
          <button className="redbutton" onClick={() => navigate("/CrudTableMaster")}>
            Admin Master
          </button>
          <h2>Admin Table</h2>
          <button onClick={() => navigate("/adduser")} className="btn btn-primary redbutton">
            Add User
          </button>
        </div>

        <div>
          <form onSubmit={formik.handleSubmit}>
            <input
            className="csvfile"
              type="file"
              accept=".csv"
              id="file-id-cus"
              name="file"
              onChange={(e) => {
                formik.setFieldValue("file", e.target.files[0]);
              }}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="crudinputtable">
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              await addData(values);
              setSubmitting(false);
            }}
            enableReinitialize={true}
          >
            {({ values, handleChange, setFieldValue }) => (
              <Form className="crudinputtable">
                {fields
                  ?.filter(field => field?.columnName !== '_id' && field?.columnName !== '__v')
                  .map((field) => (
                    <div key={field.columnName}>
                      <Field
                        className="crudtableinputs"
                        type="text"
                        name={field.columnName}
                        placeholder={field.columnName}
                        onChange={(e) => {
                          handleChange(e);
                          setFieldValue(field.columnName, e.target.value);
                          setNewUser({ ...newUser, [field.columnName]: e.target.value });
                        }}
                        value={values[field.columnName] || ''}
                      />
                    </div>
                  ))}
                <button type="submit" className="addUserbutton">
                  {editingIndex !== null ? "Save Data" : "Submit"}
                </button>
                {editingIndex !== null && (
                  <button type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                )}
              </Form>
            )}
          </Formik>

        </div>

        <table className="crudtable" border="5">
  <thead>
    <tr>
      {fields
        ?.filter(field => field?.columnName !== '_id' && field?.columnName !== '__v')
        .map((field) => (
          <th key={field.columnName}>{field.columnName}</th>
        ))}
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user, index) => (
      <tr key={user._id}>
        {fields
          ?.filter(field => field?.columnName !== '_id' && field?.columnName !== '__v')
          .map((field) => (
            <td key={field.columnName}>
              {typeof user[field.columnName] === "object" && user[field.columnName] !== null
                ? JSON.stringify(user[field.columnName]) // or display a specific nested field like user[field.columnName]?.city
                : user[field.columnName] || ""}
            </td>
          ))}
        <td>
                  <div className="END">
                    {editingIndex === index ? (
                      <button onClick={handleCancel}>Cancel</button>
                    ) : (
                      <button className="editbtn" onClick={() => startEditing(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="black"
                          className="bi bi-trash"
                          viewBox="0 0 20 20"
                        >
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                        </svg>

                      </button>
                    )}
                    <button className="deletebtn" onClick={() => deleteUser(index)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="red"
                        className="bi bi-trash"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </button>
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
