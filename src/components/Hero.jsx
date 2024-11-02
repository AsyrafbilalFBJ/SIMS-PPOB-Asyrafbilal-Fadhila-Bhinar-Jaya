import React from 'react'
import Greeting from './Greeting'
import Balance from './Balance'

function Hero() {
  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-3 lg:gap-0 my-5 w-full items-center">
        <Greeting/>
        <Balance/>
    </div>
  )
}

export default Hero