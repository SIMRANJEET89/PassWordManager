import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className="mycontainer flex justify-between items-center py-5 px-4 h-14">
<div className="logo font-bold text-white text-2xl">
  <span className='text-green-700'> /&lt; </span>
Pass
  <span className='text-green-500'>OP/&gt; </span>
  </div>
        
        <button className='text-white bg-green-500 flex my-5 rounded-md justify-between items-center ring-white ring-1'>
          <img className='invert w-10 p-1'  src="icon/github-icon.svg" alt="github logo"/>
          <span className='font-bold px-2'>GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar