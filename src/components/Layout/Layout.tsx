import React from 'react';
import {Container} from '@mui/material';
import {Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {allListDoneSelector, loggedUserStatusSelector} from '../../store';
import Preloader from '../common/Preloader/Preloader';
import Header from '../common/Header/Header';

const Layout: React.FC = () => {
    const allListDone = useSelector(allListDoneSelector);
    const loggedUserStatus = useSelector(loggedUserStatusSelector);

    const preload = !allListDone || loggedUserStatus === 'pending';

    if (preload) return <Preloader fullscreen/>;

    return (
        <Container maxWidth="md">
            <Header/>
            <Outlet/>
        </Container>
    );
}

export default Layout;
