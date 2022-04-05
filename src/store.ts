import {configureStore, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import backend from './backend/backend';
import {TUrls, TUser} from './backend/types';

export const loadUserList = createAsyncThunk(
    'userList/load',
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

export default configureStore({
    reducer: {
        'user_list': userListSlice.reducer
    }
});
