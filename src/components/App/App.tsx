import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {loadUserList} from '../../store';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUserList());
    }, []);

    return (
        <div>
            Wilix Blog
        </div>
    );
}

export default App;
