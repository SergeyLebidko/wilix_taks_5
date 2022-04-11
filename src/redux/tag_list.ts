import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import backend from '../backend/backend';
import {TTag, TUrls} from '../backend/types';
import {TStatus} from '../types';

export const loadTagList = createAsyncThunk(
    'tag_list',
    async () => {
        return backend.fetch(TUrls.GetTagList)
    }
);

export const tagListSlice = createSlice({
    name: 'tag_list',
    initialState: {
        status: 'pending' as TStatus,
        data: [] as TTag[]
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadTagList.pending, state => {
                state.status = 'pending';
            })
            .addCase(loadTagList.fulfilled, (state, action) => {
                state.status = 'done';
                state.data = action.payload as TTag[];
            });
    }
});
