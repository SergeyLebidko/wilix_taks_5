import React from 'react';
import {Container} from '@mui/material';
import {useSelector} from 'react-redux';

import {allListDoneSelector, loggedUserStatusSelector} from '../../store';
import Preloader from '../Preloader/Preloader';
import Header from '../Header/Header';

const Layout: React.FC = () => {
    const allListDone = useSelector(allListDoneSelector);
    const loggedUserStatus = useSelector(loggedUserStatusSelector);

    const preload = !allListDone || loggedUserStatus === 'pending';

    if (preload) return <Preloader fullscreen/>;

    return (
        <Container maxWidth="md">
            <Header/>
        </Container>
    );
}

export default Layout;
