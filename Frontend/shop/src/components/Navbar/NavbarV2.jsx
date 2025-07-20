import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import shopBag from '../../assets/shopBag.png'
import user from '../../assets/user.png'
import profile from '../../assets/profile.png'
import logOut from '../../assets/logOut.png'
import left from '../../assets/left.png'
import cart from '../../assets/cart.svg'
import { motion } from "framer-motion";
import { useLoginContext } from "../../context/LoginContext";
import IsLoading from "../IsLoading/IsLoading";
import SmallLoading from "../IsLoading/SmallLoading";

function Navbar() {
    const [menu, setMenu] = useState(false);
    const [hoveredLink, setHoveredLink] = useState(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { login, info } = useLoginContext();
    let first_name = info.first_name
    let last_name = info.last_name
    const [loading, setLoading] = useState(false)
    const handleLogOut = () => {
        setLoading(true)
        localStorage.clear();
        setLoading(false)
        navigate('/');
        window.location.reload();

    };


    const lis = [
        ["سفارش ها", "/dashbord/orders", shopBag],
        ["اطلاعات", "/dashbord/info", profile],
    ];

    const links = [
        { label: "فروشگاه", path: "/store" },
        { label: "سرور", path: "http://127.0.0.1:8000/api/products" },
        { label: "تماس با ما", path: "/contact" },
        { label: "خانه", path: "/" },
    ];
    const [scrollPosition, setScrollPosition] = useState({ scrollY: 0 });

    useEffect(() => {
        const updateScrollPosition = () => {
            setScrollPosition({ scrollY: window.scrollY });

        };

        window.addEventListener('scroll', updateScrollPosition);
        updateScrollPosition(); // Get initial position
        return () => window.removeEventListener('scroll', updateScrollPosition);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenu(false);
            }
        };

        if (menu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menu]);
    console.log(scrollPosition);

    return (
        <div className="w-screen mb-2 z-100">
            <div className={`w-full flex flex-col px-4 fixed top-0 right-0 left-0 z-20 bg-white  py-3`}>
                <div className="w-full h-11 flex justify-between items-center mx-auto">
                    <div className="relative top-2 left-20 gap-5 flex">
                        <button
                            onClick={login ? () => setMenu(true) : () => navigate('login')}
                            className="focus:outline-none cursor-pointer"
                            aria-haspopup="true"
                            aria-expanded={menu}
                            aria-label="Toggle user menu"
                        >
                            <img className="w-8" src={user} alt="profile image" />
                        </button>
                        <div className="border border-gray-200"></div>
                        <Link to='/cart'>
                            <img className="w-8" src={cart} alt="" />
                        </Link>

                        {login && (
                            <>
                                {menu && (
                                    <ul ref={menuRef} className="absolute border-1 border-gray-300 top-full mt-2 left-0 w-60 bg-white border-b-1 customShadow rounded-xl z-20">
                                        <Link to="/dashbord">
                                            <li className="border-b border-gray-300 gap-15 h-17 flex items-center px-4 justify-start flex-row-reverse cursor-pointer hover:bg-gray-100">
                                                <h1 className="font-bold text-md text-right">{first_name} {last_name}</h1>
                                                <img src={left} alt="" />
                                            </li>
                                        </Link>
                                        {lis.map((li, index) => (
                                            <Link to={li[1]} key={index}>
                                                <li onClick={() => setMenu(false)} className="border-b gap-2 border-gray-300 h-12 flex items-center px-4 justify-end cursor-pointer hover:bg-gray-100">
                                                    {li[0]}<img className="w-6" src={li[2]} alt="" />
                                                </li>
                                            </Link>
                                        ))}
                                        <li
                                            className=" border-gray-300 gap-2 h-12 flex items-center px-4 justify-end cursor-pointer hover:bg-gray-100"
                                            onClick={handleLogOut}
                                        >
                                            {loading ? <SmallLoading/> : 'خروج'}
                                            <img className='w-6' src={logOut} alt="" />
                                        </li>
                                    </ul>
                                )}
                            </>
                        )}
                    </div>

                    <div className="flex items-center space-x-6">
                        <input
                            type="text"
                            className="bg-gray-300 w-120 rounded px-4 text-right h-11"
                            placeholder="جستجو در فروشگاه"
                        />
                        <h1 className="font-bold z-20 text-4xl text-blue-600">Shop 2</h1>
                    </div>
                </div>
            </div>
            <div className={`flex w-full py-2 border-b mt-15 fixed z-10 bg-white top-0 left-0 right-0 px-4 border-gray-300 justify-end space-x-6 transition-transform transform ${scrollPosition.scrollY > 200 ? '-translate-y-7' : 'translate-0'}`}>
                {links.map((link, index) => (
                    <div
                        key={index}
                        className="relative cursor-pointer"
                        onMouseEnter={() => setHoveredLink(index)}
                        onMouseLeave={() => setHoveredLink(null)}
                    >
                        <Link to={link.path} className="relative z-10">{link.label}</Link>
                        {hoveredLink === index && (
                            <motion.div
                                className="bg-blue-600 h-0.5 absolute top-[30px] left-0 right-0"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                exit={{ width: 0 }}
                                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Navbar;
