import React from 'react'
function Navbar({tabSetter, current}) {
  return (
    <>
      <nav className="flex justify-evenly overflow-x-auto overflow-y-hidden border-b border-gray-700 whitespace-nowrap dark:border-gray-600 h-12">
        {/* Home Button */}
        <button
          onClick={() => {
            tabSetter("HOME");
          }}
          style={{ backgroundColor: current === "HOME" ? "#555555" : "" }}
          className="inline-flex items-center h-12 px-2 py-2 -mb-px text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:px-4 -px-1 dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none"
        >
          <img src="home-svgrepo-com.svg" className="w-6"></img>

          <span className="mx-1 text-sm sm:text-base">
            Home
            {/* घर */}
          </span>
        </button>

        {/* Analysis Button */}
        <button
          onClick={() => {
            tabSetter("ANALYSIS");
          }}
          style={{ backgroundColor: current === "ANALYSIS" ? "#555555" : "" }}
          className="inline-flex items-center h-12 px-2 py-2 -mb-px text-center text-green-600 bg-transparent border-b-2 border-green-400 sm:px-4 -px-1 dark:border-green-300 dark:text-green-300 whitespace-nowrap focus:outline-none"
        >
          <img src="customize-svgrepo-com.svg" className="w-8"></img>
          <span className="mx-1 text-sm sm:text-base">
            Analysis
            {/* विश्लेषण */}
          </span>
        </button>

        {/* Customization Button */}
        <button
          onClick={() => {
            tabSetter("CUSTOMIZE");
          }}
          style={{ backgroundColor: current === "CUSTOMIZE" ? "#555555" : "" }}
          className="inline-flex items-center h-12 px-2 py-2 -mb-px text-center text-purple-600 bg-transparent border-b-2 border-purple-400 sm:px-4 -px-1 dark:border-purple-300 dark:text-purple-300 whitespace-nowrap focus:outline-none"
        >
          <img src="customize-svgrepo-com(1).svg" className="w-7"></img>
          <span className="mx-1 text-sm sm:text-base">
            Customize
            {/* कस्टमाइज़ */}
          </span>
        </button>
      </nav>
    </>
  );
}

export default Navbar