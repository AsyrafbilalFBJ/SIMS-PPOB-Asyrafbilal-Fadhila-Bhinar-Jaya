import { useDispatch, useSelector } from 'react-redux';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { getProfileAction } from '../redux/actions/profile';
import { MdMenu } from "react-icons/md";
import { Dropdown } from 'flowbite-react';
import { logout } from '../redux/reducers/auth';

function Header() {
  const dispatch = useDispatch();
  const currentPath = window.location.pathname;
  const token = useSelector(state => state.auth.token.token);

  useEffect(()=>{
    dispatch(getProfileAction(token));
  }, [token]);

  return (
    <div className="lg:fixed top-0 z-10 bg-white flex w-full h-16 items-center justify-between px-[10%] border-b-[1.5px] border-grey-200">
      <Link to={'/'} className="curson-pointer flex gap-2 items-center">
        <Logo/>
      </Link>
      <div className="dropdown dropdown-end block lg:hidden py-3 z-20">
        <Dropdown label="" inline>
          <Dropdown.Item><Link to={'/top-up'} className="">Top Up</Link></Dropdown.Item>
          <Dropdown.Item><Link to={'/transaction/history'} className="">Transaksi</Link></Dropdown.Item>
          <Dropdown.Item><Link to={'/account'} className="">Akun</Link></Dropdown.Item>
        </Dropdown>
      </div>
      <div className="hidden lg:flex items-center">
        <ul className="flex gap-10 text-black text-sm">
          <Link to={'/top-up'} className={`duration-200 hover:text-red-600 content-center font-medium
            ${currentPath === '/top-up' && "text-red-600"}
            `}
          ><li>Top Up</li></Link>
          <Link to={'/transaction/history'} className={`duration-200 hover:text-red-600 content-center font-medium
            ${currentPath === '/transaction/history' && "text-red-600"}
            `}
          ><li>Transaksi</li></Link>
          <Link to={'/account'}className={`duration-200 hover:text-red-600 content-center font-medium
            ${currentPath === '/account' && "text-red-600"}
            `}
          ><li>Akun</li></Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;