import React from 'react'
import CountSec from '../components/CountSec'

function Home() {
  return (
    <div className="h-full">
      <div className="flex flex-grow justify-center items-center my-4">
        <button className="bg-amber-500 hover:bg-amber-700 text-white text-xl font-bold py-2 px-4 rounded">
 Scan 
        {/* स्कैन */}
        </button>
      </div>

      <CountSec />
    </div>
  );
}

export default Home