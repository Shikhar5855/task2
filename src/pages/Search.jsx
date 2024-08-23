import React, { useState, useEffect } from 'react';

export default function Search() {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Load users from the local storage key used in AddUser
    const storedUsers = JSON.parse(localStorage.getItem('newUserKey')) || [];
    console.log("Loaded users:", storedUsers); // Log loaded users
    setUsers(storedUsers);
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOnClick = (e) => {
    e.preventDefault();

    // Filter users based on the search query
    const filtered = users.filter(user =>
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
    );

    console.log("Filtered users:", filtered); // Log filtered users

    // Update the state with filtered users
    setFilteredUsers(filtered);
  };

  return (
    <>
      <div id="search" className="search-container">
        <input 
          type="search" 
          placeholder='Search...' 
          aria-label="Search for inspiration" 
          value={search} 
          onChange={handleSearchChange} 
          className="search-input"
        />
        <button onClick={handleOnClick} className='search-button'>
          Search
        </button>
      </div>
      <h3 className='text'>Please search the data...</h3>

      <div id="results">
        {filteredUsers.length > 0 ? (
          <table className='tableuser'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.fullName}</td>
                  <td>{user.userEmail}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </>
  );
}
