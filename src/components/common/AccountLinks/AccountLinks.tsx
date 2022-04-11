import React from 'react';
import {Link, Stack} from '@mui/material';

const AccountLinks: React.FC = () => {
    const linkStyle = {
        typography: 'body1',
        color: '#fff',
        textDecoration: 'none',
        alignSelf: 'center'
    };

    return (
        <Stack direction="row" spacing={1}>
            <Link sx={linkStyle} href="#/login">Вход</Link>
            <Link sx={linkStyle} href="#/register">Регистрация</Link>
        </Stack>
    );
};

export default AccountLinks;
