import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    databaseCartItems: [],
    addToCartStatus: false,
    userOrders: [],
    
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
         
        fetchCardItems: (state, action)=> {
          state.databaseCartItems = action.payload;

        },
        

        toggleCartStatus: (state, action)=> {
          state.addToCartStatus = action.payload;
        },
       getUserOrders: (state, action)=> {
        state.userOrders = action.payload;
       }
    }
})

export const {fetchCardItems,  toggleCartStatus, getUserOrders}  = productSlice.actions

export default productSlice.reducer;