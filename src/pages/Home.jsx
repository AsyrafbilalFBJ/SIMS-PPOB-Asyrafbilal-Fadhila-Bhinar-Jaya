import React, { useState } from 'react'
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Banner from '../components/Banner';
import ModalDialog from '../components/ModalDialog';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearMessage } from '../redux/reducers/auth';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token.token);
  const successMessage = useSelector(state => state.auth.successMessage);
  const [showSuccess, setShowSuccess] = useState(successMessage ? true :false);

  const closeModal = () => {
    dispatch(clearMessage());
    setShowSuccess(false);
  }

  return (
    <div className='min-h-screen h-full lg:h-screen w-full lg:py-20'>
      <Header/>
        <div className="px-[10%]">
          <Hero/>
          <Services/>
          <Banner/>
      </div>
      
      {successMessage && token &&
          <ModalDialog 
              show={showSuccess}
              onClick={() => setShowSuccess(false)}
              type="success"
              message={successMessage}
              nextAct={closeModal}
          />
      }
    </div>
  )
}

export default Home