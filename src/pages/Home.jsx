import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { setTransaction } from '../redux/reducers/transaction';
import Hero from '../components/Hero';
import http from '../helpers/http';

function Home() {
  const profile = useSelector(state => state.profile.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token.token);
  const [services, setServices] = useState([]);
  const [banner, setBanner] = useState([]);

  const getService = async (token) =>{
    try {
      const {data} = await http(token).get('/services');
      setServices(data.data); 
    } catch (error) {
      const message = error?.response?.data?.message;
      return message;
    }
  };

  const getBanner = async (token) =>{
    try {
      const {data} = await http(token).get('/banner');
      setBanner(data.data); 
    } catch (error) {
      const message = error?.response?.data?.message;
      return message;
    }
  };

  const doTransaction = async (items) =>{
    dispatch(setTransaction(items));
    navigate('/transaction');
  };

  useEffect(()=>{
    getService(token);
    getBanner(token);
  }, [token]);

  return (
    <div className='min-h-screen h-full lg:h-screen w-full lg:py-20'>
      <Header/>
        <div className="px-[10%]">
          <Hero/>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 w-full my-10">
            {services.map(items => (<button key={`services-${items.service_code}`} onClick={()=> doTransaction(items)} className="service flex flex-col items-center gap-1 py-2 text-black">
              <div className="w-14 h-14 overflow-hidden rounded shadow-md">
                <img src={items.service_icon} alt={items.service_name} className="w-full h-full object-cover" />
              </div>
              <p className="text-sm lg:text-xs">{items.service_name}</p>
            </button>))}
          </div>
          <div className="flex flex-col gap-2 w-full pb-10">
            <p className="text-black text-md font-semibold">Temukan promo terbaik</p>
            <div className="flex w-full snap-x snap-mandatory overflow-x-scroll scrollbar-hide gap-4 py-3">
              {banner.map(items => (
                <div className='snap-always snap-center' key={`banner-${items.banner_name}`} >
                  <div className="h-[120px] w-[300px] rounded-lg overflow-hidden shadow-md">
                    <img src={items?.banner_image} className="w-full h-full object-cover" alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export default Home