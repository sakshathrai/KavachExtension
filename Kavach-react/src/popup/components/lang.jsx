import React, { useState } from 'react';

function Lang() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setDropdownOpen(false);
    // Add logic to handle language selection, e.g., set language in state
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex="0"
        role="button"
        className="btn m-1"
        onClick={toggleDropdown}
      >
        {selectedLanguage}
      </div>
      {isDropdownOpen && (
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a onClick={() => handleLanguageSelect('हिन्दी1')}>हिन्दी</a>
          </li>
          <li>
            <a onClick={() => handleLanguageSelect('ಕನ್ನಡ')}>ಕನ್ನಡ</a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Lang;
