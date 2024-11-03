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
      dispatch(getProfileAction(token));
      setEdit(false);
    } catch (error) {
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
      form.append('profile_image', selectedPicture);
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

  return (
    <div className='min-h-screen h-full lg:h-screen w-full lg:py-20'>
      <Header/>
        <div className="px-[10%]">
          <div className='my-5 w-full justify-items-center'>
            <Avatar 
              size='lg' 
              onChange={changePicture} 
              selectedPicture={selectedPicture} 
              pictureURI={pictureURI} 
              updateProfileImage={updateProfileImage}
              disabled={!edit}
            />
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
                    onClick={doLogout}
                  />
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
    </div>
  )
}

export default Account