import React from 'react'
import Header from '../components/Header';
import Hero from '../components/Hero';
import History from '../components/History';

function TransactionHistory() {

  return (
    <div className='min-h-screen h-full lg:h-screen w-full lg:py-20'>
      <Header/>
        <div className="px-[10%]">
          <Hero/>
          <History/>
      </div>
    </div>
  )
}

export default TransactionHistory