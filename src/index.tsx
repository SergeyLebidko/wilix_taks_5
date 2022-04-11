import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/App/App';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import './backend/backend';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>
);
