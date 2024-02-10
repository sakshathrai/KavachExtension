import React from 'react'
import CountSec from '../components/CountSec'

function Home() {
  return (
    <div>
        <div class="flex flex-grow justify-center items-center my-4">
        <button class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
          Scan
        </button>
      </div>

      <CountSec />
    </div>
  )
}

export default Home