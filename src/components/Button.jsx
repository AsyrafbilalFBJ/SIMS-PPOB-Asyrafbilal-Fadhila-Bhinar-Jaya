import React from 'react'

function Button({text, disabled, theme, type, onClick}) {
  return (
    <div>
      <button type={type || 'submit'} onClick={onClick} disabled={disabled && `${disabled}`} className={`w-full py-2 my-4 border-2 rounded disabled:bg-gray-300 disabled:text-white disabled:border-gray-300
        ${theme === 'secondary' ? 
          'duration-200 border-red-600 bg-white hover:bg-red-600 text-red-600 hover:text-white' :
          'duration-200 border-red-600 bg-red-600 hover:bg-red-700 text-white'
        }
        `}>
          {text}
      </button>
    </div>
  )
}

export default Button