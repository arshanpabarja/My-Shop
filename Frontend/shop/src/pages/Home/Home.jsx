import { useEffect, useRef, useState } from "react";
import { getProducts } from "../../../service/api";
import styled from "../Home/Home.module.css"
import Container from "../../components/Container/Container";
import ProductCart from "../../components/ProductCart/ProductCart";
import IsLoading from "../../components/IsLoading/IsLoading";

function Home() {
    const [products, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getProducts().then((res) => {
            setProduct(res)
            setIsLoading(false)
        })
    }, [])
    return (
        <>
            {isLoading ?
                <IsLoading />
                :
                <div className="pt-23 z-0 mb-200">
                    <div className=" overflow-hidden w-full flex items-center justify-center relative h-[333px]">
                        <img className={styled.slide} src="https://dkstatics-public.digikala.com/digikala-adservice-banners/9cfe03b7d09bb2e39380a54d211292b40ebd86aa_1749635372.jpg?x-oss-process=image/quality,q_95/format,webp" alt="" />
                        <img className={styled.slide} src="https://dkstatics-public.digikala.com/digikala-adservice-banners/f38da8413db5f21027d78715ed745832e5e415ec_1749629292.jpg?x-oss-process=image/quality,q_95/format,webp" alt="" />
                        <img className={styled.slide} src="https://dkstatics-public.digikala.com/digikala-adservice-banners/8a4c731734c81a44e45a500abdcc996562063070_1749290938.jpg?x-oss-process=image/quality,q_95/format,webp" alt="" />
                        <img className={styled.slide} src="https://dkstatics-public.digikala.com/digikala-adservice-banners/941779c5d021b387e7150b1f14f932c197c75a4c_1748860407.gif?x-oss-process=image?x-oss-process=image/format,webp" alt="" />
                    </div>
                    <Container>
                        <div className="w-full items-center justify-end py-4  relative flex gap-5 px-5 rounded-xl bg-blue-600 h-70 mt-10">
                            {products.map((items) => (
                                <ProductCart key={items.id} {...items} />
                            ))}
                            <h1 className="font-bold h-50 text-center text-2xl text-white flex ">تخفیف ویژه</h1>
                        </div>
                    </Container>
                </div>
            }
        </>

    );
}

export default Home;