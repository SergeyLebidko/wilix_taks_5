import {configureStore, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import backend from './backend/backend';
import {TUrls, TUser} from './backend/types';

export const preloaderSlice = createSlice({
    name: 'preloader',
    initialState: false,
    reducers: {
        setPreloader: (state, action) => action.payload
    }
});

export const loadUserList = createAsyncThunk(
    'userList/load',
    async () => {
        return backend.fetch(TUrls.GetUserList);
    }
);

export const userListSlice = createSlice({
    name: 'user_list',
    initialState: [] as TUser[],
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loadUserList.fulfilled, (state, action) => {
            return action.payload.payload;
        });
    }
});

export default configureStore({
    reducer: {
        'preloader': preloaderSlice.reducer,
        'user_list': userListSlice.reducer
    }
});
