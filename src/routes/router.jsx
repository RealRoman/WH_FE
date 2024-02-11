import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './protectedRouter'
import { NormalRoute } from './normalRoute'
import { Main, Valentine, Logout, AuthScreen } from '../pages'

export const Router = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<NormalRoute/> }>
                    <Route path='auth/*' element={<AuthScreen/>} />
                    <Route path='valentine/*' element={<Valentine/>} />
                </Route>
                
                <Route element={<ProtectedRoute/> }>
                    <Route path='main' element={<Main/>} />
                    <Route path='logout/*' element={<Logout/>}/>
                    <Route path='*' element={<Navigate to='/main' replace/>}/>
                    <Route path='main/*' element={<Main/>}/>

                </Route>
                
            </Routes>
        </BrowserRouter>
    )
}