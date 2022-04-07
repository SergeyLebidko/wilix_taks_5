import React from 'react';
import {Container, Stack} from '@mui/material';
import {Outlet} from 'react-router-dom';

import Header from '../common/Header/Header';

const Layout: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Stack spacing={2}>
                <Header/>
                <Outlet/>
            </Stack>
        </Container>
    );
}

export default Layout;
