import React from 'react'
import UserIcon from "../assets/images/Profile Photo.png";
import { useSelector } from 'react-redux';
import { MdEdit, MdCheck } from "react-icons/md";


function Avatar({ size, onChange, selectedPicture, pictureURI, updateProfileImage, disabled }) {
    const profile = useSelector(state => state.profile.data);

  return (
    <div className={`shadow-md rounded-full relative border-2 border-gray-300
      ${size === 'lg' ? 'w-32 h-32': 'w-20 h-20'}
    `}>
      {selectedPicture ? (
        <img className="w-full h-full object-cover rounded-full" src={pictureURI} alt="" />
      ) : profile.profile_image ? (
        <img className="w-full h-full object-cover rounded-full" src={UserIcon} alt="User" /> 
      ) : !profile.profile_image ? (
        <img className="w-full h-full object-cover rounded-full" src={profile.profile_image} alt={`Profile ${profile.first_name}`} />
      ) : !selectedPicture && profile?.profile_image === null ? (
        <img className='w-full h-full object-cover rounded-full' src={UserIcon} alt="User" /> 
      ) : selectedPicture && profile?.profile_image !== null ? (
        <img className='w-full h-full object-cover rounded-full' src={profile?.profile_image} alt={`Profile ${profile.first_name}`} />
      ) : ''}
      {!selectedPicture && onChange ? (
        <label className='bottom-0 right-0 absolute w-7 h-7 bg-white border-2 border-gray-300 dark:border-gray-800 rounded-full content-center cursor-pointer'>
          <MdEdit className='mx-auto'/>
          <input 
            type='file'
            name='profile_image'
            className='hidden'
            onChange={onChange}
            disabled={disabled && `${disabled}`}/>
        </label>
      ) : selectedPicture && onChange ? (
        <label onClick={updateProfileImage} className='bottom-0 right-0 absolute w-7 h-7 bg-white border-2 border-gray-300 dark:border-gray-800 rounded-full content-center cursor-pointer'>
          <MdCheck className='mx-auto'/>
        </label>
      ): ''}
    </div>
  )
}

export default Avatar