import React, { useState } from 'react'
import Header from '../components/Header'
import Avatar from '../components/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Input';
import { MdAlternateEmail, MdOutlinePerson } from "react-icons/md";
import Button from '../components/Button';
import { logout } from '../redux/reducers/auth';
import { useNavigate } from 'react-router-dom';
import { getProfileAction } from '../redux/actions/profile';
import http from '../helpers/http';
import { Modal } from 'flowbite-react';
import { MdEdit, MdCheck } from "react-icons/md";
import UserIcon from "../assets/images/Profile Photo.png";
import axios from 'axios';
import ModalDialog from '../components/ModalDialog';

function Account() {
  const profile = useSelector(state => state.profile.data);
  const token = useSelector(state => state.auth.token.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(profile.email);
  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);
  const [edit, setEdit] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [pictureURI, setPictureURI] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const doLogout = async () => {
    dispatch(logout());
    navigate('/login');
  }

  const updateProfile = async (e, values = {email, firstName, lastName}) => {
    e.preventDefault();
    try {
      const form = {
        email: values.email || profile.email,
        first_name: values.firstName || profile.first_name,
        last_name: values.lastName || profile.last_name,
      };
      const formJSON = JSON.stringify(form);
      await http(token).put('/profile/update', formJSON);
      if(selectedPicture){
        console.log('edit image');
        updateProfileImage();
      }
      console.log('edit all');
      dispatch(getProfileAction(token));
      setSuccessMessage('Update Profile berhasil');
      setEdit(false);
      setShowSuccess(true);
      console.log(successMessage);
    } catch (error) {
      setErrorMessage('Update Profile gagal');
      console.log(errorMessage);
      setShowError(true);
      return error?.response?.data.message;
    }
  };

  const changePicture = (e) => {
    const file = e.target.files[0];
    setSelectedPicture(file);
    fileToDataUrl(file);
  };

  const fileToDataUrl = (file) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setPictureURI(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const updateProfileImage = async () => {
    try {
      const form = new FormData();
      form.append('file', selectedPicture);
      await http(token).put('/profile/image', form, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      });
      dispatch(getProfileAction(token));
      setEdit(false);
    } catch (error) {
      return error?.response?.data.message;
    }
  };

  const closeModal = () => {
    setShowSuccess(false);
    setShowError(false);
  }

  return (
    <div className='min-h-screen h-full lg:h-screen w-full lg:py-20'>
      <Header/>
        <div className="px-[10%]">
          <div className='my-5 w-full justify-items-center'>

            <div className={`shadow-md rounded-full relative border-2 border-gray-300 w-32 h-32`}>
              <div className='w-full h-full overflow-hidden rounded-full shadow-lg'>
                {selectedPicture && 
                  <img className="w-full h-full object-cover" src={pictureURI} alt="" />
                }
                {!selectedPicture && profile?.profile_image?.includes('https://minio.nutech-integrasi.com/take-home-test/profile/') && 
                  <img className="w-full h-full object-cover" src={profile?.profile_image} alt="User"/>
                }
                {!selectedPicture && profile?.profile_image?.includes('/null') &&
                  <img className="w-full h-full object-cover rounded-full" src={UserIcon} alt="User" /> 
                  // <img className="w-full h-full object-cover rounded-full" src={profile?.profile_image} alt="profile" />
                }
              </div>

                <label className={`bottom-0 right-0 absolute w-7 h-7 shadow-md border-2  border-gray-300 dark:border-gray-800 rounded-full content-center cursor-pointer
                  ${edit ?
                    'bg-white' :
                    'bg-gray-300'
                  }
                  `}>
                  <MdEdit className={`mx-auto
                    ${edit ?
                      'text-black':
                      'text-white'
                    }
                    `}/>
                  <input 
                    type='file'
                    name='profile_image'
                    className='hidden'
                    onChange={changePicture}
                    disabled={!edit}/>
                </label>
            </div>

            <p className="text-black font-semibold text-3xl my-5">{profile.first_name} {profile.last_name}</p>
            <form onSubmit={updateProfile} className='w-96'>
              <Input 
                  id="email" 
                  label="Email"
                  type="text" 
                  onChange={(e) => setEmail(e.target.value)}
                  value={!edit ? profile.email : email}
                  Icon={MdAlternateEmail} 
                  placeholder="masukan email anda" 
                  readOnly={true}
                  >
              </Input>
              
              <Input 
                  id="nama_depan" 
                  label="Nama Depan"
                  type="text" 
                  onChange={(e) => setFirstName(e.target.value)}
                  value={!edit ? profile.first_name : firstName}
                  Icon={MdOutlinePerson } 
                  placeholder="nama depan" 
                  readOnly={!edit}
                  >
              </Input>
              
              <Input 
                  id="nama_belakang" 
                  label="Nama Belakang"
                  type="text" 
                  onChange={(e) => setLastName(e.target.value)}
                  value={!edit ? profile.last_name : lastName}
                  Icon={MdOutlinePerson } 
                  placeholder="nama belakang"
                  readOnly={!edit}
                  >
              </Input>

              {!edit && 
                <>
                  <Button
                    text="Edit Profil"
                    type='button'
                    onClick={()=> setEdit(!edit)}
                  />
                  <Button
                    text="Logout"
                    theme="secondary"
                    type='button'
                    onClick={() => setShowConfirm(true)}
                  />

                  <Modal show={showConfirm} size="sm" onClose={() => setShowConfirm(false)} className='' position="center">
                      <div className="text-center w-full p-7">
                          <div className="flex flex-col justify-center">
                              <p className="text-xl font-bold text-black dark:text-gray-400">
                                  Yakin ingin keluar?
                              </p>
                          </div>
                          <div className="flex flex-row justify-center gap-5">
                              <div className='h-12 w-1/2 items-center'>
                                <Button type="button" text="Ya" theme="tertiary" onClick={doLogout}/>
                              </div>
                              <div className='h-12 w-1/2 items-center'>
                                <Button type="button" text="Tidak" theme="ghost" onClick={() => setShowConfirm(false)}/>
                              </div>
                          </div>
                      </div>
                  </Modal>
                </>
              }
              {edit &&
                <Button
                  text="Simpan"
                />
              }
            </form>
          </div>
      </div>

      {/* {successMessage != '' && token && */}
        <ModalDialog 
            show={showSuccess}
            onClick={() => setShowSuccess(false)}
            type="success"
            message={successMessage}
            nextAct={closeModal}
        />
      {/* } */}

      {/* {errorMessage != '' && token && */}
        <ModalDialog 
            show={showError}
            onClick={() => setShowError(false)}
            type="error"
            message={errorMessage}
            nextAct={closeModal}
        />
      {/* } */}
    </div>
  )
}

export default Account