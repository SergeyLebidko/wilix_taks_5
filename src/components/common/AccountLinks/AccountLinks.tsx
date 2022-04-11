import React from 'react';
import {Link} from '@mui/material';

import './AccountLinks.scss';

const AccountLinks: React.FC = () => {
    return (
        <>
            <Link sx={{typography: 'body1'}} className="account_links" href="#/login">
                Вход
            </Link>
            <Link sx={{typography: 'body1'}} className="account_links" href="#/register">
                Регистрация
            </Link>
        </>
    );
};

export default AccountLinks;
