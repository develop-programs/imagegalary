import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchProduct = createAsyncThunk("/product", async () => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/images`)
    return result.data
})

export interface Data {
    data: [],
    loading: boolean,
    error: string
}

const initialState: Data = {
    data: [],
    loading: true,
    error: 'Data not Found'
}

const Photos = createSlice({
    name: "Photos",
    initialState,
    reducers: {
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(fetchProduct.pending, (state: any) => {
                state.loading = "true"
                state.error = "none"
            })
            .addCase(fetchProduct.rejected, (state: any, action: any) => {
                state.loading = "false"
                state.error = action.error.message
            })
            .addCase(fetchProduct.fulfilled, (state: any, action: any) => {
                state.loading = "false"
                state.error = "none"
                state.data = action.payload
            })
    }
})

export default Photos.reducer