import React, { useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userAuth from '../appWrite/userAuth';
import { useQuery } from "@tanstack/react-query"
function SignUp() {

  let navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { data: allUsers, refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => await userAuth.getAllUsers(),
  });

  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());
    let { Name, Email, Password, ConfirmPassword } = data;


    if (Password !== ConfirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      let userSignup = await userAuth.signUp(Email, Password, Name);
      if (userSignup) setLoginMessage("click login to continue");
      console.log("User Created Successfully!");
      setShowPopup(true);
    } catch (error) {
      setError(error.message);
      console.error("Error creating account:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 py-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Create Your Account</h2>
        <form onSubmit={(e) => {

          handleSubmit(e);
        }}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name='Name'
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
              Email Address
            </label>
            <input type='email'
              id="email"
              name='Email'
              placeholder="Enter your email address"
              required
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name='Password'
              required
              min={8}
              placeholder="Create a password"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name='ConfirmPassword'
              required
              placeholder="Confirm your password"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
          <button
            type="submit"
            className="w-full bg-orange-700 text-white py-2 px-4 rounded-lg hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        {showPopup && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <p className="text-2xl font-bold text-gray-800">Account Created!</p>
              <p className="text-gray-600 mt-2">Click below to log in</p>
              <button
                onClick={() => navigate('/login')}
                className="bg-orange-700 text-white py-2 px-4 rounded-lg hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 mt-4"
              >
                Log In
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 font-medium hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
