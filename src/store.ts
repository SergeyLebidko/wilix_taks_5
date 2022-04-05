import {configureStore, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import backend from './backend/backend';
import {TUrls, TUser} from './backend/types';

export const loadUserList = createAsyncThunk(
    'user_list',
    async () => {
        return backend.fetch(TUrls.GetUserList);
    }
);

const userListSlice = createSlice({
    name: 'user_list',
    initialState: {
        status: 'done',
        data: [] as TUser[]
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadUserList.pending, state => {
                state.status = 'pending';
            })
            .addCase(loadUserList.fulfilled, (state, action) => {
                state.status = 'done';
                state.data = action.payload as TUser[];
            });
    }
});

const store = configureStore({
    reducer: {
        'user_list': userListSlice.reducer
    }
});

export default store;
