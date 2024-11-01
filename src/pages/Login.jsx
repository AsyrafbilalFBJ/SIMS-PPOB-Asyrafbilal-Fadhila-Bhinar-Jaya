import React from 'react'
import Logo from '../components/logo'
import FormTitle from '../components/FormTitle'
import FormLogin from '../components/FormLogin'
import Ilustration from '../components/Ilustration'

function Login() {
  return (
    <div className='grid md:grid-cols-2 sm:grid-cols-1 min-h-screen h-full '>
        <div className='justify-items-center content-center'>
            <Logo/>
            <FormTitle text='Masuk atau buat akun untuk memulai'/>
            <FormLogin/>
        </div>
        <Ilustration/>
    </div>
  )
}

export default Login