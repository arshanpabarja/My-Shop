import toman from '../../assets/toman.png'
import {Link} from 'react-router-dom';
function ProductItem({ title, id, image, price, text, producer }) {

    return (
        <Link to={`/product/${id}`}>
            <div className='w-full h-110 border-t-1 border-r-1 border-b-1 border-gray-200 hover:scale-[1] hover:shadow-xl block line-clamp-1'>
                <div className="w-full h-3/4 flex items-center justify-center">
                    <img className="w-1/2" src={image} alt={title} />
                </div>
                <div className="flex flex-col mx-3">
                    <h1 className="text-[13px] text-right h-15">{title}</h1>
                    <span className='flex flex-row-reverse items-center justify-end gap-1'>{price.toLocaleString('fa-IR')}<img className='w-4' src={toman} /></span>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem