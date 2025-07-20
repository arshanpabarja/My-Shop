import { Link, useLocation } from "react-router-dom";
import toman from '../../assets/toman.png'
function ProductCart(items) {

  return (
    <>
        {items.special &&
        <Link to={`/product/${items.id}`}>
          <div className="w-45 h-full rounded  bg-white flex flex-col">
            <div className="w-full pt-3 flex items-center justify-center"><img className="w-3/4" src={items.image} alt="title" /></div>
            <div className="w-full pt-2 px-2">
              <h1 className="text-sm text-gray-500 line-clamp-2 text-right">
                {items.title}
              </h1>
              <span className="flex w-full gap-2 flex-row-reverse justify-end mt-2 items-center">
                {items.discount.toLocaleString('fa-IR')}
                <img className="w-4" src={toman} />
              </span>
              <span className="text-sm relative bottom-2 px-7 line-through text-gray-500">
                {items.price.toLocaleString('fa-IR')}
              </span>
            </div>
          </div></Link>
        }

    </>
  )
}

export default ProductCart