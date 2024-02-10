import React from 'react'
import ProgressBar from "../components/progress";
const darkPatterns = [
    'Urgency',
    'Scarcity',
    'Misdirection',
    'Social Proof',
    'Obstruction',
    'Sneaking',
    'Forced Action'
  ];
  
function CountSec() {
  return (
    <section className="py-2 sm:py-4 bg-gray-900 flex-1">
    <div className="container mx-auto px-4">
      <h2 className="text-sm sm:text-lg font-bold text-white mb-2 sm:mb-4">Dark Pattern</h2>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {darkPatterns.map((pattern, index) => (
          <div key={index} className="dark-pattern mb-2 p-2 w-full sm:w-auto sm:flex-shrink-0 border border-gray-700 rounded-md">
            <h3 className="text-xs sm:text-sm font-semibold mb-1">{pattern}</h3>
            <div className="flex items-center justify-between">
              <ProgressBar progVal={10} />
              <p className="text-gray-600 text-xxs sm:text-xs">3</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default CountSec