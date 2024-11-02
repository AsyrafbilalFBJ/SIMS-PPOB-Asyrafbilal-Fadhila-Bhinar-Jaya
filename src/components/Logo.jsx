import React from 'react'
import logo from '../assets/images/Logo.png'

function Logo() {
  return (
    <div className='flex items-center my-5 py-1'>
        <img className="rounded-full w-7 h-7" src={logo} alt="image description"/>
        <p className='text-xl font-medium ms-2'>SIMS PPOB</p>
    </div>
  )
}

export default Logo