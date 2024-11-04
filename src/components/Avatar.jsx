import React from 'react'
import UserIcon from "../assets/images/Profile Photo.png";
import { useSelector } from 'react-redux';


function Avatar({ size, onChange, selectedPicture, pictureURI, updateProfileImage, disabled }) {
    const profile = useSelector(state => state.profile.data);

  return (
    <div className={`shadow-md rounded-full relative border-2 border-gray-300 w-20 h-20 `}>
      {profile?.profile_image?.includes('/null') ? 
        <img className="w-full h-full object-cover rounded-full" src={UserIcon} alt="User" /> : 
        <img className="w-full h-full object-cover rounded-full" src={profile.profile_image} alt="profile" />
      }
    </div>
  )
}

export default Avatar