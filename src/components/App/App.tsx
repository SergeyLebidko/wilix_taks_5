import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {loadCommentList, loadPostList, loadTagList, loadUserList, loadPostTagList} from '../../store';

import Main from '../pages/Main/Main';

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUserList());
        dispatch(loadPostList());
        dispatch(loadCommentList());
        dispatch(loadTagList());
        dispatch(loadPostTagList());
    }, []);

    return (
        <Main/>
    );
}

export default App;
