import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import http from '../helpers/http';
import { getBalanceAction } from '../redux/actions/balance';
import Hero from '../components/Hero';
import Input from '../components/Input';
import { MdMoney } from "react-icons/md";
import Button from '../components/Button';

function Transaction() {
  const transaction = useSelector(state => state.transaction.data);
  const token = useSelector(state => state.auth.token.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{
    if(!transaction){
      navigate('/');
    }
  });

  const doTransaction = async (e) =>{
    e.preventDefault();
    try {
      setErrorMessage('');
      setSuccessMessage('');
      const form = {
        service_code: transaction?.service_code
      };
      const formJson = JSON.stringify(form);
      const {data} = await http(token).post('/transaction', formJson);
      if(data.status === 0){
        setSuccessMessage(data.message);
        setTimeout(() => {
          navigate('/transaction/history');
        }, 3000);
        dispatch(getBalanceAction(token));
      }else{
        setErrorMessage(data.message);
      }
      
    } catch (error) {
      const message = error?.response?.data?.message;
      setErrorMessage(message);
    }
  };

  return (
    <div className='min-h-screen h-full lg:h-screen w-full lg:py-20'>
      <Header/>
        <div className="px-[10%]">
          <Hero/>
          <div className='flex flex-col py-10'>
              <p className="text-black text-md mb-2">Pembayaran</p>
              <div className='flex items-center gap-5'>
                <div className='w-10 h-10 rounded-md shadow-md'>
                  <img className='w-full h-full object-cover ' src={transaction.service_icon} alt={transaction.service_name} />
                </div>
                <p className="text-black text-md font-semibold text-xl">{transaction.service_name}</p>
              </div>
          </div>
          <Input 
              id="pembayaran" 
              type="number" 
              value={transaction.service_tariff}
              Icon={MdMoney}
              readOnly={true}
              >
          </Input>
          <Button
              text="Bayar"
              onClick={doTransaction}
          />
      </div>
    </div>
  )
}

export default Transaction