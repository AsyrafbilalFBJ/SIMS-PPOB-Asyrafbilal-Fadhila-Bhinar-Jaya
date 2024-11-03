import React, { useEffect, useState } from 'react'
import { getBalanceAction } from '../redux/actions/balance';
import { FaRegEyeSlash, FaRegEye  } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import currencyFormat from '../utils/Currency';

function Balance() {
    const dispatch = useDispatch();
    const balance = useSelector(state => state.balance.data);
    const [showPassword, setShowPassword] = useState(false);
    const token = useSelector(state => state.auth.token.token);

    useEffect(()=>{
        dispatch(getBalanceAction(token));
      }, [token]);

  return (
    <div className="w-full lg:w-[800px] flex flex-col gap-2 rounded-2xl bg-saldo bg-cover bg-no-repeat p-6 shadow-md">
        <p className="text-sm text-white">Saldo anda</p>
        <div className='flex gap-1 items-center'>
        <p className="text-4xl text-white font-semibold">Rp</p>
        <input 
            type={showPassword ? 'text' : 'password'}
            className="text-4xl text-white font-semibold bg-transparent w-full border-0"
            value={
                showPassword 
                ? currencyFormat(balance.balance, '').format(true) 
                : currencyFormat(balance.balance, '').format(true).slice(0, 7) || 0
            }
            maxLength="1"
            readOnly disabled/>
        </div>
        <div className="text-xs text-white flex gap-3 items-center">Lihat saldo
        {showPassword ? (
            <button onClick={()=>setShowPassword(!showPassword)} className='text-center'><FaRegEyeSlash /></button>
        ) : (
            <button onClick={()=>setShowPassword(!showPassword)} className='text-center'><FaRegEye /></button>
        )}
        </div>
    </div>
  )
}

export default Balance