import React from 'react'
import NotFoundd from '../../assets/NotFoundd.jpg'
import left from '../../assets/left2.png'
import { Link } from 'react-router-dom'
function NotFound() {
    return (
        <div className='pt-100 w-screen h-50 flex relative flex-col items-center justify-center'>
            <h1 className='text-xl font-bold'>صفحه که به دنبال آن بودید پیدا نشد!</h1>
            <Link className='text-cyan-500 flex flex-row-reverse' to='/'>صفحه اصلی <img src={left} className='w-5' alt="" /></Link>
            <img src={NotFoundd} className='w-120' alt="not found" />
        </div>
        
    )
}

export default NotFound