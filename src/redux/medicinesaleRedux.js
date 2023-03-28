import { createSlice } from "@reduxjs/toolkit";

const medicinesaleSlice = createSlice({
    name: "medicinesale",
    initialState: {
      carts : [],
      total : 0,
      grandTotal : 0,
    },
    reducers: {
        addCart: (state, action) => {
           state.carts.push(action.payload);
           state.total += action.payload.amount;
           state.grandTotal += action.payload.amount;
        },
        removeCart: (state, action) => {
          state.total -= action.payload.amount;
          state.grandTotal -= action.payload.amount;
          state.carts = state.carts.filter((el)=>el.id != action.payload.id);
        },
        changeQty:(state,action) => {
          state.total = 0;
          state.grandTotal = 0;
          var cart = state.carts.find((el)=>el.id == action.payload.id);
          cart.qty = action.payload.qty;
          cart.amount = action.payload.qty*action.payload.unit_price;
          state.carts.map((cart,i)=>{
            state.total += cart.amount;
            state.grandTotal += cart.amount;
          })
        },
        resetCart:(state)=>{
          state.carts.length = 0;
          state.total = 0;
          state.grandTotal = 0;
        }
    }
})

export const{addCart,removeCart,changeQty,resetCart} = medicinesaleSlice.actions
export default medicinesaleSlice.reducer;