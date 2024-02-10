import React, { useState } from 'react';

const languages = [
  { code: 'hi', label: 'हिन्दी' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'en', label: 'English' },
];

function Lang() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageSelect = (languageCode) => {
    // Add logic to handle language selection
    console.log(`Selected language: ${languageCode}`);
    // You can perform additional actions here, e.g., set language in state
  };

  return (
    <div className="hs-dropdown fixed top-4 right-4">
      <button
        type="button"
        className="hs-dropdown-toggle py-2 px-3 inline-flex items-center gap-x-1.5 text-sm font-medium rounded-md border border-gray-300 text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={toggleDropdown}
      >
        Language
        <svg
          className={`w-3 h-3 ml-1 transition-transform ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {isDropdownOpen && (
        <div className="hs-dropdown-menu mt-2 w-32 bg-white shadow-md rounded-md p-2 border border-gray-300 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700">
          {languages.map(({ code, label }) => (
            <button
              key={code}
              className="block w-full text-left py-1 px-2 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
              onClick={() => handleLanguageSelect(code)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Lang;
