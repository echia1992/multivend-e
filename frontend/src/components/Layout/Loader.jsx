import React, {Component} from 'react';
import Lottie from 'lottie-react'
import animationData from   '../../Assests/animationData/animation_lm65g5t4.json';
const Loader = () => {
    const defaultOptions ={
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
        return (
            <div className='w-full h-screen flex items-center justify-center'>
                <Lottie options={defaultOptions} width={300} height={300}    animationData={true}/>
            </div>
        );
}

export default Loader;