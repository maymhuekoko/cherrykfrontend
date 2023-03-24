import { createSlice } from "@reduxjs/toolkit";

const medicinesaleSlice = createSlice({
    name: "medicinesale",
    initialState: {
      carts : [],
    },
    reducers: {
        addCart: (state, action) => {
           state.carts.push(action.payload);
        },
        removeCart: (state, action) => {
          state.carts = state.carts.filter((el)=>el.id != action.payload.id);
        }
    }
})

export const{addCart,removeCart} = medicinesaleSlice.actions
export default medicinesaleSlice.reducer;