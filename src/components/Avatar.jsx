import React from 'react'
import UserIcon from "../assets/images/Profile Photo.png";
import { useSelector } from 'react-redux';

function Avatar({ width, height }) {
    const profile = useSelector(state => state.profile.data);

  return (
    <div className={`w-${width} h-${height} overflow-hidden shadow-md rounded-full`}>
    {profile.profile_image ? 
        <img className="w-full h-full object-cover" src={UserIcon} alt="User" /> : 
        <img className="w-full h-full object-cover" src={profile.profile_image} alt={`Profile `+profile.first_name} />}
    </div>
  )
}

export default Avatar