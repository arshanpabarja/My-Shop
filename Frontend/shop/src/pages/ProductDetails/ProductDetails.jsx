import React, { useEffect, useState } from 'react';
import { Link, Links, useParams } from 'react-router-dom';
import { getProduct } from '../../../service/api'; // Make sure this returns the product correctly
import Container from '../../components/Container/Container';
import shop from '../../assets/shop.png'
import toman from '../../assets/toman.png'
import posetive from '../../assets/+.svg'
import negetive from '../../assets/-.svg'
import remove from '../../assets/remove.png'
import { useShoppingContext } from '../../context/ShoppingContext';
import IsLoading from '../../components/IsLoading/IsLoading';
import SmallLoading from '../../components/IsLoading/SmallLoading';

function ProductDetails() {
    const param = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getProductQty } = useShoppingContext()
    const { handleIncressQty, handleDecressQty, loadings } = useShoppingContext()

    useEffect(() => {
        setLoading(true);
        getProduct(param.id)
            .then(res => {
                setProduct(res);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Failed to fetch product");
                setLoading(false);
            });
    }, [param.id]);

    if (loading) return <IsLoading/>;
    if (error) return <p>{error}</p>;
    console.log(getProductQty(parseInt(param.id)));
    
    return (
        <Container>
            <div className="pt-20 w-full flex flex-row-reverse gap-10">
                {/* Image section */}
                <div className="flex-shrink-0 w-[35%] pt-20">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full"
                    />
                </div>

                {/* Details section */}
                <div className="flex flex-col pt-20 w-[60%]">
                    <h1 className="font-bold text-right text-2xl">{product.title}</h1>

                    <div className="grid grid-cols-[1.6fr_2fr] gap-6 pt-6">
                        {/* Seller info and price container */}
                        <div className="flex flex-col justify-between bg-gray-200 rounded-lg p-6 shadow border border-gray-300">
                            <div className="text-right">
                                <h2 className="font-semibold mb-3">فروشنده</h2>
                                <div className="flex flex-row-reverse items-center gap-3">
                                    <img src={shop} alt="shop" className="w-7" />
                                    <span className="text-[15px] font-normal">{product.producer}</span>
                                </div>
                            </div>

                            <hr className="my-4 border-gray-300" />

                            <div className="flex flex-row-reverse items-center justify-end gap-2">
                                <h3 className="font-semibold text-2xl">
                                    {product.price.toLocaleString('fa-IR')}
                                </h3>
                                <img src={toman} alt="تومان" className="w-4 h-4" />
                            </div>
                            {getProductQty(parseInt(param.id)) ?
                                <div className=' w-full gap-3 mt-6 py-1 items-start justify-start flex flex-row-reverse'>
                                    <div className="w-1/3 flex items-center bg-white border shadow-xl border-gray-300 rounded justify-center gap-4 ">
                                        <img
                                            src={negetive}
                                            onClick={() => handleDecressQty(parseInt(param.id))}
                                            className='w-6 h-10 rounded'
                                        />

                                        <span className=''>{loadings ? <SmallLoading/> : getProductQty(parseInt(param.id))}</span>
                                        <img
                                            src={posetive}
                                            onClick={() => handleIncressQty(parseInt(param.id))}
                                            className='w-6 h-10 rounded '
                                        />

                                    </div>
                                    <div className="text-[13px] text-right">
                                        <h1>در سبد خرید شما</h1>
                                        <span>برو به <Link to='/cart' className='text-blue-400'>سبد خرید</Link></span>
                                    </div>
                                </div >
                                : <button
                                    onClick={() => handleIncressQty(parseInt(param.id))}
                                    className="mt-6 w-full h-12 bg-blue-600 hover:bg-blue-700 focus:bg-gray-200 text-white font-bold rounded-lg transition-colors"
                                    type="button"
                                >
                                    {loadings ? <SmallLoading/> : 'افزودن به سبد خرید'}
                                </button>}

                        </div>

                        {/* Product description */}
                        <div className="text-sm text-right whitespace-pre-wrap">
                            {product.text}
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    );
}

export default ProductDetails;
