import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import orderInfoService from '../appWrite/orderInfo';
import dataBaseService from '../appWrite/dataBaseService';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import Spinner from '../components/Spinner';
import { ID} from "appwrite"


function OrderForm() {
  
    let currentUser = useSelector((state) => state.loginInfo.user);
      const [showPopup, setShowPopup] = useState(false);
      let navigate = useNavigate()
      const [loader, setLoader] = useState(false);
    
  const {data: cartItems,  refetch} = useQuery({
          queryKey: ["cartItems"],
          queryFn: async() =>  await dataBaseService.getAllPosts(),
        });
        

    const handleSubmit = async(formData)=> {
        setLoader(true);
        const formInputData = Object.fromEntries(formData.entries());
        // console.log(formInputData);
        let orderDetails = {
            ...formInputData,
            orderedItems: JSON.stringify(cartItems),
            date: new Date().toLocaleString(),
            status: "Pending",
            orderId: ID.unique(),
            userId: currentUser.$id
        }
        try {
            await orderInfoService.orderDetails(orderDetails);
            console.log("Order Placed Successfully");

           if(cartItems?.documents?.length) {
            try {
              for (const item of cartItems.documents) 
               await dataBaseService.deleteItems(item.$id);
              console.log("successfully deleted");
              setShowPopup(true);
              setLoader(false);
  
             } catch (error) {
              console.log(error.message);
              
             }
             finally {
             return refetch();
             }
           }
            
            
        } catch (error) {
            console.error(error.message);
            
    } }
    const onClose = () => {
        setShowPopup(false);
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Order Information</h2>
            <form action={handleSubmit}>
              {/* Full Name */}
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-600 focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>
    
              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-600 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
    
              {/* Phone */}
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-600 focus:outline-none"
                  placeholder="Enter your phone number"
                />
              </div>
    
              {/* Address */}
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  minLength={20}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-600 focus:outline-none"
                  placeholder="Enter your address"
                ></textarea>
              </div>
    
              {/* City and Postal Code */}
              <div className="flex space-x-4">
                <div className="mb-4 w-1/2">
                  <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-600 focus:outline-none"
                    placeholder="City"
                  />
                </div>
    
                <div className="mb-4 w-1/2">
                  <label htmlFor="postalCode" className="block text-gray-700 font-medium mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-600 focus:outline-none"
                    placeholder="Postal Code"
                  />
                </div>
              </div>
    
              {/* Notes */}
              <div className="mb-4">
                <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-600 focus:outline-none"
                  placeholder="Any additional notes (optional)"
                ></textarea>
              </div>
    
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-orange-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-800 focus:ring-4 focus:ring-orange-400 focus:outline-none"
                >
                  {loader ? <Spinner /> : "Place Order"}
                </button>
                { showPopup && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 transform transition-all duration-300">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2l4 -4m7 2a9 9 0 11-18 0a9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Order Placed!
          </h2>
          <p className="text-gray-600">
            Thank you for your order. We will process it shortly.
          </p>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>}
              </div>
            </form>
          </div>
        </div>
      );
}

export default OrderForm