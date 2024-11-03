import React, { useEffect, useState } from 'react';
import http from '../helpers/http';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import currencyFormat from '../utils/Currency';
import { getBalanceAction } from '../redux/actions/balance';
// import EmptyTransaction from '../../components/EmptyTransaction';
import { FaPlus, FaMinus } from "react-icons/fa6";

function History() {
  const [history, setHistory] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token.token);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);

  const getTransactionHistory = async (limit, offset) =>{
    try {
      const {data} = await http(token).get('/transaction/history', {params: {
        limit: limit,
        offset: offset
      }});
      setHistory(data.data.records);
    } catch (error) {
      return error?.responset?.data?.massage;
    }
  }; 

  useEffect(()=>{
    getTransactionHistory(limit, offset);
    dispatch(getBalanceAction(token));
  }, [token, limit, offset]);

  const handleShowMore = () => {
    setOffset(prevOffset => prevOffset + limit);
    setHistory(prevHistory => [...prevHistory, ...history]);
  };

  return (
        <div className="w-full flex flex-col items-center lg:items-start gap-3 py-10">
            <p className="text-black text-md font-semibold">Semua Transaksi</p>
            <div className='flex flex-col gap-5 w-full h-full'>
                {history.length > 0 ? (
                    history.map(item =>(
                        <div key={`history-${item.invoice_number}`} className='flex justify-between px-[3%] border-gray-300 border-2 rounded-md py-3'>
                            <div className=''>
                                {item.transaction_type === 'TOPUP' && 
                                    <p className='flex items-center gap-2 text-xl text-green-500 font-semibold'>
                                        <FaPlus size={15}/>
                                        {currencyFormat(item.total_amount, 'Rp ').format(true)}
                                    </p>}
                                {item.transaction_type === 'PAYMENT' && 
                                    <p className='flex items-center gap-2 text-xl text-red-500 font-semibold'>
                                        <FaMinus size={15} />
                                        {currencyFormat(item.total_amount, 'Rp ').format(true)}
                                    </p>}
                                <p className='text-sm text-gray-300 mt-1'>{moment(item.created_on).format('DD MMMM YYYY h:mm')} WIB</p>
                            </div>
                            <p className='text-sm text-gray-500 text-center'>{item.description}</p>
                        </div>
                    ))
                ) : (
                    <div className='w-full h-full justify-center items-center pt-20'>
                        <p className='text-sm text-center text-gray-300'>Maaf tidak ada histori transaksi saat ini</p>
                    </div>
                )}
            </div>
            {history.length >= limit && (
                <button
                    onClick={handleShowMore}
                    className="duration-200 hover:text-red-500 text-lg font-semibold w-full"
                    type="button"
                >
                See more
                </button>
            )}
        </div>
    );
}

export default History;