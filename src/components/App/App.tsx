import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Routes, Route} from 'react-router-dom';

import Layout from '../Layout/Layout';
import Main from '../pages/Main/Main';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import CreatePost from '../pages/CreatePost/CreatePost';
import {LOGGED_USER_NAME} from '../../settings';
import {TUser} from '../../backend/types';
import {
    loadCommentList,
    loadPostList,
    loadTagList,
    loadUserList,
    loadPostTagList,
    loggedUserSlice
} from '../../store';

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
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Main/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="create_post" element={<CreatePost/>}/>
            </Route>
        </Routes>

    );
}

export default App;
