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
                            <Link href="#/login" color="#fff">Войти</Link>
                            <span>или</span>
                            <Link href="#/register" color="#fff">зарегистрироваться</Link>
                        </>
                    );
                }
            })()}
        </Stack>
    );
}

export default Account;
