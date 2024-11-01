import { Routes, Route } from 'react-router-dom';
import Akun from "./pages/Akun"
import Home from "./pages/Home"
import TopUp from "./pages/TopUp"
import Transaksi from "./pages/Transaksi"
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/topup' element={<TopUp />} />
        <Route path='/transaksi' element={<Transaksi />} />
        <Route path='/akun' element={<Akun />} />
      </Routes>
    </>
  )
}

export default App
