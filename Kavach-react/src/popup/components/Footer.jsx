import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-200 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-xs">
              © 2024 Kavach. All rights reserved.
              {/* © 2024 कवच। सभी अधिकार सुरक्षित।. */}
            </p>
            <p className="text-gray-600 text-xs">
              Privacy | Terms
              {/* गोपनीयता | शर्तें */}
              </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer