import { useContext, useState } from "react"
import { Modal, Button } from "src/widgets"
import { AuthContext } from "src/context"
import { useNavigate } from "react-router-dom"
import * as yup from 'yup'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { Submit, TextInput } from "src/widgets"
import { useLoginMutation } from "src/api/auth/login"

export const PanelLoginScreen = () => {
    const numberOfSlides = 2
    const [ modalSlide, setModalSlide] = useState(1)
    const [ error, setError ] = useState(null)
    const loginMutation = useLoginMutation()
    const navigate = useNavigate()
    const createAccountSchema = yup.object().shape({
        username: yup.string().required('Required field').matches(/@/, 'Invalid email format (must contain @)'),
        password: yup.string().required("Required field"),
    
    })
    const form = useForm({
        resolver: yupResolver(createAccountSchema)
    })


    const handleLogin = async (fieldValues) =>{
        try {
            await loginMutation.mutateAsync(fieldValues)
            navigate('/main')
        } catch (error) {
            const fieldErrors = error.response.data
            Object.keys(fieldErrors).forEach((fieldName) => {
                form.setError(fieldName, {
                    type: 'manual',
                    message: fieldErrors[fieldName],
                });
            });
            setModalSlide(1)
            setError('Something went wrong, please try again')
        }
        
    }


    return (
        
        <Modal open={true} goBack={modalSlide > 1} onClose={() => { navigate('/auth') }} onBack={() => { setModalSlide(modalSlide - 1) }}>
            
            <div className="text-white">
                    <div className="flex flex-col mx-16">
                        <form onSubmit={form.handleSubmit(handleLogin)}>
                            <div className={modalSlide === 1 ? 'block' : 'hidden'}>

                                <div className="flex flex-row items-center">
                                    <div className="flex flex-col">
                                        <h1 className="text-4xl font-bold">
                                            Sign in to platform WH.
                                        </h1>
                                        <p className="text-base text-rose-600 ">{error}</p>
                                    </div>

                                    <p className="ms-auto text-slate-600 font-bold">{modalSlide}/{numberOfSlides}</p>
                                </div>
                                <div className="flex justify-center flex-col items-center">
                                    <div className="w-full">
                                        <TextInput form={form} name={'username'} placeholder={'Email'} required={true}/>
                                    </div>
                                    
                                    <div className="w-full">
                                        <Submit text={'Next'} disabled={false} submit={false} onClick={() => { setModalSlide(modalSlide + 1) }} />
                                    </div>
                                    
                                </div>
                                <div className="mt-32 text-slate-500">
                                    Don't have account? <i onClick={()=> navigate('/auth/createAccount')} className="text-sky-500 hover:underline hover:underline-offset-1 cursor-pointer">Create a new one.</i>
                                </div>

                            </div>

                            <div className={modalSlide === 2 ? 'block' : 'hidden'}>
                                <div className="flex flex-row items-center mb-6">
                                    <h1 className="text-4xl font-bold">
                                        Enter your password.
                                    </h1>
                                    <p className="ms-auto text-slate-600 font-bold">{modalSlide}/{numberOfSlides}</p>
                                </div>
                                <div className="flex justify-center flex-col items-center">
                                    <div className="w-full">
                                        <TextInput form={form} name={'password'} placeholder={'Password'} required={true} password={true}/>
                                    </div>
                                </div>
                                <div className="mt-24">
                                    <Submit text={'Sign in'} />
                                </div>
                                <div className="mt-6 text-slate-500">
                                    Don't have account? <i onClick={()=> navigate('/auth/createAccount')} className="text-sky-500 hover:underline hover:underline-offset-1 cursor-pointer">Create a new one.</i>
                                </div>
                                
                            </div>

                          

                              
                        </form>
                    </div>

                </div>
        </Modal>
    )
}