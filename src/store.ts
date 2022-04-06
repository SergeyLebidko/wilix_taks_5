import {configureStore, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import backend from './backend/backend';
import {TComment, TPost, TPostTag, TTag, TUrls, TUser} from './backend/types';

// Список пользователей
export const loadUserList = createAsyncThunk(
    'user_list',
    async () => {
        return backend.fetch(TUrls.GetUserList);
    }
);

const userListSlice = createSlice({
    name: 'user_list',
    initialState: {
        status: 'pending',
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

// Список постов
export const loadPostList = createAsyncThunk(
    'post_list',
    async () => {
        return backend.fetch(TUrls.GetPostList);
    }
);

const postListSlice = createSlice({
    name: 'post_list',
    initialState: {
        status: 'pending',
        data: [] as TPost[]
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadPostList.pending, state => {
                state.status = 'pending'
            }).addCase(loadPostList.fulfilled, (state, action) => {
            state.status = 'done';
            state.data = action.payload as TPost[];
        });
    }
});

// Список комментариев
export const loadCommentList = createAsyncThunk(
    'comment_list',
    async () => {
        return backend.fetch(TUrls.GetCommentList);
    }
);

const commentListSlice = createSlice({
    name: 'comment_list',
    initialState: {
        status: 'pending',
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

// Список тегов
export const loadTagList = createAsyncThunk(
    'tag_list',
    async () => {
        return backend.fetch(TUrls.GetTagList)
    }
);

const tagListSlice = createSlice({
    name: 'tag_list',
    initialState: {
        status: 'pending',
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

// Список связей тегов и постов
export const loadPostTagList = createAsyncThunk(
    'post_tag_list',
    async () => {
        return backend.fetch(TUrls.GetPostTagList);
    }
);

const postTagListSlice = createSlice({
    name: 'post_tag_list',
    initialState: {
        status: 'pending',
        data: [] as TPostTag[]
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(loadPostTagList.pending, state => {
            state.status = 'pending';
        }).addCase(loadPostTagList.fulfilled, (state, action) => {
            state.status = 'done';
            state.data = action.payload as TPostTag[];
        });
    }
});

const store = configureStore({
    reducer: {
        'user_list': userListSlice.reducer,
        'post_list': postListSlice.reducer,
        'comment_list': commentListSlice.reducer,
        'tag_list': tagListSlice.reducer,
        'post_tag_list': postTagListSlice.reducer
    }
});

export default store;
