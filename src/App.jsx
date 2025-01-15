
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import dataBaseService from './appWrite/dataBaseService'
import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchCardItems } from './feautures/productSlice'
import { useQuery } from '@tanstack/react-query'
import userAuth from './appWrite/UserAuth'
import { login } from './store/loginReducer'

function App() {

  

  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default App
