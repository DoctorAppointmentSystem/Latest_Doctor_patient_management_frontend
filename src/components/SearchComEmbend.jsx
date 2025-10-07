import React from 'react'

function SearchComEmbend() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-xl flex items-center justify-between">
        <input type="Number" placeholder="Search Patient" className="w-[33%] border-1 border-black p-4 rounded-lg" />
        <input type="text" placeholder="Search Patient" className="w-[33%] border-1 border-black p-4 rounded-lg" />
        <div className="w-[33%] bg-acent hover:bg-highlight text-primary p-4 rounded-lg flex items-center justify-center">Embend Search</div>
      </div>
  )
}

export default SearchComEmbend