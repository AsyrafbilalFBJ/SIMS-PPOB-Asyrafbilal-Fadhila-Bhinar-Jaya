import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTransaction } from '../redux/reducers/transaction';
import http from '../helpers/http';

function Services() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token.token);
    const [services, setServices] = useState([]);
  
    const getService = async (token) =>{
      try {
        const {data} = await http(token).get('/services');
        setServices(data.data); 
      } catch (error) {
        const message = error?.response?.data?.message;
        return message;
      }
    };
  
    const doTransaction = async (item) =>{
      dispatch(setTransaction(item));
      navigate('/transaction');
    };
  
    useEffect(()=>{
      getService(token);
    }, [token]);
    
    return (
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 w-full my-10">
            {services.map(item => (<button key={`services-${item.service_code}`} onClick={()=> doTransaction(item)} className="service flex flex-col items-center gap-1 py-2 text-black">
                <div className="w-14 h-14 overflow-hidden rounded shadow-md">
                    <img src={item.service_icon} alt={item.service_name} className="w-full h-full object-cover" />
                </div>
                <p className="text-sm lg:text-xs">{item.service_name}</p>
            </button>))}
        </div>
    )
}

export default Services