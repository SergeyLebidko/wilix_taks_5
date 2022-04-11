import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import backend from '../backend/backend';
import {TPostTag, TUrls} from '../backend/types';
import {TStatus} from '../types';

export const loadPostTagList = createAsyncThunk(
    'post_tag_list',
    async () => {
        return backend.fetch(TUrls.GetPostTagList);
    }
);

export const postTagListSlice = createSlice({
    name: 'post_tag_list',
    initialState: {
        status: 'pending' as TStatus,
        data: [] as TPostTag[]
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadPostTagList.pending, state => {
                state.status = 'pending';
            })
            .addCase(loadPostTagList.fulfilled, (state, action) => {
                state.status = 'done';
                state.data = action.payload as TPostTag[];
            });
    }
});
