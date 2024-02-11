import React from 'react';
import { SpinnerCircular } from 'spinners-react';


export const Spinner = ({open=false}) =>{
    return (
        <>
        <div style={open ? { display: 'block' } : { display: 'none' }}>
            <div className='absolute w-full h-full flex justify-center items-center z-50'>
                <SpinnerCircular size={150} color='rgb(34 211 238)' secondaryColor='rgb(75 85 99)'/>
            </div>
            <div className="w-full h-full absolute  opacity-75 bg-black blur "></div>
        </div>
        </>
    );
}