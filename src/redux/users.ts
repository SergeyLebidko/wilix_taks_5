import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import backend from '../backend/backend';
import {TUrls, TUser} from '../backend/types';
import {registerUser} from './logged_user';
import {TStatus} from '../types';

export const loadUserList = createAsyncThunk(
    'user_list',
    async () => {
        return backend.fetch(TUrls.GetUserList);
    }
);

export const userListSlice = createSlice({
    name: 'user_list',
    initialState: {
        status: 'pending' as TStatus,
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
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                // При регистрации нового пользователя обновлеяем список пользователей и в хранилище
                state.data.push(action.payload as TUser);
            });
    }
});
