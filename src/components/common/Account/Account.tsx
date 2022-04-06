import React from 'react';
import {Stack} from '@mui/material';

import {useSelector} from 'react-redux';
import {loggedUserSelector} from '../../../store';
import {Link} from '@mui/material';

const Account: React.FC = () => {
    const loggedUser = useSelector(loggedUserSelector);

    return (
        <Stack direction="row" spacing={1} sx={{color: 'white'}}>
            {(function () {
                if (loggedUser) {
                    return (
                        <div>
                            Пользователь залогинен!
                        </div>
                    );
                } else {
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
                }
            })()}
        </Stack>
    );
}

export default Account;
