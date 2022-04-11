import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';

import {TBackendResponse, TLoginOpt, TRegisterOpt, TUrls, TUser} from '../backend/types';
import backend from '../backend/backend';
import {LOGGED_USER_NAME} from '../settings';
import {TStatus} from './store';

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
