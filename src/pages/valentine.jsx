import stand from 'src/static/pics/cats/stand.png'
import foour from 'src/static/pics/cats/four.png'
import cute from 'src/static/pics/cats/cute.png'
import hello from 'src/static/pics/cats/hello.png'
import huh from 'src/static/pics/cats/huh.png'
import silly from 'src/static/pics/cats/silly.png'
import two from 'src/static/pics/cats/two.png'
import orange from 'src/static/pics/cats/orange.png'

import './valentine.css'



export const Valentine = () => {

    

    const handleNo = (e) => {
        const cont = document.getElementById('cont');
        const input = document.getElementById('no')
        const width = cont.clientHeight - 2000
        const height = cont.clientWidth - 2000
        const top = Math.floor(Math.random() * width)
        const left = Math.floor(Math.random() * height)
        input.style.top = `${top}px`;
        input.style.left = `${left}px`;
    }

    return (
        <div className="w-screen h-screen bg-fuchsia-400" id='cont'>
            <div className='font-custom text-9xl flex flex-col' style={{ fontSize: '400px' }}>
                <div style={{ fontSize: '350px' }}>
                    <i className='transform text-orange-800 m-20'>W</i>
                    <i className='transform text-amber-500 m-20'>I</i>
                    <i className='transform text-red-100 m-20'>L</i>
                    <i className='transform text-lime-400 m-20'>L</i>
                    <i className='transform text-cyan-500 ms-40 m-20'>Y</i>
                    <i className='transform text-pink-950 m-20'>O</i>
                    <i className='transform text-rose-800 m-20'>U</i>
                    <i className='transform text-red-100 ms-40'>B</i>
                    <i className='transform text-lime-400 m-20'>E</i>
                </div>
                <div className='mx-auto'>
                    <i className='transform text-cyan-500 m-20'>M</i>
                    <i className='transform text-lime-400 m-20'>Y</i>
                </div>
                <div className='mx-auto' style={{ fontSize: '350px' }}>
                    <i className='transform text-amber-500 m-20'>V</i>
                    <i className='transform text-cyan-500 m-20'>A</i>
                    <i className='transform text-orange-800 m-20'>L</i>
                    <i className='transform text-red-100 m-20'>E</i>
                    <i className='transform text-pink-950 m-20'>N</i>
                    <i className='transform text-blue-100 m-20'>T</i>
                    <i className='transform text-cyan-500 m-20'>I</i>
                    <i className='transform text-red-100 m-20'>N</i>
                    <i className='transform text-pink-950 m-20'>E</i>
                    <i className='transform text-orange-800 m-20'>?</i>
                </div>
                <div className='flex flex-row justify-center'>
                    <div className='m-40 relative'>
                        <p className='text-9xl'>YES</p>
                        <label htmlFor="yes" className='container'>
                            <input type="checkbox" name="yes" id="yes"/>
                            <span className='checkmark'></span>
                        </label>
                    </div>

                    <div className='m-40 relative'>
                        <p className='text-9xl'>NO :(</p>
                        <label htmlFor="no" className='text-9xl container'>
                            <input type="checkbox" name="no"/>
                            <span className='checkmark' id="no" onMouseEnter={handleNo}></span>
                        </label>
                    </div>
                </div>

            </div>
            <img src={stand} alt="twitter logo" className='w-60 absolute' style={{ top: 250 }} />
            <img src={foour} alt="twitter logo" className='w-60 absolute' style={{ right: 250, top: 500 }} />
            <img src={cute} alt="twitter logo" className='w-90 absolute' style={{ left: 1000, top: 500, width: '400px' }} />
            <img src={hello} alt="twitter logo" className='absolute' style={{ left: 1000, bottom: 500, width: '400px' }} />
            <img src={huh} alt="twitter logo" className='absolute' style={{ right: 1000, bottom: 500, width: '300px' }} />
            <img src={silly} alt="twitter logo" className='absolute' style={{ left: 200, bottom: 200, width: '400px' }} />
            <img src={two} alt="twitter logo" className='absolute' style={{ right: 1000, top: 500, width: '400px' }} />
            <img src={orange} alt="twitter logo" className='w-12 absolute' style={{ left: 400, top: 600, width: '400px' }} /> 
            {/* 
        
        
        
        
        */}
        </div>
    )
}

