import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {TPost, TQueryOpt, TUrls} from '../backend/types';
import backend from '../backend/backend';
import {TStatus} from '../types';

export const loadPostList = createAsyncThunk(
    'post_list',
    async () => {
        return backend.fetch(TUrls.GetPostList);
    }
);

export const createPost = createAsyncThunk(
    'create_post',
    async (postData: TPost) => {
        return backend.fetch(TUrls.CreatePost, postData);
    }
);

export const removePost = createAsyncThunk(
    'remove_post',
    async (options: TQueryOpt) => {
        return backend.fetch(TUrls.RemovePost, options);
    }
);

export const postListSlice = createSlice({
    name: 'post_list',
    initialState: {
        status: 'pending' as TStatus,
        data: [] as TPost[]
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadPostList.pending, state => {
                state.status = 'pending'
            })
            .addCase(loadPostList.fulfilled, (state, action) => {
                state.status = 'done';
                state.data = action.payload as TPost[];
            })
            .addCase(createPost.pending, state => {
                state.status = 'pending';
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.status = 'done';
                state.data.push(action.payload as TPost);
            })
            .addCase(removePost.pending, state => {
                state.status = 'pending';
            })
            .addCase(removePost.fulfilled, (state, action) => {
                state.status = 'done';
                state.data = (state.data as any[]).filter(post => (post as TPost).id !== (action.payload as TPost).id);
            });
    }
});
