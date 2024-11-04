import { Modal } from 'flowbite-react'
import React from 'react'
import logo from '../assets/images/Logo.png';
import currencyFormat from '../utils/Currency';
import Button from './Button';
import { MdCheckCircle, MdCancel } from "react-icons/md";

function ModalDialog({show, onClick, type, message, nominal, service, nextAct}) {
    const currentPath = window.location.pathname;
  return (
    type === 'confirm' ? (
        <Modal show={show} size="sm" onClose={onClick} className='' position="center">
            <div className="text-center w-full p-7">
                <img className="rounded-full w-12 h-1w-12 mx-auto mb-5" src={logo} alt="image description"/>
                <div className="flex flex-col justify-center">
                    <p className="text-sm text-black dark:text-gray-400">
                        {
                            currentPath === '/top-up' ? 
                                'Anda yakin untuk Top Up sebesar' :
                            currentPath === '/transaction' && service ?
                                'Beli '+service+' senilai':
                                null
                        }
                    </p>
                    <p className="text-xl font-bold text-black dark:text-gray-400">
                        {currencyFormat(nominal, 'Rp ').format(true) }
                    </p>
                </div>
                <div className="flex flex-col justify-center">
                    <div className='h-12 items-center'>
                    <Button text="Ya, lanjutkan Top Up" theme="tertiary" onClick={nextAct}/>
                    </div>
                    <div className='h-12 items-center'>
                    <Button type="button" text="Batalkan" theme="ghost" onClick={onClick}/>
                    </div>
                </div>
            </div>
        </Modal>
    ) :
    type === 'success' ? (
        <Modal show={show} size="sm" onClose={onClick} popup>
            <div className="text-center w-full p-7">
                <MdCheckCircle size={60} className="rounded-full mx-auto mb-5 text-green-500"/>
                <div className="flex flex-col justify-center">
                    <p className="text-sm text-black dark:text-gray-400">
                        {
                            currentPath === '/top-up' ? 
                                'Top Up sebesar' :
                            currentPath === '/transaction' && service ?
                                'Pembayaran '+service+' sebesar':
                            message ?
                                message :
                                null
                        }
                    </p>
                    {!message && 
                        <>
                            <p className="text-xl font-bold text-black dark:text-gray-400">
                                {currencyFormat(nominal, 'Rp ').format(true)}
                            </p>
                            <p className="text-sm text-black dark:text-gray-400">
                                berhasil!
                            </p>
                        </>
                    }
                </div>
                <div className="flex flex-col justify-center">
                    <div className='h-12 items-center'>
                    <Button text={`${!message ? 'Kembali ke Beranda' : 'Tutup'}`} theme="tertiary" onClick={nextAct}/>
                    </div>
                </div>
            </div>
        </Modal>
    ) :
    type === 'error' ? (
        <Modal show={show} size="sm" onClose={onClick} popup>
            <div className="text-center w-full p-7">
                <MdCancel size={60} className="rounded-full mx-auto mb-5 text-red-500"/>
                <div className="flex flex-col justify-center">
                    <p className="text-sm text-black dark:text-gray-400">
                        {
                            currentPath === '/top-up' ? 
                                'Top Up sebesar' :
                            currentPath === '/transaction' && service ?
                                'Pembayaran '+service+' sebesar':
                            message ?
                                message :
                                null
                        }
                    </p>
                    {!message && 
                        <>
                            <p className="text-xl font-bold text-black dark:text-gray-400">
                                {currencyFormat(nominal, 'Rp ').format(true) }
                            </p>
                            <p className="text-sm text-black dark:text-gray-400">
                                gagal
                            </p>
                        </>
                    }
                </div>
                <div className="flex flex-col justify-center">
                    <div className='h-12 items-center'>
                    <Button text="Kembali ke Beranda" theme="tertiary" onClick={nextAct}/>
                    </div>
                </div>
            </div>
        </Modal>
    ) : null
  )
}

export default ModalDialog