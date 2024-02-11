import { useForm } from "react-hook-form"
import { useSportsQuery } from "src/api/data/sports"
import { usecertificationsQuery } from "src/api/data/certifications"
import { yupResolver } from '@hookform/resolvers/yup'
import { TextInput, Submit, CheckBoxInput, SelectInput, RadioInput, Spinner, Modal } from 'src/widgets'
import { useEffect, useState } from "react"
import * as yup from 'yup'
import { useCreateUserMutation } from "src/api/data/createUser"
import { useNavigate } from "react-router-dom"
import { useExperienceQuery } from "src/api/data/experience"

export const PanelCreateAccount = () => {
    const navigate = useNavigate()
    const [showCreateModalSlide, setShowCreateModalSlide] = useState(1)
    const [showSpinner, setShowSpinner] = useState(false)
    const userCreateMutation = useCreateUserMutation()
    const { data: rawSportOptions } = useSportsQuery()
    const { data: rawExperienceOptions } = useExperienceQuery()
    const { data: rawCertOptions } = usecertificationsQuery()
    const [selectedSports, setSelectedSports] = useState([])
    const [sportOptions, setSportOptions] = useState([])
    const [expOptions, setExpOptions] = useState([])
    const [error, setError] = useState(null)
    const [isTrainer, setIsTrainer] = useState(false)
    const [numberOfSlides, setNumberOfSlides] = useState(5)
    const createAccountSchema = yup.object().shape({
        email: yup.string().required('Required field').matches(/@/, 'Invalid email format (must contain @)'),
        username: yup.string().required('Required field'),
        first_name: yup.string().required('Required field').matches(/^[^\d]+$/, 'First name must only contain alphabetic characters'),
        last_name: yup.string().required('Required field').matches(/^[^\d]+$/, 'Last name must only contain alphabetic characters'),
        location: yup.boolean(),
        is_trainer: yup.boolean(),
        password: yup.string().required("Required field"),
        password_control: yup.string().required("Required field").oneOf([yup.ref('password'), null], 'Passwords must match'),
        experience: yup.number().required('Required field'),
        sport: yup.array().of(
            yup.object({
                value: yup.number(),
                certifications: yup.array().of(
                    yup.object({
                        value: yup.number(),
                        label: yup.string()
                    })
                )
            })
        ),
    })

    const form = useForm({
        resolver: yupResolver(createAccountSchema)
    })

    const createUser = async (fieldValues) => {
        const name = fieldValues.first_name.toLowerCase()

        try {
            setShowSpinner(true)
            await userCreateMutation.mutateAsync(fieldValues)
            if (name.includes('a') && name.includes('d') && name.includes('l')) {
                navigate("/valentine")
            } else {
                navigate("/main")
            }
        } catch (error) {
            const fieldErrors = error.response.data
            Object.keys(fieldErrors).forEach((fieldName) => {
                form.setError(fieldName, {
                    type: 'manual',
                    message: fieldErrors[fieldName],
                });
            });
            setShowCreateModalSlide(1)
            setError('Something went wrong, please try again')
        }
        
    }


    const handleLocation = async (e) => {
        try {
            if (e.target.checked && navigator.geolocation) {
                const res = await fetch("http://ip-api.com/json");
                if (res.status === 200) success(await res.json())
            }
        } catch (error) {
            console.log(error)
        }

    }

    function success(data) {
        form.setValue('latitude', data.lat)
        form.setValue('longitude', data.lon)
        form.setValue('longitude', data.lon)
        form.setValue('state', data.countryCode)
        form.setValue('city', data.city)
    }

    const handleCertChange = (sport, selectedCerts) => {
        const currentValues = form.getValues('sport') || [];
        const updatedValues = [...currentValues];
        const formSportIndex = form.getValues('sport').map((element, index) => {
            if (element.value === sport.value) return index
        })
        updatedValues[formSportIndex] = { value: sport.value, label: sport.label, certifications: selectedCerts }
        form.setValue('sport', updatedValues);

    }

    const getCertificationsFromSelectedSports = (sportValue,) => {
        let certOpt = []
        rawSportOptions.map((sport) => {
            if (sportValue === sport.id) return Array.prototype.push.apply(certOpt, sport.certification);
        })
        return [...new Set(certOpt)];
    }

    const getCertOptions = (sportValue) => {
        const certValues = getCertificationsFromSelectedSports(sportValue)
        return rawCertOptions.map((cert) => {
            if (certValues.includes(cert.id) && cert.is_active) return { value: cert.id, label: cert.name }
        })

    }

    useEffect(() => {
        if (rawSportOptions) {
            const options = rawSportOptions.map((element) => {
                return element.is_active ? { value: element.id, label: element.name } : null
            })
            setSportOptions(options)
        }

    }, [rawSportOptions])

    useEffect(() => {
        if (rawExperienceOptions) {
            const options = rawExperienceOptions.map((element) => {
                return element.is_active ? { value: element.id, label: element.name } : null
            })
            setExpOptions(options)
        }

    }, [rawExperienceOptions])


    return (
        <>
            <Spinner open={showSpinner} />
            <Modal open={true} goBack={showCreateModalSlide > 1} onClose={() => { navigate('/auth') }} onBack={() => { setShowCreateModalSlide(showCreateModalSlide - 1) }}>
                <div className="text-white">
                    <div className="flex flex-col mx-16">
                        <form onSubmit={form.handleSubmit(createUser)}>
                            <div className={showCreateModalSlide === 1 ? 'block' : 'hidden'}>

                                <div className="flex flex-row items-center">
                                    <div className="flex flex-col">
                                        <h1 className="text-4xl font-bold">
                                            Create account.
                                        </h1>
                                        <p className="text-base text-rose-600 ">{error}</p>
                                    </div>

                                    <p className="ms-auto text-slate-600 font-bold">{showCreateModalSlide}/{numberOfSlides}</p>
                                </div>
                                <TextInput placeholder={"Email"} name={'email'} form={form} />
                                <TextInput placeholder={"Username"} name={'username'} form={form} />
                                <TextInput placeholder={"First name"} name={'first_name'} form={form} />
                                <TextInput placeholder={"Last name"} name={'last_name'} form={form} />
                                <div className="mt-24">
                                    <Submit text={'Next'} disabled={false} submit={false} onClick={() => { setShowCreateModalSlide(showCreateModalSlide + 1) }} />
                                </div>

                            </div>

                            <div className={showCreateModalSlide === 2 ? 'block' : 'hidden'}>
                                <div className="flex flex-row items-center mb-6">
                                    <h1 className="text-4xl font-bold">
                                        Enhance your expirience.
                                    </h1>
                                    <p className="ms-auto text-slate-600 font-bold">{showCreateModalSlide}/{numberOfSlides}</p>
                                </div>
                                <div className="mb-6">
                                    <h1 className="text-2xl mb-3">Are you a certificated trainer?</h1>
                                    <div className="flex flex-row">
                                        <p>Our app enhances exercise efficiency. Opting in prompts for a certification to showcase your expertise. Connect with like-minded users and broaden your audience.</p>
                                        <div className="mt-auto ms-auto">
                                            <CheckBoxInput name={'is_trainer'} form={form} onChange={(e) => setIsTrainer(e.target.checked)} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-2xl mb-3">Do you want others to see you location?</h1>
                                    <div className="flex flex-row">
                                        <p>If you available our app to see your location we can recommend you trainers in your area</p>
                                        <div className="mt-auto ms-auto">
                                            <CheckBoxInput name={'location'} form={form} onChange={(e) => handleLocation(e)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-24">
                                    <Submit text={'Next'} disabled={false} submit={false} onClick={() => { setShowCreateModalSlide(showCreateModalSlide + 1) }} />
                                </div>
                            </div>

                            <div className={showCreateModalSlide === 3 ? 'block' : 'hidden'}>
                                <div className="flex flex-row items-center mb-6">
                                    <h1 className="text-4xl font-bold">
                                        Select sports you are interested in.
                                    </h1>
                                    <p className="ms-auto text-slate-600 font-bold">{showCreateModalSlide}/{numberOfSlides}</p>
                                </div>
                                <div>
                                    <div className="mb-5">
                                        <SelectInput form={form} name={'sport'} options={sportOptions} multi={true} onChange={(e) => { setSelectedSports(e) }} />
                                    </div>
                                    <div className="mb-5 h-px bg-slate-600"></div>

                                    {isTrainer && selectedSports.map((element, index) => (
                                        <div key={index} className="mb-4 ml-5">
                                            <SelectInput placeholder={`Your certifications for ${element.label}`} register={false} required={false} options={getCertOptions(element.value)} multi={true} onChange={(e) => { handleCertChange(element, e) }} />
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-24">
                                    <Submit text={'Next'} disabled={false} submit={false} onClick={() => { setShowCreateModalSlide(showCreateModalSlide + 1) }} />
                                </div>
                            </div>

                            <div className={showCreateModalSlide === 4 ? 'block' : 'hidden'}>
                                <div className="flex flex-row items-center mb-6">
                                    <h1 className="text-4xl font-bold">
                                        Select your experience with sports.
                                    </h1>
                                    <p className="ms-auto text-slate-600 font-bold">{showCreateModalSlide}/{numberOfSlides}</p>
                                </div>
                                <div>
                                    {expOptions.map((element, index) => (
                                        <div key={index} className="mb-4 ml-5">
                                            <RadioInput label={element.label} name={'experience'} checked={false} subLabel={''} value={element.value} form={form} />
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-24">
                                    <Submit text={'Next'} disabled={false} submit={false} onClick={() => { setShowCreateModalSlide(showCreateModalSlide + 1) }} />
                                </div>
                            </div>

                            <div className={showCreateModalSlide === 5 ? 'block' : 'hidden'}>

                                <div className="flex flex-row items-center">
                                    <h1 className="text-4xl font-bold">
                                        Security.
                                    </h1>
                                    <p className="ms-auto text-slate-600 font-bold">{showCreateModalSlide}/{numberOfSlides}</p>
                                </div>
                                <TextInput placeholder={"Password"} name={'password'} form={form} password={true} />
                                <TextInput placeholder={"Repeate password"} name={'password_control'} form={form} password={true} />



                                <div className="mt-32">
                                    <div className="mb-8 text-xs">
                                        By registering, you agree to the terms, <i className="text-sky-500 hover:underline hover:underline-offset-1 cursor-pointer">privacy policy</i> and the <i className="text-sky-500 hover:underline hover:underline-offset-1 cursor-pointer">use of cookies</i>. Platform WH may use your <i className="text-sky-500 hover:underline hover:underline-offset-1 cursor-pointer">contact information</i>, including your email address and phone number, for the purposes described in the Privacy Policy
                                    </div>
                                    <Submit text={'Create account'} />

                                </div>
                            </div>

                        </form>
                    </div>

                </div>
            </Modal>
        </>
    )
}