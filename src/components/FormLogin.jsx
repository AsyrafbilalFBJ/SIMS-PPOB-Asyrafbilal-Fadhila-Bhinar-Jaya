import React from 'react'
import Input from './Input'
import Button from './Button'
import AuthLink from './AuthLink'
import { FaAt, FaRegUser  } from "react-icons/fa6";

function FormLogin() {
  return (
    <div className='w-96'>
        <form action="">
            <Input 
                id="email" 
                type="email" 
                // value={email} 
                // onChange={(e) => setEmail(e.target.value)} 
                Icon={FaAt} 
                placeholder="masukan email anda" 
                // errorMessage={errors.fullName}
                // readOnly={isSubmitting}
                >
            </Input>
            
            <Input 
                id="password" 
                type="password" 
                // value={email} 
                // onChange={(e) => setEmail(e.target.value)} 
                Icon={FaRegUser } 
                placeholder="buat password" 
                // errorMessage={errors.fullName}
                // readOnly={isSubmitting}
                >
            </Input>
            

            <Button
                text="Masuk"
            />

            <AuthLink
                label="belum punya akun? registrasi "
                link="/register"
            />
        </form>
    </div>
  )
}

export default FormLogin