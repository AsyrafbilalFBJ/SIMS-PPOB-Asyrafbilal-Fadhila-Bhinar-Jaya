import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import profileReducer from './profile';
import balanceReducer from './balance';
import transactionReducer from './transaction';

const authConfig = {
  key: '/auth',
  storage
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  profile: profileReducer,
  balance: balanceReducer,
  transaction: transactionReducer,
});
 
export default reducer;