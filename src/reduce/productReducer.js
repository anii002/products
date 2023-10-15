import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = { data: { loading: false, product: [], error: '', productDescription: {} } };

export const productData = createAsyncThunk('product/productData', () => {
    return axios
        .get('https://fakestoreapi.com/products')
        .then((res) => res.data)
        .catch((err) => console.log(err));
});

export const productSlice = createSlice({
    name: 'productApi',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.data.product = [...state.data.product, action.payload]
        },
        setProductDescription: (state = initialState, action) => {
            let data = JSON.parse(JSON.stringify(state.data.product))
            let filterObject = data.find((item) => item.id === Number(action.payload))
            state.data.productDescription = { ...filterObject }
        },
        deleteProduct: (state, action) => {
            let data = JSON.parse(JSON.stringify(state.data.product))
            let filterObject = data.filter((item) => item.id !== Number(action.payload))
            state.data.product = [...filterObject]
        },
        sortPrice: (state, action) => {
            if (action.payload === "Low to High") {
                state.data.product = state.data.product.sort((a, b) => a.price - b.price);
            } else {
                state.data.product = state.data.product.sort((a, b) => b.price - a.price);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(productData.pending, (state) => {
            state.data.loading = true;
        });
        builder.addCase(productData.fulfilled, (state, action) => {
            state.data = { loading: false, product: action.payload, error: '' };
        });
        builder.addCase(productData.rejected, (state, action) => {
            state.data = { loading: false, product: [], error: action.error.message };
        });
    },
});

export const { setProductDescription, addProduct, deleteProduct, sortPrice } = productSlice.actions