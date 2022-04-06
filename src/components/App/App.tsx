import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {loadCommentList, loadPostList, loadTagList, loadUserList, loadPostTagList, loggedUserSlice} from '../../store';
import Main from '../pages/Main/Main';

const {setLoggedUser} = loggedUserSlice.actions;

const App: React.FC = () => {
    const dispatch = useDispatch();

    // Выполняем загрузки списков данных - пользователей, постов и т.д...
    useEffect(() => {
        dispatch(loadUserList());
        dispatch(loadPostList());
        dispatch(loadCommentList());
        dispatch(loadTagList());
        dispatch(loadPostTagList());

        dispatch(setLoggedUser('Привет'));
    }, []);

    return (
        <Main/>
    );
}

export default App;
