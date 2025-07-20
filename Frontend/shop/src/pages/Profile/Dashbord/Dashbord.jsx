import React, { useEffect } from 'react';
import Container from '../../../components/Container/Container';
import edit from '../../../assets/edit.svg';
import home from '../../../assets/home.png';
import shopBag from '../../../assets/shopBag.png';
import user from '../../../assets/profile.png';
import logOut from '../../../assets/logOut.png';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useLoginContext } from '../../../context/LoginContext';

function Dashbord() {
  const navigate = useNavigate();
  const { handleInfo, info } = useLoginContext();

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  const links = [
    ["خلاصه وضعیت ها ", "/dashbord", home],
    ["سفارش ها", "/dashbord/orders", shopBag],
    ["اطلاعات", "/dashbord/info", user],
  ];

  // ✅ Fetch user info and redirect if first_name is empty
  useEffect(() => {
    const fetchInfo = async () => {
      const userInfo = await handleInfo();
      if (!userInfo.first_name || userInfo.first_name.trim() === '') {
        navigate('/dashbord/edit');
      }
    };

    fetchInfo();
  }, [navigate, handleInfo]);

  return (
    <div className='pt-40 px-30 mx-auto'>
      <Container>
        <div className="grid grid-cols-3 mr-0 ml-0 gap-5 w-full">

          {/* Sidebar */}
          <div className="w-80 col-end-5 border-1 border-gray-300 h-100 rounded-md">
            <div className="grid grid-cols-2 grid-rows-2 px-5 pt-5 items-end">
              <h1 className='col-start-2 font-bold text-right'>{info.first_name} {info.last_name}</h1>
              <span className="text-[12px] col-start-2 row-start-2 text-right text-gray-400">{info.phone_number}</span>
              <Link to="/dashbord/edit">
                <img src={edit} className='relative top-0 row-start-1 row-span-2 left-0 right-20' alt="edit icon" />
              </Link>
            </div>

            <ul className='row-span-2 px-3 pt-20'>
              {links.map((link) => (
                <Link key={link[1]} to={link[1]}>
                  <li className='w-full flex items-center justify-end border-t-1 border-gray-300 h-12 gap-3'>
                    {link[0]}<img className='w-7' src={link[2]} alt="" />
                  </li>
                </Link>
              ))}
              <li
                className='cursor-pointer w-full flex items-center border-b-1 justify-end border-t-1 border-gray-300 h-12 gap-3'
                onClick={handleLogOut}
              >
                خروج<img className='w-7' src={logOut} alt="" />
              </li>
            </ul>
          </div>

          {/* Content for nested pages */}
          <div className="col-span-3 row-start-1 rounded-md">
            <Outlet /> {/* This will render the nested route content */}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Dashbord;
