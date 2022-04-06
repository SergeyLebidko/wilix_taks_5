import React from 'react';
import {Box} from '@mui/material';

import Logo from '../Logo/Logo';
import Account from '../Account/Account';

const Header: React.FC = () => {
    return (
        <Box sx={{
            backgroundColor: 'deepskyblue',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem'
        }}>
            <Logo/>
            <Account/>
        </Box>
    )
}

export default Header;
