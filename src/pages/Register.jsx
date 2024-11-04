import React from 'react'
import Logo from '../components/Logo'
import FormTitle from '../components/FormTitle'
import FormRegister from '../components/FormRegister'
import Ilustration from '../components/Ilustration'

function Register() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 min-h-screen h-full'>
        <div className='justify-items-center content-center'>
            <Logo/>
            <FormTitle text='Lengkapi data untuk membuat akun'/>
            <FormRegister/>
        </div>
        <Ilustration/>
    </div>
  )
}

export default Register