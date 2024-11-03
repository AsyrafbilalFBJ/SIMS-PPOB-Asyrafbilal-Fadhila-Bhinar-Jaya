import React from 'react'
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Banner from '../components/Banner';

function Home() {

  return (
    <div className='min-h-screen h-full lg:h-screen w-full lg:py-20'>
      <Header/>
        <div className="px-[10%]">
          <Hero/>
          <Services/>
          <Banner/>
      </div>
    </div>
  )
}

export default Home