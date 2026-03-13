import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 items-center text-white flex flex-col justify-center bottom-0 w-full'>
        <div className="logo font-bold text-white text-2xl">
  <span className='text-green-700'> /&lt; </span>
Pass
  <span className='text-green-500'>OP/&gt; </span>
  </div>

  <div className='flex justify-center text-white'>
    Created with <img width={"30px"} src="icon/heart.png" alt="" />by Simranjeet Kour
  </div>
    </div>
  )
}

export default Footer