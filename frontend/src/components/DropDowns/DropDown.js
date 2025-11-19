// src/Dropdown.js
import React, { useState } from 'react';
import "./style.css"

const Dropdown = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : placeholder}
        <span className={`arrow${isOpen ? 'open' : ''}`}>▼</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li
              key={option.value}
             
              className="dropdown-list-item"
              onClick={() => handleOptionClick(option)}
            >
             <option value={option.label}>{option.label}</option>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
