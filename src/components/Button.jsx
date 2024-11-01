import React from 'react'

function Button({text}) {
  return (
    <button className='w-full py-2 my-4 border-0 bg-red-600 rounded hover:bg-red-700 text-white'>
        {text}
    </button>
  )
}

export default Button