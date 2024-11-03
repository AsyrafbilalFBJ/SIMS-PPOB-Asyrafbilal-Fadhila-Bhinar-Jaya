import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Account from "./pages/Account"
import Home from "./pages/Home"
import TopUp from "./pages/TopUp"
import Transaction from "./pages/Transaction"
import Login from './pages/Login';
import Register from './pages/Register';
import Authenticated from './components/Authenticated';
import TransactionHistory from './pages/TransactionHistory';


function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Authenticated><Home /></Authenticated>} />
            <Route path='/top-up' element={<Authenticated><TopUp /></Authenticated>} />
            <Route path='/transaction' element={<Authenticated><Transaction /></Authenticated>} />
            <Route path='/transaction/history' element={<Authenticated><TransactionHistory /></Authenticated>} />
            <Route path='/account' element={<Authenticated><Account /></Authenticated>} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
