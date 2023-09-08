import { createSlice } from "@reduxjs/toolkit";

const Items = localStorage.getItem("favorites");

interface Types {
    Data: []
}
const initialState: Types = {
    Data: Items ? JSON.parse(Items) : [],
}

const Favorite = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        AddItem: (state: any, action: any) => {
            const items = state.Data.findIndex((item: any) => item.id === action.payload.id)
            if (items >= 0) {
                state.Data[items]
            }
            else {
                const newItem = { ...action.payload, Tag: "favorite" }
                state.Data.push(newItem)
            }
            localStorage.setItem("favorites", JSON.stringify(state.Data))
        },
        RemoveItem: (state: any, action) => {
            const items = state.Data.filter((items: any) => items.id !== action.payload.id)
            state.Data = items
            localStorage.setItem("favorites", JSON.stringify(state.Data))
        },
    }
})


export const { AddItem, RemoveItem } = Favorite.actions
export default Favorite.reducer