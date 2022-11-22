import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchValue: '',
    categoryId: 0,
    pageCount: 1,
    sort: {
        name: 'rating',
        sortProperty: 'rating' 
    },
}

const filterSlice = createSlice({
    name:'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setPageCount(state, action) {
            state.pageCount = action.payload;
        },
        setFilters(state, action) {
            state.sort = action.payload.sort;
            state.pageCount = Number(action.payload.pageCount);
            state.categoryId = Number(action.payload.categoryId);
        }
    }
})

export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.sort;
export const selectSearch = (state) => state.filter;

export const {setCategoryId, setSearchValue, setSort, setPageCount, setFilters} = filterSlice.actions;

export default filterSlice.reducer;