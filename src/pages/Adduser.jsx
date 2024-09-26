import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';

export default function AddUser() {
  const [user, setUser] = useState({
    userId: '',
    username: '',
    email: '',
    password: '',
  });

  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://androidkey.alobhatech.com/api/data/getalluser');
        if (response.ok) {
          const data = await response.json();
          setUsers(data); // Assuming the API returns an array of users
        } else {
        }
      } catch (error) {
        console.log('Error fetching users:', error);
        alert('An error occurred while fetching users.');
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user.username && !user.email && !user.password) {
      alert('Please fill in at least one field.');
      return;
    }
  
    try {
      const response = await fetch("https://androidkey.alobhatech.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        const res_data = await response.json();
        console.log(res_data, "res_data");
  
        const updatedUsers = [...users];
        const newUser = {
          username: res_data.username || user.username,
          email: res_data.email || user.email,
          password: res_data.password || user.password,
        };
  
        if (editIndex !== null) {
          updatedUsers[editIndex] = newUser;
          setEditIndex(null);
        } else {
          updatedUsers.push(newUser);
        }
  
        setUsers(updatedUsers);
        localStorage.setItem('newUserKey', JSON.stringify(updatedUsers));
  
        setUser({
          userId: '',
          username: '',
          email: '',
          password: '',
        });
  
        // Refresh the page
        window.location.reload();
  
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.extraDetails || 'Failed to register user.'}`);
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred. Please try again later.');
    }
  };
  

  const handleDelete = async (index) => {
    const userToDelete = users[index];
  
    // Confirmation alert
    const isConfirmed = window.confirm(`Are you sure you want to delete ${userToDelete.username}?`);
  
    if (!isConfirmed) {
      return; // Exit the function if the user cancels
    }
  
    try {
      const response = await fetch(`https://androidkey.alobhatech.com//api/data/deleteusercredential/${userToDelete._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
        localStorage.setItem('newUserKey', JSON.stringify(updatedUsers));
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData); // Log error response for debugging
        alert(`Error: ${errorData.message || 'Failed to delete user.'}`);
      }
    } catch (error) {
      console.error('Fetch error:', error); // Log fetch error for debugging
      alert('An error occurred. Please try again later.');
    }
  };
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  console.log(users, "user>>>>>>>>>>");

  return (
    <>
      <AdminNavbar />
      <div className='container1'>
        <h2>{editIndex !== null ? 'Edit User' : 'Add User'}</h2>
        <form className='userform' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Name</label>
            <input
              placeholder='Name'
              className='crudtableinputs'
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              placeholder='Email'
              className='crudtableinputs'
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className='password-container'>
            <label htmlFor="password">Password</label>
            <div className='password-input-wrapper'>
              <input
                placeholder='Password'
                className='crudtableinputs'
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className='password-toggle-button'
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-eye-slash" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 0 3.494-3.494l.823.823a4.5 4.5 0 0 1-5.139 5.139l-.823-.823a4.48 4.48 0 0 1-2.88 1.19C1.88 12.5 0 8 0 8s3-5.5 8-5.5c.76 0 1.5.125 2.2.355l.8.8C9.658 2.347 8.848 2.005 8 2.005c-2.12 0-3.879 1.168-5.168 2.457A13 13 0 0 0 1.173 8c.12.16.26.33.412.507l1.25 1.25z" />
                    <path d="M1.88 3.747a.75.75 0 1 0-1.06 1.06L13.32 17.307a.75.75 0 0 0 1.06-1.06L1.88 3.747z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button className='adduserbtn' type="submit">
            {editIndex !== null ? 'Update User' : 'Add User'}
          </button>
        </form>
        <h2>All Users</h2>
        <table className='crudtables'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u, index) => (
                <tr key={index}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <button className='deletebtn' onClick={() => handleDelete(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-trash" viewBox="0 0 20 20">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
