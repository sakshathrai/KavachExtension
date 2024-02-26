import React from 'react'

function Footer({PLACEHOLDER}) {
  return (
    <footer className="bg-gray-200 py-2 footer">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-xs">
              {PLACEHOLDER[13]}
            </p>
            <p className="text-gray-600 text-xs">
              {PLACEHOLDER[14]} | {PLACEHOLDER[15]}
              </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer