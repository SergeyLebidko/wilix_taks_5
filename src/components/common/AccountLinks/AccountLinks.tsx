import React from 'react';
import {Link} from '@mui/material';

const AccountLinks: React.FC = () => {
    return (
        <>
            <Link sx={{typography: 'body1'}} href="#/login" color="#fff">
                Вход
            </Link>
            <Link sx={{typography: 'body1'}} href="#/register" color="#fff">
                Регистрация
            </Link>
        </>
    );
};

export default AccountLinks;
