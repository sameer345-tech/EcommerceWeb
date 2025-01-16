import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { useFetchApi } from '../Api/useFetchApi';
import { useQuery } from "@tanstack/react-query";


function Home() {
  
 const {data, isError,error,isLoading} = useQuery({
    queryKey: ["products"],
    queryFn: () =>  useFetchApi('https://fakestoreapi.com/products?limit=10'),
  });
  
  
 

  return (
    <>

      <Container>
        <section
          className="relative bg-[url(https://img.freepik.com/premium-photo/paper-cartons-with-shopping-cart-logo-credit-card-laptop-keyboard_9635-3759.jpg?w=740)] bg-cover bg-center bg-no-repeat rounded-xl"
        >
          <div
            className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
          ></div>

          <div
            className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
          >
            <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                Discover the Future of

                <strong className="block font-extrabold text-orange-700 "> Online Shopping. </strong>
              </h1>

              <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
                Experience a seamless and personalized e-commerce platform tailored for your needs. From exclusive deals to top-quality products, shop smart and effortlessly with us!
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-center">
                <NavLink
                  to="/login"
                  className="block w-full rounded bg-orange-700  px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                >
                  Start Shopping
                </NavLink>

                <NavLink
                  to="/products"
                  className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                >
                  Explore More
                </NavLink>
              </div>
            </div>
          </div>
        </section>
        <h2 className="text-3xl font-bold dark:text-black py-7">New Collections:-</h2>      
        </Container>

      
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px' }}>
          {isLoading ? <center><Spinner /></center>: null} 
          {isError && <Container><center><h2>{error.message}</h2></center></Container>}
          {data?.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      


    </>
  )
}

export default Home