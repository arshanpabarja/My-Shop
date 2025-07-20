import React, { useState, useEffect } from 'react';
import X from '../../assets/X.png';

function Message({ props, duration = 5000 }) {
    const [closed, setClosed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setClosed(true);
            window.location.reload(); // Auto refresh after timeout
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, props]);

    if (closed || !props) return null;

    return (
        <div className='w-full rounded flex flex-row items-center justify-end h-14 bg-[#da7676] shadow-lg p-4 mb-4'>
            <h1 className='font-bold text-white text-[16px] mr-4'>{props}</h1>
            <img
                src={X}
                alt='close button'
                onClick={() => { 
                    setClosed(true); 
                    window.location.reload(); // Manual refresh on click
                }}
                className="text-white text-xl cursor-pointer select-none w-4 h-4"
                title="بستن"
            />
        </div>
    );
}

export default Message;
