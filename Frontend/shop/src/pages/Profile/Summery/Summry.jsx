import React from 'react'
import order from '../../../assets/order.svg';
import deliverd from '../../../assets/delivered.svg';
import returnn from '../../../assets/return.svg';

function Summry() {
    return (
        <div className="w-full border-gray-300 px-4 pt-4 border-1 rounded h-1/2 grid grid-rows-2">
            <h1 className='w-full flex flex-col items-end font-bold'> : سفارش های من <span className='w-20 h-2 border-b-2 border-red-600'></span></h1>
            <div className="flex flex-row-reverse text-right items-end py-3">
                <div className="w-1/3 h-17 border-gray-300 flex flex-row-reverse">
                    <img src={order} alt="" />
                    <div className="flex flex-col pr-6 mt-3">
                        <h1>سفارش</h1>
                        <span className='text-[13px]'>جاری</span>
                    </div>
                </div>
                <div className="w-1/3 h-17 border-r-1 border-l-1 border-gray-300 px-4 flex flex-row-reverse">
                    <img src={deliverd} alt="" />
                    <div className="flex flex-col pr-6 mt-3">
                        <h1>سفارش</h1>
                        <span className='text-[13px]'>تحویل شده</span>
                    </div>
                </div>
                <div className="w-1/3 h-17 border-gray-300 px-4 flex flex-row-reverse">
                    <img src={returnn} alt="" />
                    <div className="flex flex-col pr-6 mt-3">
                        <h1>سفارش</h1>
                        <span className='text-[13px]'>مرجوعی</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summry