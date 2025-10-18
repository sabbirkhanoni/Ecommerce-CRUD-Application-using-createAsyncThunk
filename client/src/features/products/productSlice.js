import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../utils/Axios";
import summaryAPI, { baseURL } from "../../common/summaryAPI";
import axios from "axios";

const initialState = {
    products: [],
    isLoading: false,
    error : null
}


export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (product) => {
        const response = await axios.post(baseURL + '/products', product);
        return response.data;
    }
)

export const fetchAllProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async () => {
        const response = await axios.get(baseURL + '/products');
        console.log(response.data);
        return response.data;
    }
)

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({id, product}) => {
        const response = await axios.put(baseURL + '/products/' + id , product);
        return response.data;
    }
)


export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id) => {
        const response = await axios.delete(baseURL + '/products/' + id);
        console.log(response.data);
        return id;
    }
)

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((products) => products.id !== action.payload)
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(updateProduct.fulfilled,(state, action) => {
                const index = state.products.findIndex((product) => 
                    product.id === action.payload.id
                );
                state.products[index] = action.payload;
            })
    }
})

export const {} = productSlice.actions;

export default productSlice.reducer;
