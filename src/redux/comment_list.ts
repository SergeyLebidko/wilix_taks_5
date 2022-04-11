import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import backend from '../backend/backend';
import {TComment, TUrls} from '../backend/types';
import {TStatus} from '../types';

export const loadCommentList = createAsyncThunk(
    'comment_list',
    async () => {
        return backend.fetch(TUrls.GetCommentList);
    }
);

export const commentListSlice = createSlice({
    name: 'comment_list',
    initialState: {
        status: 'pending' as TStatus,
        data: [] as TComment[]
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadCommentList.pending, state => {
                state.status = 'pending'
            })
            .addCase(loadCommentList.fulfilled, (state, action) => {
                state.status = 'done';
                state.data = action.payload as TComment[];
            });
    }
});
