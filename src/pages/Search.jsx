import React, { useState, useEffect, useRef } from 'react';
import UserNavbar from '../components/UserNavbar';

export default function Search() {
  const fieldMapping = {
    _id: 'id',
    Browser: 'browser',
    City: 'city',
    Country: 'country',
    Date: 'date',
    DeviceType: 'deviceType',
    IPAddress: 'ipAddress',
    OperatingSystem: 'operatingSystem',
    State: 'state',
    Time: 'time',
  };

  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedFields, setSelectedFields] = useState({});
  const [availableFields, setAvailableFields] = useState([]);
  const [transformedArray, setTransformedArray] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false); // New state to track if data is loaded
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await fetch("https://androidkey.alobhatech.com/api/data/getservice/");
        if (response.ok) {
          const fields = await response.json();

          const filteredFields = fields
            ?.filter(field => field?.columnName !== 'wle' && field?.columnName !== '_id')
            ?.slice(-1);

          const storedFields = filteredFields?.length > 0 ? filteredFields : defaultFields;
          setAvailableFields(storedFields);

          const initialFields = storedFields?.reduce((acc, field) => {
            acc[field?.columnName] = false;
            return acc;
          }, {});
          setSelectedFields(initialFields);
        } else {
          console.error("Failed to fetch fields from API, status:", response.status);
          setAvailableFields(defaultFields);
        }
      } catch (error) {
        console.error("Error fetching fields:", error);
        setAvailableFields(defaultFields);
      }
    };

    fetchFields();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOnClick = async (e) => {
    e.preventDefault();
  
    // Normalize search term by trimming spaces only before and after the keyword
    const normalizedSearch = search.trim().toLowerCase();
  
    if (normalizedSearch === "") {
      setFilteredUsers([]);
      return;
    }
  
    try {
      const response = await fetch("https://androidkey.alobhatech.com/api/data/getservice/", {
        method: "GET",
      });
  
      if (response.ok) {
        const allUsers = await response.json();
        console.log("All users fetched:", allUsers);
  
        const selectedFieldsArray = Object.keys(selectedFields).filter(field => selectedFields[field]);
  
        const filteredUsers = allUsers.filter(user => {
          if (selectedFieldsArray.length > 0) {
            return selectedFieldsArray.some(field => {
              const userValue = user[field];
              // Exact match comparison
              return userValue && userValue.toLowerCase() === normalizedSearch;
            });
          } else {
            return Object.values(user).some(value =>
              value && value.toLowerCase() === normalizedSearch
            );
          }
        });
  
        console.log("Filtered Users:", filteredUsers);
        setFilteredUsers(filteredUsers);
        setDataLoaded(true); // Set dataLoaded to true after fetching the data
      } else {
        console.error("Failed to fetch data from API, status:", response.status);
        setFilteredUsers([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFilteredUsers([]);
    }
  };
  

  const handleFieldChange = (e) => {
    const { name, checked } = e.target;
    setSelectedFields(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const clearAllFields = () => {
    const initialFields = availableFields.reduce((acc, field) => {
      acc[field.columnName] = false;
      return acc;
    }, {});
    setSelectedFields(initialFields);
    setFilteredUsers([]);
    setDataLoaded(false); // Reset dataLoaded
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

  const isAnyFieldSelected = Object.values(selectedFields).some(value => value);
  useEffect(() => {
    if (availableFields.length > 0) {
      const newTransformedArray = availableFields.map(field => ({
        columnName: field.columnName,
        data: field.data || null
      }));
      setTransformedArray(newTransformedArray);
    }
  }, [availableFields]);

  useEffect(() => {
    console.log('Available fields:', availableFields);
    let thisData = [];
    thisData = availableFields?.[0];
    if (thisData) {
      const newTransformedArray = Object.keys(thisData)?.map(key => ({
        columnName: key,
        data: thisData[key]
      }));
      setTransformedArray(newTransformedArray);
    }
    console.log('Transformed array:', transformedArray);
  }, [availableFields]);

  return (
    <>
      <UserNavbar />
      <div className="dropdown" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="dropdown-toggle">
          Select Fields
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            {availableFields?.length > 0 ? (
              transformedArray
                ?.filter(field => field.columnName !== '_id' && field?.columnName !== '__v')
                .map((field, index) => (
                  <label key={index} className="dropdown-item">
                    <input
                      type="checkbox"
                      name={field?.columnName}
                      checked={selectedFields[field.columnName] || false}
                      onChange={handleFieldChange}
                    />
                    {field.label || field.columnName}
                  </label>
                ))
            ) : (
              <p>No fields available</p>
            )}
            <hr />
            <h6>Filtered Fields:</h6>
            {Object.keys(selectedFields)
              .filter(field => selectedFields[field] && field !== 'id')
              .map((fieldName, index) => (
                <label key={index} className="dropdown-item">
                  <input
                    type="checkbox"
                    name={fieldName}
                    checked={true}
                  />
                  {availableFields.find(field => field.columnName === fieldName)?.label || fieldName}
                </label>
              ))}
          </div>
        )}
      </div>

      <div className="selected-fields">
        <ul>
          {Object.keys(selectedFields).map((fieldName, index) =>
            selectedFields[fieldName] && (
              <li key={index}>
                {availableFields.find(field => field.columnName === fieldName)?.label || fieldName}
                <button
                  className="remove-field"
                  onClick={() => setSelectedFields(prev => ({ ...prev, [fieldName]: false }))}
                >
                  &times;
                </button>
              </li>
            )
          )}
        </ul>
        {isAnyFieldSelected && (
          <button className="clear-all" onClick={clearAllFields}>
            Clear All Fields
          </button>
        )}
      </div>

      <div id="search" className="search-container">
        <input
          type="search"
          placeholder='Search...'
          aria-label="Search for inspiration"
          value={search}
          onChange={handleSearchChange}
          className="search-input"
          disabled={!isAnyFieldSelected}
        />
        <button
          onClick={handleOnClick}
          className='search-button'
          disabled={!isAnyFieldSelected}
        >
          Search
        </button>
      </div>

      <div id="results">
        {isAnyFieldSelected && (
          <table className='tableuser'>
            <thead>
              <tr>
                {transformedArray
                  ?.filter(field => selectedFields[field.columnName])
                  ?.map((field, index) => (
                    <th key={index}>{field.label || field.columnName}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {search.trim() && filteredUsers.length > 0 ? (
                filteredUsers?.map((user, index) => (
                  <tr key={index}>
                    {transformedArray
                      ?.filter(field => selectedFields[field?.columnName])
                      ?.map((field, i) => (
                        <td key={i}>{user[field?.columnName]}</td>
                      ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={availableFields.filter(field => selectedFields[field.columnName]).length}>
                    No results found. Please search to display data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
