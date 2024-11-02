import React, { useEffect, useState } from 'react'
import Input from './Input'
import { MdAlternateEmail, MdOutlinePerson, MdLockOutline } from "react-icons/md";
import { MdClear } from "react-icons/md";
import Button from './Button';
import AuthLink from './AuthLink';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncRegisterAction } from '../redux/actions/auth';
import { clearMessage } from '../redux/reducers/auth';


function FormRegister() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errorMessage = useSelector(state => state.auth.errorMessage);
    const successMessage = useSelector(state => state.auth.successMessage);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = async (e, values = {email, firstName, lastName, password}) =>{
        e.preventDefault();
        console.log(values);
        dispatch(clearMessage());
        dispatch(asyncRegisterAction(values));
    };

    const removeError = (e) =>{
        dispatch(clearMessage());
    };
  
    useEffect(() => {
        if (successMessage) {
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            dispatch(clearMessage());
        }
    }, [successMessage, navigate, dispatch]);

    console.log(errorMessage);
  return (
    <div className='w-96'>
        <form onSubmit={handleSubmit}>
            <Input 
                id="email" 
                type="text" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                Icon={MdAlternateEmail} 
                placeholder="masukan email anda" 
                >
            </Input>
            
            <Input 
                id="nama_depan" 
                type="text" 
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                Icon={MdOutlinePerson } 
                placeholder="nama depan" 
                >
            </Input>
            
            <Input 
                id="nama_belakang" 
                type="text" 
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                Icon={MdOutlinePerson } 
                placeholder="nama belakang"
                >
            </Input>
            
            <Input 
                id="password" 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                Icon={MdLockOutline } 
                placeholder="buat password" 
                >
            </Input>
            
            <Input 
                id="konfirmasi_password" 
                type="password" 
                onChange={(e) => setConfirmPass(e.target.value)}
                value={confirmPass}
                Icon={MdLockOutline } 
                placeholder="konfirmasi password" 
                errorMessage={password != confirmPass && 'password tidak sama'}
                >
            </Input>

            <Button
                text="Registrasi"
            />
        </form>

        <AuthLink
            label="sudah punya akun? login "
            link="/login"
            onClick={removeError}
        />

        {errorMessage && (
            <div className='bg-red-100 text-xs w-full rounded px-3 py-2 flex justify-between mb-5'>
                <label className='text-red-500 content-center'>{errorMessage}</label>
                <button onClick={removeError} className='text-red-500 content-center hover:bg-red-200 p-1 rounded'><MdClear/></button>
            </div>
        )}
    </div>
  )
}

export default FormRegister