import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';

import { PizzaSliceState, Pizza } from './types';

const initialState: PizzaSliceState = {
   items: [],
   status: 'loading'
};

const pizzaSlice = createSlice({
    name:'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.items = [];
            state.status = 'loading';
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.items = [];
            state.status = 'error';
        });
    }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;