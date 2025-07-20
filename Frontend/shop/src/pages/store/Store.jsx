import { useEffect, useState } from 'react';
import Container from '../../components/Container/Container';
import ProductItem from '../../components/ProductItem/ProductItem';
import { getProducts } from '../../../service/api';
import IsLoading from '../../components/IsLoading/IsLoading';
function Store() {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getProducts().then(res => {
      setProduct(res)
      setLoading(false)
    })
  }, []);
  return (
    <>
      {loading ? <IsLoading /> : <div className="flex mx-3 gap-0">
        <div className="grid w-4/5 grid-cols-4 pt-30">
          {product.map(product => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>
        <div className="w-1/5"></div>
      </div>}
    </>
  )
}

export default Store