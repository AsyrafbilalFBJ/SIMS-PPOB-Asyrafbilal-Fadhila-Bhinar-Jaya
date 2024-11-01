import React from 'react'
import Logo from '../components/logo'
import FormTitle from '../components/FormTitle'
import FormRegister from '../components/FormRegister'
import Ilustration from '../components/Ilustration'

function Register() {
  return (
    <div className='grid md:grid-cols-2 sm:grid-cols-1 min-h-screen h-full '>
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