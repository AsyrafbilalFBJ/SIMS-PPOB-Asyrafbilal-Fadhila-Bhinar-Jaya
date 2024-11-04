import React, { useEffect, useState } from 'react'
import Input from './Input'
import Button from './Button'
import { MdMoney } from "react-icons/md";
import currencyFormat from '../utils/Currency';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import http from '../helpers/http';
import { getBalanceAction } from '../redux/actions/balance';
import ModalDialog from './ModalDialog';

function FormTopUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const token = useSelector((state) => state.auth.token.token);
    const [topup, setTopUp] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const nominal = [
        {
          id: 1,
          nominal: 10000,
        },
        {
          id: 2,
          nominal: 20000,
        },
        {
          id: 3,
          nominal: 50000,
        },
        {
          id: 4,
          nominal: 100000,
        },
        {
          id: 5,
          nominal: 250000,
        },
        {
          id: 6,
          nominal: 500000,
        },
    ];

    useEffect(() => {
        setIsButtonDisabled(topup < 10000 || topup > 1000000);
      }, [topup]);
    
    const handleTopUp = async (e) => {
        e.preventDefault();
        try {
            setErrorMessage('');
            setSuccessMessage('');
            const form = {
                top_up_amount: topup,
            };
            const formJson = JSON.stringify(form);
            const { data } = await http(token).post('/topup', formJson);
            if(data.status === 0){
                setSuccessMessage(data.message);
                // setTimeout(() => {
                // navigate('/transaction/history');
                // }, 3000);
                dispatch(getBalanceAction(token));
                setShowConfirm(false);
                setShowSuccess(true);
            }else{
                setErrorMessage(data.message);
                setShowConfirm(false);
                setShowError(true);
            }
        } catch (error) {
            const message = error?.response?.data?.message;
            setErrorMessage(message);
        }
    };

    const handleNominal = (nominal) => {
        setTopUp(nominal);
    }

    return (
        <div className="w-full flex flex-col items-center lg:items-start gap-3 py-10">
            <form className='w-full'>
                <div className='grid lg:grid-cols-8 grid-cols-1 gap-5'>
                    <div className='lg:col-start-1 lg:col-end-6'>
                        <div className='grid grid-rows-2'>
                            <Input 
                                id="topup" 
                                type="number" 
                                onChange={(e) => setTopUp(e.target.value)}
                                value={topup}
                                Icon={MdMoney} 
                                placeholder="masukan nominal Top Up"
                                >
                            </Input>
                            <Button
                                text="Top Up"
                                type="button"
                                onClick={() => setShowConfirm(true)}
                                disabled={isButtonDisabled}
                            />
                        </div>
                    </div>
                    <div className='lg:col-start-6 lg:col-end-9'>
                        <div className='grid grid-rows-2'>
                            <div className='grid grid-cols-3 gap-5 my-7'>
                                {nominal.map((item) => (
                                    <div key={`nominal-${item.id}`}>
                                        <button type='button' onClick={() => handleNominal(item.nominal)} className='w-full py-2 border-gray-300  border-2 rounded hover:bg-gray-300 text-black'>
                                            {currencyFormat(item.nominal, 'Rp ').format(true)}
                                        </button>
                                    </div>
                                )).slice(0, 3)}
                            </div>
                            <div className='grid grid-cols-3 gap-5 my-4'>
                                {nominal.map((item) => (
                                    <div key={`nominal-${item.id}`}>
                                        <button type='button' onClick={() => handleNominal(item.nominal)} className='w-full py-2 border-gray-300  border-2 rounded hover:bg-gray-300 text-black'>
                                            {currencyFormat(item.nominal, 'Rp ').format(true)}
                                        </button>
                                    </div>
                                )).slice(3, 6)}
                            </div>
                        </div>
                    </div>
                </div>
                
                <ModalDialog 
                    show={showConfirm}
                    onClick={() => setShowConfirm(false)}
                    type="confirm"
                    nominal={topup}
                    nextAct={handleTopUp}
                />
                {successMessage &&
                    <ModalDialog 
                        show={showSuccess}
                        onClick={() => setShowSuccess(false)}
                        type="success"
                        nominal={topup}
                        nextAct={() => navigate('/')}
                    />
                }
                {errorMessage &&
                    <ModalDialog 
                        show={showError}
                        onClick={() => setShowError(false)}
                        type="error"
                        nominal={topup}
                        nextAct={() => navigate('/')}
                    />
                }

            </form>
        </div>
    )
}

export default FormTopUp