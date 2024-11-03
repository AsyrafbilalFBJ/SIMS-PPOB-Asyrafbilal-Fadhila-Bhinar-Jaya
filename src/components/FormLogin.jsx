import React, { useEffect, useState } from 'react'
import Input from './Input'
import Button from './Button'
import AuthLink from './AuthLink'
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { clearMessage } from '../redux/reducers/auth';
import { asyncLoginAction } from '../redux/actions/auth';
import { FaXmark } from "react-icons/fa6";


function FormLogin() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const navigate = useNavigate();
    const errorMessage = useSelector(state => state.auth.errorMessage);
    const successMessage = useSelector(state => state.auth.successMessage);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
  
    const handleSubmit = async (e, values = {email, password}) =>{
        e.preventDefault();
        console.log(values);
        dispatch(clearMessage());
        dispatch(asyncLoginAction(values));
    };

    const removeError = (e) =>{
        dispatch(clearMessage());
    };
  
    useEffect(() => {
        if (successMessage && token) {
            setTimeout(() => {
                navigate('/');
            }, 2000);
            dispatch(clearMessage());
            console.log(token);
        }
    }, [successMessage, navigate, dispatch]);
    
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
                        // errorMessage={errorMessage}
                        // readOnly={isSubmitting}
                        >
                    </Input>
                    
                    <Input 
                        id="password" 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        Icon={MdLockOutline } 
                        placeholder="masukan password anda" 
                        // errorMessage={errorMessage}
                        // readOnly={isSubmitting}
                        >
                    </Input>
                    

                    <Button
                        text="Masuk"
                    />
                </form>

            <AuthLink
                label="belum punya akun? registrasi "
                link="/register"
                onClick={removeError}
            />

            {errorMessage && (
                <div className='bg-red-100 text-xs w-full rounded px-3 py-2 flex justify-between'>
                    <label className='text-red-500 content-center'>{errorMessage}</label>
                    <button onClick={removeError} className='text-red-500 content-center hover:bg-red-200 p-1 rounded'><FaXmark/></button>
                </div>
            )}
            
        </div>
    )
}

export default FormLogin