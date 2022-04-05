import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {loadUserList, preloaderSlice} from "../../store";

const {setPreloader} = preloaderSlice.actions;

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPreloader(true));
        dispatch(loadUserList());
    }, []);

    return (
        <div>
            Wilix Blog
            <button onClick={() => dispatch(setPreloader(false))}>
                Кнопка
            </button>
        </div>
    );
}

export default App;
