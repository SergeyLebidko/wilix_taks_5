import React from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './components/App/App';

import store from './redux/store';
import './backend/backend';
import './style/index.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>
);
