import x_white from 'src/static/pics/logo/x-white.png'

export const Modal = ({ open, children, onClose = () => { }, onBack = () => { }, goBack = false }) => {
    if (!open) {
        return null
    }

    return (
        <div className="w-screen h-screen justify-center items-center absolute top-0" style={open ? { display: 'flex' } : { display: 'none' }}>
            <div style={{ width: '600px' }} className="rounded-lg bg-black text-white z-40 flex flex-col">
                <div className='flex flex-row'>
                    {goBack ?
                        <div className='m-4 cursor-pointer absolute' onClick={() => { onBack() }}>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="text-white w-6"><g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" fill='#FFFFFF'></path></g></svg>
                        </div>
                        :
                        <div className='m-4 cursor-pointer absolute' onClick={() => { onClose() }}>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="text-white w-6"><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z" fill='#FFFFFF'></path></g></svg>
                        </div>

                    }


                    <div className='mx-auto m-4'>
                        <img src={x_white} alt="twitter logo" className='w-7' />
                    </div>
                </div>
                <div className='m-4'>
                    {children}
                </div>
            </div>
            <div className="w-full h-full absolute opacity-50 bg-[#5B7083] "></div>

        </div>
    )
}