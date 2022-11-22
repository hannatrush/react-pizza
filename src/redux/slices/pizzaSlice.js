import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

 export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const { order, sortBy, category, search, pageCount} = params;
    const { data } = await axios.get(
        `https://6304d33c761a3bce77f07e90.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search} `
    );
    return data;
})

const initialState = {
   items: [],
   status: 'loading'
}

const pizzaSlice = createSlice({
    name:'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.items = [];
            state.status = 'loading';
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.items = [];
            state.status = 'error';
        },
    }
})

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;