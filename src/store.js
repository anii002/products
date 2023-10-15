import { configureStore } from '@reduxjs/toolkit';
import { productSlice } from "./reduce/productReducer"

export const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        // productevent: productEventSlice.reducer
    },
});