import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useFetchApi } from '../Api/useFetchApi'
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import QuantityToggle from '../components/QuantityToggle';
import Spinner from "../components/Spinner"
import { useSelector } from 'react-redux';
import dataBaseService from '../appWrite/dataBaseService.js';
import { useDispatch } from 'react-redux';
import { toggleCartStatus } from '../feautures/productSlice.js';
import conf from '../conf/conf.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


function ProductDetail() {
     let queryClient = useQueryClient()
    let CartValues = useSelector((state) => state.productDetails.databaseCartItems)
  const userLoginData = useSelector((state) => state.loginInfo.user);
    let loginStatus = useSelector((state) => state.loginInfo.isLoggedIn);
    let dispatch = useDispatch()
    let params = useParams()
    let navigate = useNavigate()
    let [errorMsg,setErrorMsg] = useState("");

    const {data, isError,error,isLoading} = useQuery({
        queryKey: [],
        queryFn: () =>  useFetchApi(`https://fakestoreapi.com/products/${params.id}`),
        
      });
     
     let [counter, setCounter] = useState(1);
      
    let handleBtnClick = () => {
        navigate(-1);
       
    }
    
    const mutation = useMutation({
        mutationFn: async() => {
            if(!loginStatus) {
                navigate("/login")
                return false
            }
            let cartItems = {
                productId: Math.round(data.id),
                title: data.title,
                image: data.image,
                price: Math.round(data.price),
                quantity: counter,
                userId: userLoginData.$id
               }
        
               for (let i = 0; i < CartValues.length; i++) {
                 
                     if(data.id == CartValues[i].productId) {
                         setErrorMsg("This product is already added to cart.")
                         return false
                     } 
                 
               }
               await dataBaseService.cartItems(cartItems);
               dispatch(toggleCartStatus(true))

        },
        onSuccess: () => {
          return  queryClient.invalidateQueries(["cartItems"]);
        }
    })

       let  handleAddToCart = ()=>{
       mutation.mutate()
       

        }

  
    return (
          
        <>
         {isLoading ? <Container><center><Spinner /></center></Container> :
           
           <>
           <Container>
                <button onClick={handleBtnClick} className="bg-orange-700 hover:bg-black text-white font-bold py-2 px-4 rounded">
                    Go back
                </button>
            </Container>
            <Container>
                <div className="bg-gray-100 dark:bg-gray-800 py-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row -mx-4">
                            <div className="md:flex-1 px-4">
                                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                    <img className="w-full h-full " src={data.image} alt="Product Image" />
                                </div>
                                <div className="flex -mx-2 mb-4">
                                    <div className="w-1/2 px-2">
                                        <button type='button' className="w-full bg-orange-700 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700" onClick={handleAddToCart}>Add to Cart</button>
                                    </div>
                                    
                                   
                                </div>
                            </div>
                            {errorMsg ? <center><h2 style={{color: "red", fontWeight: "bold"}}>{errorMsg}</h2></center> : null}
                            <div className="md:flex-1 px-4">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{data.title}</h2>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Category</h2>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    {data.category}
                                </p>

                                <div className="flex mb-4">
                                    <div className="mr-4">
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Price: </span>
                                        <span className="text-gray-600 dark:text-gray-300">${data.price}</span>
                                    </div>
                                    <div>
                                        <span className="font-bold text-gray-700 dark:text-gray-300">Total Stocks: </span>
                                        <span className="text-gray-600 dark:text-gray-300">{data.rating && data.rating.count}</span>
                                    </div>
                                </div>
                                <div className='flex mb-4'>
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Quantity:  </h2>
                                    <QuantityToggle counter={counter}
                                    setCounter={setCounter}  count={data.rating && data.rating.count} />
                                </div>

                                <div>
                                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                        {data.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Container>
           </> }
            
        </>


    )
}

export default ProductDetail