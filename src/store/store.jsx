import {configureStore} from "@reduxjs/toolkit"
import reducer from "../feautures/productSlice"
import loginReducer from "./loginReducer"
let store = configureStore({
    reducer: {
     productDetails: reducer,
     loginInfo: loginReducer
    }
})
export default store