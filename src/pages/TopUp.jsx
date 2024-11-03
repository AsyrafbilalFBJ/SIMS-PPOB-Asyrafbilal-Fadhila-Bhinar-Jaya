import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import FormTopUp from '../components/FormTopUp'

function TopUp() {
  return (
    <div className='min-h-screen h-full lg:h-screen w-full lg:py-20'>
      <Header/>
        <div className="px-[10%]">
          <Hero/>
          <div className='flex flex-col pt-10'>
              <p className="text-black text-md mb-2">Silakan masukan</p>
              <p className="text-black text-md font-semibold text-3xl">Nominal Top Up</p>
          </div>
          <FormTopUp/>
      </div>
    </div>
  )
}

export default TopUp