import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterSliceState, SortPropertyEnum, Sort } from './types';

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    pageCount: 1,
    sort: {
        name: 'rating',
        sortProperty: SortPropertyEnum.RATING_DESC 
    }
};

const filterSlice = createSlice({
    name:'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.sort = action.payload.sort;
            state.pageCount = Number(action.payload.pageCount);
            state.categoryId = Number(action.payload.categoryId);
        }
    }
})

export const {setCategoryId, setSearchValue, setSort, setPageCount, setFilters} = filterSlice.actions;

export default filterSlice.reducer;