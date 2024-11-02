import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setWarningMessage } from '../redux/reducers/auth';

function Authenticated({children}) {
    const token = useSelector(state => state.auth.token.token);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!token){
          dispatch(setWarningMessage('Lakukan login terlebih dahulu'));
        }
      },[]);
    
      if(token){
        return children;
      }else{
        return <Navigate to="/login"/>;
      }
}

export default Authenticated