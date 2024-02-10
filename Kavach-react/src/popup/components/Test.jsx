import React from 'react'

function Test() {
  return (
<>
  {/* component */}
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
    rel="stylesheet"
  />
  {/* This is an example component */}
  <div className="bg-gray-200 p-10 flex flex-wrap sys-app-notCollapsed ">
    {/*this contains my photo, email and some information.*/}

    {/*horizontal navigations*/}
    <div className="p-4 pb-0 mx-auto flex flex-wrap ">
      <div className="p-4 w-full lg:w-1/2 bg-gray-800">
        {/*dark mode - without text - icons only*/}
        <div className="p-2 text-gray-700 bg-gray-900 rounded-lg shadow-lg ">
          <span className="px-2 mr-2 border-r border-gray-800">
            <img
              src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
              alt="alt placeholder"
              className="w-8 h-8 -mt-1 inline mx-auto"
            />
          </span>
          <span className="px-1 hover:text-white cursor-pointer">
            <i className="fas fa-stream p-2 bg-gray-800 rounded-full"></i>
          </span>
          <span className="px-1 hover:text-white cursor-pointer">
            <i className="fas fa-search p-2 bg-gray-800 rounded-full"></i>
          </span>
          <span className="px-1 hover:text-white cursor-pointer">
            <i className="fas fa-th p-2 bg-gray-800 rounded-full"></i>
          </span>
          <span className="px-1 hover:text-white cursor-pointer">
            <i className="w-8 fas fa-calendar-alt p-2 bg-gray-800 rounded-full"></i>
          </span>
          <span className="px-1 hover:text-white cursor-pointer w-8 relative">
            <i className="fas fa-bell p-2 bg-gray-800 rounded-full"></i>
            <span className="absolute right-0 top-0 -mt-2 -mr-1 text-xs bg-red-500 text-white font-medium px-2 shadow-lg rounded-full">
              3
            </span>
          </span>
          <span className="hover:text-white cursor-pointer w-10 relative float-right mr-3">
            <i className="fas fa-user p-2 bg-gray-800 rounded-full"></i>
            <span className="absolute right-0 top-0 -mt-1 -mr-1 text-xs bg-yellow-500 text-black font-medium px-2 rounded-full">
              3
            </span>
          </span>
        </div>
      </div>
      <div className="p-4 w-full lg:w-1/2">
        {/*dark mode - without text - icons only*/}
        <div className="p-2 text-gray-900 bg-white rounded-lg shadow-lg ">
          <span className="px-2 mr-2 border-r border-gray-800">
            <img
              src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
              alt="alt placeholder"
              className="w-8 h-8 -mt-1 inline mx-auto"
            />
          </span>
          <span className="px-1 cursor-pointer hover:text-gray-700">
            <i className="fas fa-stream p-2 bg-gray-200 rounded-full"></i>
          </span>
          <span className="px-1 cursor-pointer hover:text-gray-700">
            <i className="fas fa-search p-2 bg-gray-200 rounded-full"></i>
          </span>
          <span className="px-1 cursor-pointer hover:text-gray-700">
            <i className="fas fa-th p-2 bg-gray-200 rounded-full"></i>
          </span>
          <span className="px-1 cursor-pointer hover:text-gray-700">
            <i className="w-8 fas fa-calendar-alt p-2 bg-gray-200 rounded-full"></i>
          </span>
          <span className="px-1 w-8 relative cursor-pointer hover:text-gray-700">
            <i className="fas fa-bell p-2 bg-gray-200 rounded-full"></i>
            <span className="absolute right-0 top-0 -mt-2 -mr-1 text-xs bg-red-500 text-white font-medium px-2 shadow-lg rounded-full">
              3
            </span>
          </span>
          <span className="w-10 relative float-right mr-3 cursor-pointer hover:text-gray-700">
            <i className="fas fa-user p-2 bg-gray-200 rounded-full"></i>
            <span className="absolute right-0 top-0 -mt-1 -mr-1 text-xs bg-yellow-500 text-black font-medium px-2 rounded-full">
              3
            </span>
          </span>
        </div>
      </div>
      <div className="p-4 w-full lg:w-1/2 bg-gray-800">
        {/*dark mode - text and icons*/}
        <div className="p-2 text-gray-700 bg-gray-900 rounded-lg shadow-lg font-medium capitalize">
          <span className="px-2 mr-2 border-r border-gray-800">
            <img
              src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
              alt="alt placeholder"
              className="w-8 h-8 -mt-1 inline mx-auto"
            />
          </span>
          <span className="px-2 py-1 cursor-pointer hover:bg-gray-800 hover:text-gray-300 text-sm rounded mb-5">
            <i className="w-8 fas fa-stream p-2 bg-gray-800 rounded-full"></i>
            <span className="mx-1">categories</span>
          </span>
          <span className="px-2 py-1 cursor-pointer hover:bg-gray-800 hover:text-gray-300 text-sm rounded mb-5">
            <i className="w-8 fas fa-th p-2 bg-gray-800 rounded-full"></i>
            <span className="mx-1">menu</span>
          </span>
          <span className="px-1 hover:text-white cursor-pointer">
            <i className="fas fa-search p-2 bg-gray-800 rounded-full"></i>
          </span>
          <span className="px-1 hover:text-white cursor-pointer">
            <i className="w-8 fas fa-calendar-alt p-2 bg-gray-800 rounded-full"></i>
          </span>
          <span className="px-1 hover:text-white cursor-pointer w-8 relative">
            <i className="w-8 fas fa-bell p-2 bg-gray-800 rounded-full"></i>
            <span className="absolute right-0 top-0 -mt-2 -mr-1 text-xs bg-red-500 text-white font-medium px-2 shadow-lg rounded-full">
              3
            </span>
          </span>
          <span className="hover:text-white cursor-pointer w-10 relative float-right mr-3">
            <i className="fas fa-user p-2 bg-gray-800 rounded-full"></i>
            <span className="absolute right-0 top-0 -mt-1 -mr-1 text-xs bg-yellow-500 text-black font-medium px-2 rounded-full">
              3
            </span>
          </span>
        </div>
      </div>
      <div className="p-4 w-full lg:w-1/2">
        {/*light mode - text and icons*/}
        <div className="p-2 text-gray-900 bg-white rounded-lg shadow-lg font-medium capitalize">
          <span className="px-2 mr-2 border-r border-gray-800">
            <img
              src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
              alt="alt placeholder"
              className="w-8 h-8 -mt-1 inline mx-auto"
            />
          </span>
          <span className="px-2 py-1 cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-sm rounded mb-5">
            <i className="w-8 fas fa-stream p-2 bg-gray-200 rounded-full"></i>
            <span className="mx-1">categories</span>
          </span>
          <span className="px-2 py-1 cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-sm rounded mb-5">
            <i className="w-8 fas fa-th p-2 bg-gray-200 rounded-full"></i>
            <span className="mx-1">menu</span>
          </span>
          <span className="px-1 cursor-pointer hover:text-gray-700">
            <i className="fas fa-search p-2 bg-gray-200 rounded-full"></i>
          </span>
          <span className="px-1 cursor-pointer hover:text-gray-700">
            <i className="w-8 fas fa-calendar-alt p-2 bg-gray-200 rounded-full"></i>
          </span>
          <span className="px-1 w-8 relative cursor-pointer hover:text-gray-700">
            <i className="w-8 fas fa-bell p-2 bg-gray-200 rounded-full"></i>
            <span className="absolute right-0 top-0 -mt-2 -mr-1 text-xs bg-red-500 text-white font-medium px-2 shadow-lg rounded-full">
              3
            </span>
          </span>
          <span className="w-10 relative float-right mr-3 cursor-pointer hover:text-gray-700">
            <i className="w-8 fas fa-user p-2 bg-gray-200 rounded-full"></i>
            <span className="absolute right-0 top-0 -mt-1 -mr-1 text-xs bg-yellow-500 text-black font-medium px-2 rounded-full">
              3
            </span>
          </span>
        </div>
      </div>
    </div>
    {/*vertical navigations*/}
    <div className="p-4 pt-0 mx-auto flex flex-wrap ">
      {/*dark mode - tight side navigation with yellow notification*/}
      <div className="p-4 w-24 bg-gray-800">
        <div className="py-4 px-2 text-gray-700 bg-gray-900 rounded-lg text-center shadow-lg">
          <img
            src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
            alt="alt placeholder"
            className="w-8 h-8 mx-auto mb-5"
          />
          <span className="cursor-pointer hover:text-white px-2 block mb-5">
            <i className="fas fa-stream"></i>
          </span>
          <span className="cursor-pointer hover:text-white px-2 block mb-5">
            <i className="fas fa-search p-2 bg-gray-800 rounded-full"></i>
          </span>
          <span className="cursor-pointer hover:text-white px-2 block mb-5 relative">
            <i className="fas fa-users"></i>
            <span className="absolute right-0 top-0 -mt-2 text-xs bg-yellow-500 text-black font-medium px-2 shadow-lg rounded-full border-2 border-gray-900">
              3
            </span>
          </span>
          <span className="cursor-pointer hover:text-white px-2 block mb-5">
            <i className="fas fa-calendar-alt"></i>
          </span>
        </div>
      </div>
      <div className="p-4 w-24 bg-gray-800">
        {/*dark mode - tight side navigation with red notification*/}
        <div className="py-4 px-2 text-gray-700 bg-gray-900 rounded text-center shadow-lg">
          <img
            src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
            alt="alt placeholder"
            className="w-8 h-8 mx-auto mb-5"
          />
          <span className="cursor-pointer hover:text-white px-2 block mb-5">
            <i className="fas fa-stream"></i>
          </span>
          <span className="cursor-pointer hover:text-white px-2 block mb-5">
            <i className="fas fa-search p-2 bg-gray-800 rounded-full"></i>
          </span>
          <span className="cursor-pointer hover:text-white px-2 block mb-5 relative">
            <i className="fas fa-bell"></i>
            <span className="absolute right-0 top-0 -mt-2 text-xs bg-red-500 text-white font-medium px-2 shadow-lg rounded-full border-2 border-gray-900">
              3
            </span>
          </span>
          <span className="cursor-pointer px-2 block mb-5 relative">
            <span className="absolute right-0 top-0 -mt-2 text-xs bg-red-500 text-white font-medium px-2 shadow-lg rounded-full border-2 border-gray-900">
              3
            </span>
            <img
              src="https://lh3.googleusercontent.com/-U0lTbxzh0bE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdJubMZweMDYD49ddsxq1wXai_9Cg/s48-c/photo.jpg"
              alt="alt placeholder"
              className="w-8 h-8 mx-auto mb-5 rounded-full"
            />
          </span>
        </div>
      </div>
      <div className="p-4 w-64 bg-gray-800">
        {/*dark mode - wide side navigation*/}
        <div className="w-full py-4 px-2 text-gray-700 bg-gray-900 rounded-lg text-left capitalize font-medium shadow-lg">
          <img
            src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
            alt="alt placeholder"
            className="w-8 h-8 mx-auto mb-5 "
          />
          <span className="cursor-pointer px-2 py-1 hover:bg-gray-800 hover:text-gray-300 rounded block mb-5">
            <i className="w-8 fas fa-stream p-2 bg-gray-800 rounded-full"></i>
            <span className="mx-2">categories</span>
          </span>
          <span className="cursor-pointer px-2 py-1 hover:bg-gray-800 hover:text-gray-300 rounded block mb-5">
            <i className="w-8 fas fa-search p-2 bg-gray-800 rounded-full"></i>
            <span className="mx-2">search</span>
          </span>
          <span className="cursor-pointer px-2 py-1 hover:bg-gray-800 hover:text-gray-300 rounded block mb-5">
            <span className="w-8 mb-5 relative">
              <i className="w-8 fas fa-user p-2 bg-gray-800 rounded-full"></i>
              <span className="absolute right-0 top-0 -mt-2 -mr-1 text-xs bg-yellow-500 text-black font-medium px-2 rounded-full">
                3
              </span>
            </span>
            <span className="mx-2">sign ups</span>
          </span>
          <span className="cursor-pointer px-2 py-1 hover:bg-gray-800 hover:text-gray-300 rounded block mb-5">
            <i className="w-8 fas fa-th p-2 bg-gray-800 rounded-full"></i>
            <span className="mx-2">menu</span>
          </span>
          <span className="cursor-pointer px-2 py-1 hover:bg-gray-800 hover:text-gray-300 rounded block mb-5">
            <i className="w-8 fas fa-calendar-alt p-2 bg-gray-800 rounded-full"></i>
            <span className="mx-2">calendar</span>
          </span>
        </div>
      </div>
      <div className="p-4 w-64 ">
        {/*light mode - wide side navigation*/}
        <div className="w-full py-4 px-2 text-gray-900 bg-white rounded-lg text-left capitalize font-medium shadow-lg">
          <img
            src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
            alt="alt placeholder"
            className="w-8 h-8 mx-auto mb-5 "
          />
          <span className="cursor-pointer px-2 py-1 hover:bg-gray-200 hover:text-gray-700 rounded block mb-5">
            <i className="w-8 fas fa-stream p-2 bg-gray-200 rounded-full"></i>
            <span className="mx-2">categories</span>
          </span>
          <span className="cursor-pointer px-2 py-1 hover:bg-gray-200 hover:text-gray-700 rounded block mb-5">
            <i className="w-8 fas fa-search p-2 bg-gray-200 rounded-full"></i>
            <span className="mx-2">search</span>
          </span>
          <span className="cursor-pointer px-2 py-1 hover:bg-gray-200 hover:text-gray-700 rounded block mb-5">
            <span className="w-8 mb-5 relative">
              <i className="w-8 fas fa-user p-2 bg-gray-200 rounded-full"></i>
              <span className="absolute right-0 top-0 -mt-2 -mr-1 text-xs bg-yellow-500 text-black font-medium px-2 rounded-full">
                3
              </span>
            </span>
            <span className="mx-2">sign ups</span>
          </span>
          <span className="cursor-pointer px-2 py-1 hover:bg-gray-200 hover:text-gray-700 rounded block mb-5">
            <i className="w-8 fas fa-th p-2 bg-gray-200 rounded-full"></i>
            <span className="mx-2">menu</span>
          </span>
          <span className="cursor-pointer px-2 py-1 hover:bg-gray-200 hover:text-gray-700 rounded block mb-5">
            <i className="w-8 fas fa-calendar-alt p-2 bg-gray-200 rounded-full"></i>
            <span className="mx-2">calendar</span>
          </span>
        </div>
      </div>
      <div className="p-4 w-24 ">
        {/*light mode - tight side navigation with red notification*/}
        <div className="py-4 px-2 text-gray-900 bg-white rounded text-center shadow-lg ">
          <img
            src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
            alt="alt placeholder"
            className="w-8 h-8 mx-auto mb-5"
          />
          <span className="cursor-pointer hover:text-gray-500 px-2 block mb-5">
            <i className="fas fa-stream"></i>
          </span>
          <span className="cursor-pointer hover:text-gray-500 px-2 block mb-5">
            <i className="fas fa-search p-2 bg-gray-200 rounded-full"></i>
          </span>
          <span className="cursor-pointer hover:text-gray-500 px-2 block mb-5 relative">
            <i className="fas fa-bell"></i>
            <span className="absolute right-0 top-0 -mt-2 text-xs bg-red-500 text-white font-medium px-2 shadow-lg rounded-full border-2 border-white">
              3
            </span>
          </span>
          <span className="cursor-pointer hover:text-gray-500 px-2 block mb-5 relative">
            <img
              src="https://lh3.googleusercontent.com/-U0lTbxzh0bE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdJubMZweMDYD49ddsxq1wXai_9Cg/s48-c/photo.jpg"
              alt="alt placeholder"
              className="w-8 h-8 mx-auto mb-5 rounded-full"
            />
            <span className="absolute right-0 top-0 -mt-2 text-xs bg-red-500 text-white font-medium px-2 shadow-lg rounded-full border-2 border-white ">
              3
            </span>
          </span>
        </div>
      </div>
      <div className="p-4 w-24 ">
        {/*light mode - tight side navigation with yellow notification*/}
        <div className="py-4 px-2 bg-white text-gray-900 rounded-lg text-center shadow-lg">
          <img
            src="https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
            alt="alt placeholder"
            className="w-8 h-8 mx-auto mb-5"
          />
          <span className="cursor-pointer hover:text-gray-500 px-2 block mb-5">
            <i className="fas fa-stream"></i>
          </span>
          <span className="cursor-pointer hover:text-gray-500 px-2 block mb-5">
            <i className="fas fa-search p-2 bg-gray-200 rounded-full"></i>
          </span>
          <span className="cursor-pointer hover:text-gray-500 px-2 block mb-5 relative">
            <i className="fas fa-users"></i>
            <span className="absolute right-0 top-0 -mt-2 text-xs bg-yellow-500 text-black font-medium px-2 shadow-lg rounded-full border-2 border-white">
              3
            </span>
          </span>
          <span className="cursor-pointer hover:text-gray-500 px-2 block mb-5">
            <i className="fas fa-calendar-alt"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</>

  )
}

export default Test