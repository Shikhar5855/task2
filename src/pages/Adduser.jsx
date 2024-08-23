import React, { useState, useEffect } from 'react';

export default function AddUser() {
  const [user, setUser] = useState({
    fullName: '',
    userEmail: '',
    role: '',
  });

  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Load users from the new local storage key when the component mounts
    const storedUsers = JSON.parse(localStorage.getItem('newUserKey')) || [];
    setUsers(storedUsers);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure at least one field is filled
    if (!user.fullName && !user.userEmail && !user.role) {
      alert('Please fill in at least one field.');
      return;
    }

    const updatedUsers = [...users];
    if (editIndex !== null) {
      // Edit existing user
      updatedUsers[editIndex] = user;
      setEditIndex(null);
    } else {
      // Add new user
      updatedUsers.push(user);
    }

    setUsers(updatedUsers);
    // Save to the new local storage key
    localStorage.setItem('newUserKey', JSON.stringify(updatedUsers));

    // Optionally log the user data
    console.log('User submitted:', user);

    // Reset form fields
    setUser({
      fullName: '',
      userEmail: '',
      role: '',
    });
  };

  const handleEdit = (index) => {
    setUser(users[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('newUserKey', JSON.stringify(updatedUsers));
  };

  return (
    <div className='container1'>
      <h2>{editIndex !== null ? 'Edit User' : 'Add User'}</h2>
      <form className='userform' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Name:</label>
          <input
            className='crudtableinputs'
            type="text"
            id="fullName"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="userEmail">Email:</label>
          <input
            className='crudtableinputs'
            type="email"
            id="userEmail"
            name="userEmail"
            value={user.userEmail}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <input
            className='crudtableinputs'
            type="text"
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
          />
        </div>
        <div className='adduserb'>
          <button type="submit">{editIndex !== null ? 'Update User' : 'Add User'}</button>
        </div>
      </form>
      <div className='userlist'>
        <h2>Users List</h2>
        <table className='tableuser'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.fullName}</td>
                <td>{user.userEmail}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-pencil" viewBox="0 0 20 20">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 20 20">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
