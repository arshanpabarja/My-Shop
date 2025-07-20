import { useEffect, useState } from 'react';
import toman from '../../assets/toman.png';
import { getProduct } from '../../../service/api';
import remove from '../../assets/delete.svg'
import IsLoading from '../IsLoading/IsLoading'
import posetive from '../../assets/+.svg'
import negetive from '../../assets/-.svg'
import { useShoppingContext } from '../../context/ShoppingContext';
import SmallLoading from '../IsLoading/SmallLoading';

function CartItem({ product, qty }) {
    const [products, setProduct] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { handleIncressQty, handleDecressQty, refreshCartFromServer } = useShoppingContext()
    useEffect(() => {
        refreshCartFromServer();
    }, [qty]);

    useEffect(() => {
        setLoading(true);
        getProduct(product)
            .then(res => {
                setProduct(res);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to fetch product");
                setLoading(false);
            });
    }, [product]);
    if (loading) return <div className="w-full h-50"><SmallLoading/></div>;
    if (error) return <p>{error}</p>;
    return (
        <div className="w-full mt-10 grid gap-4 grid-cols-[80%_100px] grid-rows-[70%_25%] h-auto">
            <img src={products.image} className="row-start-1 col-start-2 mx-auto h-auto" alt={products.title} />

            <h1 className='row-start-1 text-right w-full font-bold text-lg'>
                {products.title}
                <p className='font-normal text-[16px] pt-5 line-clamp-2'>{products.text}</p>
            </h1>

            <div className='row-start-2 w-full flex items-center gap-1 flex-row-reverse text-right font-bold text-lg'>
                <h1>{products.price.toLocaleString('fa-IR')}</h1>
                <img src={toman} alt="تومان" className="w-4 h-4" />
            </div>
            <div className="row-start-2 items-center justify-center  flex col-start-2">
                <div className="w-25 gap-3 flex items-center justify-center h-12 border rounded shadow border-gray-300">
                    {qty == 1 ? <img onClick={() => handleDecressQty(products.id)} className='mb-1.5 w-auto relative cursor-pointer' src={remove} alt="" />
                        :
                        <img onClick={() => handleDecressQty(products.id)} className='w-6 h-10 cursor-pointer' src={negetive} alt="decress" />
                    }

                    <span className=''>{qty}</span>
                    <img onClick={() => handleIncressQty(products.id)} className='w-6 h-10 cursor-pointer' src={posetive} alt="incress" /></div>
            </div>
        </div>
    );
}

export default CartItem;
