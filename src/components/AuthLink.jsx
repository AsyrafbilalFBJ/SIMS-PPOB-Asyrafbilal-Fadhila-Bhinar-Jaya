import React from 'react'
import { Link } from 'react-router-dom'

function AuthLink({label, link, onClick}) {
  return (
    <p className='text-gray-500 my-5 text-center text-sm'>
        {label} <Link to={link} onClick={onClick} className='text-red-500 font-bold'>di sini</Link>
    </p>
  )
}

export default AuthLink