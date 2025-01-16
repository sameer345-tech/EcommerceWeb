import React from 'react'
import { useRouteError } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

function ErrorPage() {
    let error = useRouteError();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! An error occurred.</h1>
        {error && <p className="text-lg text-gray-800 mb-6">{error.data}</p>}
        <NavLink to="/">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">Go Home</button>
        </NavLink>
    </div>
  )
}

export default ErrorPage