import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.jsx'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import ProductCard from './components/ProductCard.jsx'
import CartCheckout from './pages/CartCheckout.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import OrderForm from './pages/OrderForm.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Verification from './pages/Verification.jsx'
import Profile from './pages/Profile.jsx'
import UpdateEmail from './pages/UpdateEmail.jsx'
import UpdateName from './pages/UpdateName.jsx'
import MyOrders from './pages/MyOrders.jsx'


let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}
      errorElement={<ErrorPage />} >
      <Route path='/' element={<Home />}  ></Route>
      <Route path='contact' element={<Contact />}></Route>
      <Route path='about' element={<About />}></Route>
      <Route path='products' element={<Products />}></Route>
      <Route path='products/details/:id' element={<ProductDetail />}></Route>
      <Route path='checkout' element={<CartCheckout />}></Route>
      <Route path='order-form' element={<OrderForm />}></Route>
      <Route path='login' element={<Login/>}></Route>
      <Route path='signup' element={<SignUp/>}></Route>
      <Route path='verification' element={<Verification/>}></Route>
      <Route path='profile' element={<Profile/>}></Route>
      <Route path='update-email' element={<UpdateEmail />}></Route>
      <Route path='update-name' element={<UpdateName />}></Route>
      <Route path='my-orders' element={<MyOrders />}></Route>
        

    </Route>
  )
)

let client = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <QueryClientProvider client={client}>

      <Provider store={store}>
        <RouterProvider router={router}>
          <App />

        </RouterProvider>
      </Provider>
    </QueryClientProvider>


  </StrictMode>,
)
