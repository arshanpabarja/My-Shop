import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/NavbarV2';
import Store from './pages/store/Store';
import LoginContextProvider from "./context/LoginContext"
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import User from './pages/user/User';
import Dashbord from './pages/Profile/Dashbord/Dashbord';
import Edit from './pages/Profile/edit/Edit';
import NotFound from './pages/NotFound/NotFound';
import Summry from './pages/Profile/Summery/Summry';
import Cart from './pages/Cart/Cart';
import ProductDeatils from './pages/ProductDetails/ProductDetails';
import ShoppingCartContextProvider from './context/ShoppingContext';
import LayOut from './components/LayOut/LayOut';

function App() {

  return (
    <>
      <LoginContextProvider>
        <ShoppingCartContextProvider>
          <LayOut>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<User />} />
              <Route path='/store' element={<Store />} />
              <Route element={<PrivateRoute />}>
                <Route path='/dashbord' element={<Dashbord />}>
                  <Route index element={<Summry />} />
                  <Route path='edit' element={<Edit />} />
                </Route>
              </Route>
              <Route path='/cart' element={<Cart />}></Route>
              <Route path='*' element={<NotFound />} />
              <Route path='/product/:id' element={<ProductDeatils />}></Route>
            </Routes>
          </LayOut>
        </ShoppingCartContextProvider>
      </LoginContextProvider >
    </>
  )
}

export default App;
