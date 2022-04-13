import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import backend from '../backend/backend';
import {TPost, TStatus, TTag, TUrls} from '../types';
import {removePost} from './post_list';

export const loadTagList = createAsyncThunk(
    'tag_list',
    async () => {
        return backend.fetch(TUrls.GetTagList)
    }
);

export const createTagList = createAsyncThunk(
    'create_tag_list',
    async (tagData: TTag[]) => {
        return backend.fetch(TUrls.CreateTagList, tagData);
    }
)

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
            })
            .addCase(removePost.fulfilled, (state, action) => {
                // При удалении поста - удаляем связанные с ним теги
                state.data = state.data.filter(tag => tag.post_id !== (action.payload as TPost).id);
            })
            .addCase(createTagList.pending, state => {
                state.status = 'pending';
            })
            .addCase(createTagList.fulfilled, (state, action) => {
                state.status = 'done';
                state.data.push(...(action.payload as TTag[]));
            });
    }
});
