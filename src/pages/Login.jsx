import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import userAuth from '../appWrite/userAuth';
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { login } from '../store/loginReducer';
import { useDispatch } from 'react-redux';
function Login() {
  let queryClient = useQueryClient()
  let dispatch = useDispatch();
  const [linkSentMessage, setLinkSentMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("")
  const navigate = useNavigate();
  const mutation = useMutation( {

    mutationFn: async (formData) => {
      
      const data = Object.fromEntries(formData.entries());
      let {email,password } = data;
     
      try { 
         let userLogin = await userAuth.login(email,password);
          console.log("User Logged in Successfully!");
         if(userLogin) {
          let currentUser = await userAuth.getCurrentuser();

          if(!currentUser.emailVerification){
            await userAuth.sendVerification("http://localhost:5173/verification");
            setLinkSentMessage("Verification link sent to your email");

         }
         setLoginSuccess("Login successfully");
         setTimeout(() => {
          navigate("/")

        }, 3000);

         
          }

        
      } catch (error) {
        setErrorMessage(error.message);
      }
      
    },
     onSuccess: () => {
    return   queryClient.invalidateQueries(["currentUser"]);
      
     }
    
  }
);

  
      const handleSubmit = async(formData)=> {
        
        mutation.mutate(formData);
        
      }
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 py-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome Back</h2>
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => setErrorMessage("")}
            >
              <title>Close</title>
              <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
            </svg>
          </span>
        </div>
      )}
        
        {linkSentMessage ||  loginSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{linkSentMessage || loginSuccess}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-green-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                onClick={() => {
                  setLinkSentMessage("");
                   setLoginSuccess("");
                }}
              >
                <title>Close</title>
                <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z" />
              </svg>
            </span>
          </div>
        )}
        <form action={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name='email'
              required
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name='password'
              min={8}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-gray-700 text-sm">
              <input type="checkbox" className="mr-2 focus:ring-orange-500" />
              Remember Me
            </label>
            <Link to="#" className="text-sm text-orange-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-orange-500 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
