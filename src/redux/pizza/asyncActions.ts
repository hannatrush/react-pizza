import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams> (
    'pizza/fetchPizzasStatus', async (params) => {
    const { order, sortBy, category, search, pageCount} = params;
    const { data } = await axios.get<Pizza[]>(
        `https://6304d33c761a3bce77f07e90.mockapi.io/items?page=${pageCount}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search} `
        );
    return data;
});