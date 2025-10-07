import React from 'react'

function SimpleSearch() {
  return (
    <div className='w-full flex items-center justify-center'>
     <input type="text" placeholder="Patient Name" className="w-[90%] border-1 border-black p-4 rounded-lg" />
    </div>
  )
}

export default SimpleSearch