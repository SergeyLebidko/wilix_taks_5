import {configureStore, createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';

import {
    TBackendResponse,
    TComment,
    TLoginOpt,
    TPost,
    TPostTag,
    TRegisterOpt,
    TTag,
    TUrls,
    TUser
} from './backend/types';
import backend from './backend/backend';
import {LOGGED_USER_NAME} from './settings';

type TStatus = 'pending' | 'done' | 'error';

// Список пользователей
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

export const createPost = createAsyncThunk(
    'create_post',
    async (postData: TPost) => {
        return backend.fetch(TUrls.CreatePost, postData);
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

// Список тегов
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

// Список связей тегов и постов
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

// Залогинившийся пользователь
export const registerUser = createAsyncThunk(
    'register_user',
    async (userData: TRegisterOpt) => {
        return backend.fetch(TUrls.Register, userData);
    }
);

export const loginUser = createAsyncThunk(
    'login_user',
    async (loginData: TLoginOpt) => {
        return backend.fetch(TUrls.Login, loginData);
    }
);

type TLoggedUserInitialState = {
    status: TStatus,
    error: string | null,
    data: TUser | null
}

type TLoggedUserAction = {
    payload: TBackendResponse | unknown,
    error?: SerializedError
}

export const loggedUserSlice = createSlice({
    name: 'logged_user',
    initialState: {
        status: 'pending',
        error: null,
        data: null
    } as TLoggedUserInitialState,
    reducers: {
        setLoggedUser: (state, action) => {
            state.status = 'done';
            state.error = null;
            state.data = action.payload;
            if (action.payload === null) {
                localStorage.removeItem(LOGGED_USER_NAME);
            } else {
                localStorage.setItem(LOGGED_USER_NAME, JSON.stringify(action.payload));
            }
        },
        resetLoggedUserError: state => {
            state.status = 'done';
            state.error = null;
        }
    },
    extraReducers: builder => {
        const pendingCallback = (state: TLoggedUserInitialState) => {
            state.status = 'pending';
            state.error = null;
            state.data = null;
            localStorage.removeItem(LOGGED_USER_NAME);
        };
        const fulfilledCallback = (state: TLoggedUserInitialState, action: TLoggedUserAction) => {
            state.status = 'done';
            state.error = null;
            state.data = action.payload as TUser;
            localStorage.setItem(LOGGED_USER_NAME, JSON.stringify(action.payload));
        };
        const rejectCallback = (state: TLoggedUserInitialState, action: TLoggedUserAction) => {
            state.status = 'error';
            state.error = (action.error as Error).message;
            state.data = null;
            localStorage.removeItem(LOGGED_USER_NAME);
        };

        builder
            .addCase(registerUser.pending, pendingCallback)
            .addCase(registerUser.fulfilled, fulfilledCallback)
            .addCase(registerUser.rejected, rejectCallback)
            .addCase(loginUser.pending, pendingCallback)
            .addCase(loginUser.fulfilled, fulfilledCallback)
            .addCase(loginUser.rejected, rejectCallback);
    }
});

// Создание хранилища
const store = configureStore({
    reducer: {
        'user_list': userListSlice.reducer,
        'post_list': postListSlice.reducer,
        'comment_list': commentListSlice.reducer,
        'tag_list': tagListSlice.reducer,
        'post_tag_list': postTagListSlice.reducer,
        'logged_user': loggedUserSlice.reducer
    }
});

export type TRootState = ReturnType<typeof store.getState>;

// Селекторы
// Селектор, возвращающий признак полной загрузки всех списков данных
export const allListDoneSelector = (state: TRootState): boolean => {
    const {
        user_list: {status: us},
        post_list: {status: ps},
        comment_list: {status: cs},
        tag_list: {status: ts},
        post_tag_list: {status: pts}
    } = state;
    return us === 'done' && ps === 'done' && ts === 'done' && cs === 'done' && pts === 'done';
}

// Селекторы залогиненного пользователя
export const loggedUserStatusSelector = (state: TRootState): TStatus => state.logged_user.status;
export const loggedUserErrorSelector = (state: TRootState): string | null => state.logged_user.error;
export const loggedUserSelector = (state: TRootState): TUser | null => state.logged_user.data;

// Селектор списка пользователей
export const userListSelector = (state: TRootState): TUser[] => state.user_list.data;

// Селекторы списка постов
export const postListSelector = (state: TRootState): TPost[] => state.post_list.data;
export const postListStatusSelector = (state: TRootState): TStatus => state.post_list.status;

export default store;
