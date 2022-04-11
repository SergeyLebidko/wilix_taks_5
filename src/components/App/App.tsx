import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Routes, Route, Navigate} from 'react-router-dom';

import Layout from '../Layout/Layout';
import Main from '../pages/Main/Main';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import CreatePost from '../pages/CreatePost/CreatePost';
import Logout from '../pages/Logout/Logout';
import NoMatch from '../pages/NoMatch/NoMatch';
import {LOGGED_USER_NAME} from '../../constants';
import {TUser} from '../../backend/types';
import {Box, CircularProgress} from "@mui/material";
import {loadUserList} from "../../redux/users";
import {loadPostList} from "../../redux/post_list";
import {loadCommentList} from "../../redux/comment_list";
import {loadTagList} from "../../redux/tag_list";
import {loadPostTagList} from "../../redux/posttag_list";
import {loggedUserSlice} from "../../redux/logged_user";
import {allListDoneSelector, loggedUserSelector, loggedUserStatusSelector} from "../../redux/selectors";
import Preloader from "../common/Preloader/Preloader";

const {setLoggedUser} = loggedUserSlice.actions;

const App: React.FC = () => {
    const dispatch = useDispatch();
    const [hasAllDataLoad, setHasAllDataLoad] = useState<boolean>(false);

    const loggedUser = useSelector(loggedUserSelector);
    const loggedUserStatus = useSelector(loggedUserStatusSelector);

    const allListDone = useSelector(allListDoneSelector);

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

    useEffect(() => {
        setHasAllDataLoad(oldValue => oldValue || (allListDone && loggedUserStatus === 'done'));
    }, [allListDone, loggedUserStatus]);

    // Пока не загружены все необходимые данные - показываем пользователю прелоадер
    if (!hasAllDataLoad) return <Preloader/>;

    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Main/>}/>
                <Route path='register' element={loggedUser ? <Navigate to='/'/> : <Register/>}/>
                <Route path='login' element={loggedUser ? <Navigate to='/'/> : <Login/>}/>
                <Route path='logout' element={loggedUser ? <Logout/> : <Navigate to='/'/>}/>
                <Route path='create_post' element={loggedUser ? <CreatePost/> : <Navigate to='/login'/>}/>
                <Route path="*" element={<NoMatch/>}/>
            </Route>
        </Routes>
    );
}

export default App;
