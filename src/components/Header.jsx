import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Alert from './Alert';
import { useQuery } from '@tanstack/react-query';
import { fetchCardItems } from '../feautures/productSlice';
import { login } from '../store/loginReducer';
import userAuth from '../appWrite/userAuth';
import dataBaseService from '../appWrite/dataBaseService';
import { logout } from '../store/loginReducer';

function Header() {

    let dispatch = useDispatch()
    let loginStatus = useSelector((state) => state.loginInfo.isLoggedIn);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const cartValues = useSelector((state) => state.productDetails.databaseCartItems);
    const cartStatus = useSelector((state) => state.productDetails.addToCartStatus);
  

  const {data: currentUser,  refetch: refetchUser} = useQuery({
          queryKey: ["currentUser"],
          queryFn: async() =>  {
             return await userAuth.getCurrentuser()
          },
          
        });
  
  useEffect(() => {
    if(currentUser) dispatch(login(currentUser))

  }, [currentUser])
  
   
    const { data: cartData, refetch } = useQuery({
        queryKey: ["cartItems"],
        queryFn: async () =>{ if(currentUser.$id) return await dataBaseService.getAllcartItems(currentUser?.$id)},
    });
 
    useEffect(() => {
     if(cartData)  dispatch(fetchCardItems(cartData?.documents))
    }, [cartData?.documents])
 

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };
  
    const handleLogout = async()  => {
        await userAuth.logout();
        dispatch(logout());
    }

    return (
        <header className="shadow sticky z-50 top-0 bg-white">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                             src={"./assets/logo.png"}
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center gap-x-4 lg:order-2">
                        <Link
                            to={!loginStatus && '/login' || '/profile'}
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
                        >
                            {loginStatus ? 'Profile' : 'Login'}
                        </Link>
                        {loginStatus && <Link to="/checkout">
                            <button
                                type="button"
                                className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <FaShoppingCart />
                                <div
                                    className={`${cartValues?.length === 0 || !cartValues
                                            ? 'invisible'
                                            : ''
                                        } absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900`}
                                >
                                    {cartValues?.length}
                                </div>
                            </button>
                        </Link>}
                        {loginStatus && <button
                        onClick={handleLogout}
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
                    >
                        Logout
                    </button> }
                    
                    </div>

                    {/* Hamburger Menu */}
                    <button
                        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Mobile Menu */}

                    <div
                        className={`${isMobileMenuOpen ? 'block' : 'hidden'
                            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive
                                            ? 'text-orange-700'
                                            : 'text-gray-700'
                                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/products"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive
                                            ? 'text-orange-700'
                                            : 'text-gray-700'
                                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Products
                                </NavLink>
                               
                            </li>
                            <li>
                            <NavLink
                                    to="/my-orders"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive
                                            ? 'text-orange-700'
                                            : 'text-gray-700'
                                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    My Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive
                                            ? 'text-orange-700'
                                            : 'text-gray-700'
                                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive
                                            ? 'text-orange-700'
                                            : 'text-gray-700'
                                        } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {cartStatus ? <Alert /> : null}
        </header>
    );
}

export default Header;
