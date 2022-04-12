import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import backend from '../backend/backend';
import {TComment, TQueryOpt, TStatus, TUrls} from '../types';

export const loadCommentList = createAsyncThunk(
    'comment_list',
    async () => {
        return backend.fetch(TUrls.GetCommentList);
    }
);

export const createComment = createAsyncThunk(
    'create_comment',
    async (commentData: TComment) => {
        return backend.fetch(TUrls.CreateComment, commentData);
    }
);

export const removeComment = createAsyncThunk(
    'remove_comment',
    async (options: TQueryOpt) => {
        return backend.fetch(TUrls.RemoveComment, options);
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
            })
            .addCase(createComment.pending, state => {
                state.status = 'pending'
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.status = 'done';
                state.data.push(action.payload as TComment);
            })
            .addCase(removeComment.pending, state => {
                state.status = 'pending';
            })
            .addCase(removeComment.fulfilled, (state, action) => {
                state.status = 'done';
                state.data = (state.data as any[]).filter(comment => (comment as TComment).id !== (action.payload as TComment).id);
            });
    }
});
