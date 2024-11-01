import React from 'react'
import Input from './Input'
import { FaAt, FaRegUser  } from "react-icons/fa6";
import Button from './Button';
import AuthLink from './AuthLink';


function FormRegister() {
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
                id="nama_depan" 
                type="text" 
                // value={email} 
                // onChange={(e) => setEmail(e.target.value)} 
                Icon={FaRegUser } 
                placeholder="nama depan" 
                // errorMessage={errors.fullName}
                // readOnly={isSubmitting}
                >
            </Input>
            
            <Input 
                id="nama_belakang" 
                type="text" 
                // value={email} 
                // onChange={(e) => setEmail(e.target.value)} 
                Icon={FaRegUser } 
                placeholder="nama belakang" 
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
            
            <Input 
                id="konfirmasi_password" 
                type="password" 
                // value={email} 
                // onChange={(e) => setEmail(e.target.value)} 
                Icon={FaRegUser } 
                placeholder="konfirmasi password" 
                // errorMessage={errors.fullName}
                // readOnly={isSubmitting}
                >
            </Input>

            <Button
                text="Registrasi"
            />

            <AuthLink
                label="sudah punya akun? login "
                link="/login"
            />
        </form>
    </div>
  )
}

export default FormRegister