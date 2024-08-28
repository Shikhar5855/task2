import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';

export default function AddUser() {
  const [user, setUser] = useState({
    fullName: '',
    userEmail: '',
    password: '',
  });

  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
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

    if (!user.fullName && !user.userEmail && !user.password) {
      alert('Please fill in at least one field.');
      return;
    }

    const updatedUsers = [...users];
    if (editIndex !== null) {
      updatedUsers[editIndex] = user;
      setEditIndex(null);
    } else {
      updatedUsers.push(user);
    }

    setUsers(updatedUsers);
    localStorage.setItem('newUserKey', JSON.stringify(updatedUsers));

    setUser({
      fullName: '',
      userEmail: '',
      password: '',
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <AdminNavbar />
      <div className='container1'>
        <h2>{editIndex !== null ? 'Edit User' : 'Add User'}</h2>
        <form className='userform' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName">Name</label>
            <input
              placeholder='Name'
              className='crudtableinputs'
              type="text"
              id="fullName"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="userEmail">Email</label>
            <input
              placeholder='Email'
              className='crudtableinputs'
              type="email"
              id="userEmail"
              name="userEmail"
              value={user.userEmail}
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
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                  </svg>
                  
                )}
              </button>
            </div>
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
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.fullName}</td>
                  <td>{user.userEmail}</td>
                  <td>{user.password}</td>
                  <td>
                    <button className='editbtn' onClick={() => handleEdit(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" className="bi bi-pencil" viewBox="0 0 20 20">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                      </svg>
                    </button>
                    <button className='deletebtn' onClick={() => handleDelete(index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-trash" viewBox="0 0 20 20">
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
    </>
  );
}
