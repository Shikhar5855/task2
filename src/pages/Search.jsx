import React, { useState, useEffect, useRef } from 'react';
import UserNavbar from '../components/UserNavbar';

export default function Search() {
  // Define default fields
  const defaultFields = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
    { name: 'address', label: 'Address' },
    { name: 'phone', label: 'Phone' },
    { name: 'company', label: 'Company' }
  ];

  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedFields, setSelectedFields] = useState({});
  const [availableFields, setAvailableFields] = useState(defaultFields);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedFields = JSON.parse(localStorage.getItem('fields')) || defaultFields;
    setAvailableFields(storedFields);

    // Initialize selectedFields with all fields set to false
    const initialFields = storedFields.reduce((acc, field) => {
      acc[field.name] = false;
      return acc;
    }, {});
    setSelectedFields(initialFields);

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const apiUsers = await response.json();

        const formattedApiUsers = apiUsers.map(user => ({
          name: user.name,
          email: user.email,
          address: `${user.address.street}, ${user.address.city}`,
          phone: user.phone,
          company: user.company.name,
        }));

        const allUsers = [...storedUsers, ...formattedApiUsers];
        setUsers(allUsers);
      } catch (error) {
        console.error("Error fetching users from API:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOnClick = (e) => {
    e.preventDefault();

    if (search.trim() === "") {
      setFilteredUsers([]);
      return;
    }

    const filtered = users.filter(user =>
      Object.keys(selectedFields).some(field =>
        selectedFields[field] && user[field]?.toLowerCase().includes(search.toLowerCase())
      )
    );

    setFilteredUsers(filtered);
  };

  const handleFieldChange = (e) => {
    setSelectedFields({
      ...selectedFields,
      [e.target.name]: e.target.checked
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const clearAllFields = () => {
    const initialFields = availableFields.reduce((acc, field) => {
      acc[field.name] = false;
      return acc;
    }, {});
    setSelectedFields(initialFields);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check if any fields are selected
  const isAnyFieldSelected = Object.values(selectedFields).some(value => value);

  return (
    <>
      <UserNavbar />
      <div className="dropdown" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="dropdown-toggle">
          Select Fields
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            {availableFields.map((field, index) => (
              <label key={index} className="dropdown-item">
                <input
                  type="checkbox"
                  name={field.name}
                  checked={selectedFields[field.name] || false}
                  onChange={handleFieldChange}
                />
                {field.label}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="selected-fields ">
        <ul>
          {Object.keys(selectedFields).map((fieldName, index) =>
            selectedFields[fieldName] && (
              <li key={index}>
                {availableFields.find(field => field.name === fieldName)?.label}
                <button
                  className="remove-field "
                  onClick={() => setSelectedFields(prev => ({ ...prev, [fieldName]: false }))}
                >
                  &times;
                </button>
              </li>
            )
          )}
        </ul>
        <button className="clear-all " onClick={clearAllFields}>
          Clear All Fields
        </button>
      </div>
      <div id="search" className="search-container">
        <input
          type="search"
          placeholder='Search...'
          aria-label="Search for inspiration"
          value={search}
          onChange={handleSearchChange}
          className="search-input"
          disabled={!isAnyFieldSelected} // Disable the search input if no fields are selected
        />
        <button onClick={handleOnClick} className='search-button' disabled={!isAnyFieldSelected}>
          Search
        </button>
      </div>
      <h3 className='text'>Please search the data...</h3>

      <div id="results">
        {filteredUsers.length > 0 ? (
          <table className='tableuser'>
            <thead>
              <tr>
                {availableFields.map((field, index) =>
                  selectedFields[field.name] && <th key={index}>{field.label}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  {availableFields.map((field, i) =>
                    selectedFields[field.name] && <td key={i}>{user[field.name]}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='redbtn'>No results found</div>
        )}
      </div>
    </>
  );
}
