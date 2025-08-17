import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
    brands: []
}

export let getBrands = createAsyncThunk(
    "product/getBrands",
    async function() {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        return data;
    }
);

export let productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.brands = action.payload.data;
        });
    }
});

export let productReducer = productSlice.reducer;
