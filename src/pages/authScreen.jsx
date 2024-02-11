import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { PanelCreateAccount, PanelLoginScreen } from 'src/pages'
import { Button, Modal, Spinner } from 'src/widgets'
import x_white from 'src/static/pics/logo/x-white.png'
import { useState, createContext } from 'react'



export function AuthScreen() {

    const navigate = useNavigate()

    return (
        
        <div className='flex flex-col h-screen sm:flex-row min-w-96'>
            
            <div className='flex-auto flex justify-center items-center'>
                <div className='flex justify-center'>
                    <img src={x_white} alt="twitter logo" className='w-1/2 max-w-3xl min-w-64 my-24' />
                </div>

            </div>
            <div className='flex-auto flex justify-center sm:items-center mx-44'>
                <div>
                    <p className='text-5xl text-white font-bold my-7'>Join today!</p>
                    <p className='text-3xl text-white font-bold my-4'>Explore what's trending</p>
                    <div className='flex flex-col items-center'>
                        <div className='w-80 h-11'>
                            <Button onClick={() => { navigate('/auth/createAccount') }}>Create account</Button>
                        </div>

                        <div className='flex justify-between my-2.5 w-full'>
                            <div className='grow flex justify-center items-center'>
                                <div className='bg-[#2F3336] h-0.5 w-28'></div>
                            </div>
                            <div>
                                <p className='text-white'>OR</p>
                            </div>
                            <div className='grow flex justify-center items-center'>
                                <div className='bg-[#2F3336] h-0.5 w-28'></div>
                            </div>
                        </div>
                        <div className='w-80 h-11'>
                            <Button relevance='secondary' onClick={() => { navigate('/auth/login') }}>Sing in</Button>
                        </div>
                    </div>

                </div>

            </div>

            <Routes>
                <Route 
                    path='/login'
                    element={<PanelLoginScreen />}
                />
                <Route 
                    path='/createAccount'
                    element={<PanelCreateAccount />}
                />
            </Routes>

        </div>
            


    )
}