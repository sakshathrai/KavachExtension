import React from 'react'
import Theme from './theme'

function Header() {
  return (
    <header className="bg-indigo-500 py-2 flex items-center justify-between px-4">
        <div className="flex items-center">
          <img src="logo_48.png" alt="Logo" className="w-6 h-6 mr-2" />
          <h1 className="text-white font-semibold text-sm">Kavach</h1>
        </div>
        <div className="flex items-center">
          <Theme />
        </div>
      </header>
  )
}

export default Header