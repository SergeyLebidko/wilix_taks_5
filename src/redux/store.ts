import {configureStore} from '@reduxjs/toolkit';
import {userListSlice} from './users';
import {postListSlice} from './post_list';
import {commentListSlice} from './comment_list';
import {tagListSlice} from './tag_list';
import {postTagListSlice} from './posttag_list';
import {loggedUserSlice} from './logged_user';

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

export default store;
