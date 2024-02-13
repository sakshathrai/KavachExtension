import React from 'react'
import Theme from './theme'
import Lang from '../components/lang'
function Header() {
  return (
    <header className="bg-amber-500 py-2 flex items-center justify-between px-4">
        <div className="flex items-center">
          <img src="logo_128.png" alt="Logo" className="w-10 h-10 mr-2" />
          <h1 className="text-white font-semibold text-2xl">
             Kavach 
            {/* कवच */}
            
            </h1>
        </div>
        <div className="flex items-center">
          <Lang/>

        </div>
      </header>
  )
}

export default Header