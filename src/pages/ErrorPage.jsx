import React from 'react'
import { useRouteError } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

function ErrorPage() {
    let error = useRouteError();
  return (
    <div>
        <h1>Oops! An error occurred.</h1>
        {error && <p>{error.data}</p>}
        <NavLink to="/">
          <button> Go Home </button>
        </NavLink>
      </div>
  )
}

export default ErrorPage