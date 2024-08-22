import React, { useState } from "react";

function CrudTable() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "",contact: "", city: "" });
  const [editingUser, setEditingUser] = useState(null);

  // Add new user
  const addUser = () => {
    setUsers([...users, newUser]);
    setNewUser({ name: "", email: "",contact: "", city: "" });
  };

  // Delete user
  const deleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  // Update user
  const updateUser = (index) => {
    const updatedUsers = users.map((user, i) =>
      i === index ? editingUser : user
    );
    setUsers(updatedUsers);
    setEditingUser(null);
  };

  return (
    <div className="container1">
      <h2>Admin Table</h2>
      
      {/* Input fields for adding a new user */}
      <div>
        <input
        className="crudtableinputs"
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
                className="crudtableinputs"
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
         <input
                className="crudtableinputs"
          type="text"
          placeholder="Contact"
          value={newUser.contact}
          onChange={(e) => setNewUser({ ...newUser, contact: e.target.value })}
        />
        <input
                className="crudtableinputs"
          type="text"
          placeholder="City"
          value={newUser.city}
          onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      {/* Table */}
      <table className="crudtable" border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="crudtable" >
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td>{user.city}</td>
              <td>
                {/* Edit User */}
                {editingUser === null ? (
                  <button onClick={() => setEditingUser(user)}>Edit</button>
                ) : (
                  <>
                    <input
                    className="crudtablename"
                      type="text"
                      value={editingUser.name}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, name: e.target.value })
                      }
                    />
                    <input
                    className="crudtableemail"
                      type="text"
                      value={editingUser.email}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, email: e.target.value })
                      }
                    />
                     <input
                    className="crudtablecontact"
                      type="text"
                      value={editingUser.contact}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, contact: e.target.value })
                      }
                    />
                    <input
                    className="crudtablecity"
                      type="text"
                      value={editingUser.city}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, city: e.target.value })
                      }
                    />
                    <button onClick={() => updateUser(index)}>Save</button>
                  </>
                )}
                {/* Delete User */}
                <button onClick={() => deleteUser(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CrudTable;
