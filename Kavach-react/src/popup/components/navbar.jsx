import React from 'react'


function Navbar({tabSetter}) {
  return (
 <><nav className="grid grid-flow-col justify-stretch overflow-x-auto overflow-y-hidden border-b border-gray-700 whitespace-nowrap dark:border-gray-600">
        {/* Home Button */}
        <button onClick={()=>{tabSetter("HOME")}}className="inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:px-4 -px-1 dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mx-1 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10a3 3 0 016 0h7a3 3 0 016 0m0 0a3 3 0 11-6 0 3 3 0 016 0m-6 3a5 5 0 110-10 5 5 0 010 10z"
            />
          </svg>
          <span className="mx-1 text-sm sm:text-base">Home</span>
        </button>

        {/* Analysis Button */}
        <button onClick={()=>{tabSetter("ANALYSIS")}} className="inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-green-500 bg-transparent border-b-2 border-green-400 sm:px-4 -px-1 dark:border-green-300 dark:text-green-300 whitespace-nowrap focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mx-1 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 15l9-6 9 6M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6"
            />
          </svg>
          <span className="mx-1 text-sm sm:text-base">Analysis</span>
        </button>

        {/* Customization Button */}
        <button onClick={()=>{tabSetter("CUSTOMIZE")}} className="inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-purple-500 bg-transparent border-b-2 border-purple-400 sm:px-4 -px-1 dark:border-purple-300 dark:text-purple-300 whitespace-nowrap focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 mx-1 sm:w-6 sm:h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
          </svg>
          <span className="mx-1 text-sm sm:text-base">Customize</span>
        </button>
      </nav></>
  )
}

export default Navbar