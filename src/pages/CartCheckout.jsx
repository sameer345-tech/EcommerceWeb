import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { removeCartItem } from "../feautures/productSlice";
import Spinner from "../components/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Container from "../components/Container";
import dataBaseService from "../appWrite/dataBaseService";
import { useNavigate } from "react-router-dom";

function CartCheckout() {
  let queryClient = useQueryClient()
  let navigate = useNavigate()

  const cartItems = useSelector((state) => state.productDetails.databaseCartItems);
  
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  const handlePopup = () => {
    setShowPopup(true);
    const timeoutId = setTimeout(() => setShowPopup(false), 2000);
    return () => clearTimeout(timeoutId); 
  };
  const handleUpdatePopup = () => {
    setShowUpdatePopup(true);
    const timeoutId = setTimeout(() => setShowUpdatePopup(false), 2000);
    return () => clearTimeout(timeoutId); 
  };
  
  


  let deleteMutation = useMutation({
    mutationFn: async (id) => {
      await dataBaseService.deleteItems(id);
      handlePopup()
    },
    onSuccess: ()=> {
      return queryClient.invalidateQueries(["cartItems"]);
    }
  });
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }) => {
      await dataBaseService.updateQuantity(id, quantity); 
    },
    onSuccess: () => {
      handleUpdatePopup();
      return  queryClient.invalidateQueries(["cartItems"]);
    },
  });
  
  
  const handleOnClick = useCallback((event, id, quantity) => {
    const newQuantity = event.target.innerText === "+" ? quantity + 1 : Math.max(0, quantity - 1); 
    updateQuantityMutation.mutate({ id, quantity: newQuantity }); // 
  },[])
  

  cartItems?.length === 0 && <Container><center><h2 className="text-3xl font-bold text-gray-800 mb-6">Your cart is empty</h2></center></Container>

  // Calculate total price
  const totalPrice = cartItems?.reduce((total, item) => total + item.price * item.quantity, 0);


  return (
    cartItems ? <><div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Cart & Checkout</h1>

        {/* Cart Items Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Cart Items</h2>
          {showPopup && <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4"> Item deleted successfully</div>}
          {cartItems?.length > 0 ? (
            <ul>
              {cartItems?.map((item) => (
                <li
                  key={item.productId}
                  className="flex items-center justify-between border-b py-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                      <p className="text-gray-600 text-sm">Price: ${item.price}</p>
                      <label > Quantity</label>
                      <div className="flex items-center">
                        <button
                          className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg"
                          onClick={(event) => handleOnClick(event, item.$id, item.quantity)}
                        >
                          -
                        </button>
                        <p className="mx-2">{item.quantity}</p> {/* Directly quantity dikhaya */}
                        <button
                          className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg"
                          onClick={(event) => handleOnClick(event, item.$id, item.quantity)}
                        >
                          +
                        </button>
                      </div>
                      {showUpdatePopup && <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4"> Quantity updated.</div>}

                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-gray-800 font-semibold">
                      ${item.price * item.quantity}
                    </div>
                    <button
                      onClick={() => deleteMutation.mutate(item.$id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
        </div>

        {/* Checkout Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Payment Summary</h2>

          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Subtotal:</span>
            <span className="text-gray-800 font-medium">${totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Tax (10%):</span>
            <span className="text-gray-800 font-medium">
              ${(totalPrice * 0.1).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between border-t pt-4 font-bold">
            <span className="text-gray-800">Total:</span>
            <span className="text-gray-800">$
              {(totalPrice + totalPrice * 0.1).toFixed(2)}
            </span>
          </div>

          <button onClick={() => cartItems?.length >= 1 ? navigate('/order-form') : alert("Please add to cart some products.") }
            type="button"
            className="w-full mt-6 bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div></> : <Container><center><Spinner /></center></Container>
  );
}

export default CartCheckout;
