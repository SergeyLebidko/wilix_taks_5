import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import Layout from '../Layout/Layout';
import {loadCommentList, loadPostList, loadTagList, loadUserList, loadPostTagList, loggedUserSlice} from '../../store';
import {LOGGED_USER_NAME} from '../../settings';
import {TUser} from '../../backend/types';

const {setLoggedUser} = loggedUserSlice.actions;

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Выполняем загрузки списков данных - пользователей, постов и т.д...
        dispatch(loadUserList());
        dispatch(loadPostList());
        dispatch(loadCommentList());
        dispatch(loadTagList());
        dispatch(loadPostTagList());

        // Проверяем наличие в local storage записи о залогиненом пользователе и, если нужно, записываем данные в redux
        const loggedUserRaw = localStorage.getItem(LOGGED_USER_NAME);
        if (loggedUserRaw) {
            const loggedUser = JSON.parse(loggedUserRaw) as TUser;
            dispatch(setLoggedUser(loggedUser));
        } else {
            dispatch(setLoggedUser(null));
        }
    }, [dispatch]);

    return (
        <Layout/>
    );
}

export default App;
