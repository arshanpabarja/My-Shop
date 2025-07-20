import React, { useEffect, useState } from 'react'
import Container from '../../components/Container/Container'
import CartItem from '../../components/CartItem/CartItem'
import { getCartItem, getProducts } from '../../../service/api'
import { useShoppingContext } from '../../context/ShoppingContext'
import { useLoginContext } from '../../context/LoginContext'
import toman from '../../assets/toman.png'
import empty from '../../assets/empty.svg'
import { Link } from 'react-router-dom'


function Cart() {
    const { cartItem, total, refreshCartFromServer } = useShoppingContext()
    const { login } = useLoginContext()
    const [products, setProducts] = useState()
    useEffect(() => {
        refreshCartFromServer();
        getProducts().then(res => {
            setProducts(res)
        }).catch(err => {
            console.error(err);
        })

    }, []);
    const totalPrice = products && cartItem.length > 0
        ? cartItem.reduce((total, item) => {
            const product = products.find(p => p.id === item.product);
            return total + (product?.price || 0) * item.qty;
        }, 0)
        : 0;

    return (
        <Container>
            <div className='pt-40 flex gap-5 w-full'>

                {/* pay box */}
                {cartItem != '' ?
                    <>
                        <div className="w-1/4"></div>
                        <div className="w-1/5 fixed h-45 border flex flex-col bg-white border-gray-300 rounded-[7px]">
                            <div className="grid grid-cols-2 grid-rows-2">
                                <h1 className='w-full col-start-2 row-start-1 h-13 text-sm text-gray-500 flex items-center justify-end text-right px-4'> : قیمت کالاها</h1>
                                <h1 className='w-full col-start-1 row-start-1 h-13 text-sm text-gray-500 flex items-center justify-start text-right px-4 flex-row-reverse gap-2'>{login ? total.toLocaleString('fa-IR') : totalPrice.toLocaleString('fa-IR')}<img className='w-5' src={toman} /></h1>
                                <h1 className='w-full col-start-2 row-start-2 h-13 text-sm text-black flex items-center justify-end text-right px-4'>: جمع سبد خرید</h1>
                                <h1 className='w-full col-start-1 row-start-2 h-13 text-sm text-black flex items-center justify-start gap-2 flex-row-reverse text-right px-4'>{login ? total.toLocaleString('fa-IR') : totalPrice.toLocaleString('fa-IR')}<img className='w-5' src={toman} /></h1>
                            </div>
                            <div className="flex w-full items-center justify-center">
                                <button className='w-11/12 flex cursor-pointer text-white items-center justify-center bg-blue-600 h-12 rounded-[7px]' >
                                    تایید و تکمیل خرید
                                </button>
                            </div>
                        </div>

                        <div className="w-4/5 h-screen">
                            {cartItem.map((product) => (
                                <>
                                    <CartItem key={product.product} {...product} />
                                    <div className="mt-10 border border-gray-300"></div>
                                </>
                            ))}
                        </div></> :
                    <div className='w-full flex flex-col  items-center'>
                        <img src={empty} />
                        <h1 className='font-bold text-3xl text-gray-600'>!سبد خرید شما خالی است</h1>
                        <Link className='text-blue-500' to="/">برو به صفحه اصلی</Link>
                    </div>}
            </div>
        </Container>
    )
}
export default Cart