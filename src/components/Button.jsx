import React from 'react'

function Button({text, disabled, theme, type, onClick}) {
  return (
    <div>
      <button type={type || 'submit'} onClick={onClick} disabled={disabled && `${disabled}`} className={`w-full py-2 my-4 border-2 rounded duration-200 disabled:bg-gray-300 disabled:text-white disabled:border-gray-300
        ${theme === 'secondary' ? 
          'border-red-600 bg-white hover:bg-red-600 text-red-600 hover:text-white' :
          theme === 'tertiary' ?
          'border-transparent bg-white hover:bg-gray-100 text-red-600 text-sm font-semibold' :
          theme === 'ghost' ?
          'border-transparent bg-white hover:bg-gray-100 text-gray-500 text-sm font-semibold' :
          'border-red-600 bg-red-600 hover:bg-red-700 text-white'
        }
        `}>
          {text}
      </button>
    </div>
  )
}

export default Button