import React from 'react'
import Logo from '../components/Logo'
import FormTitle from '../components/FormTitle'
import FormLogin from '../components/FormLogin'
import Ilustration from '../components/Ilustration'

function Login() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 min-h-screen h-full '>
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