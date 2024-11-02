
import React from 'react'
import { useSelector } from 'react-redux';
import Avatar from './Avatar';

function Greeting() {
    const profile = useSelector(state => state.profile.data);

  return (
    <div className="w-full lg:w-[600px] flex flex-col gap-4 items-center lg:items-start">
        <Avatar width={20} height={20} />
        <div className='flex flex-col items-center lg:items-start'>
            <p className="text-black text-lg">Selamat datang,</p>
            <p className="text-black font-semibold text-3xl">{profile.first_name} {profile.last_name}</p>
        </div>
    </div>
  )
}

export default Greeting