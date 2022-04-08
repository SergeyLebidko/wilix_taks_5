import React from 'react';
import {Avatar, Fab, Stack, Typography} from '@mui/material';
import {Link} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {loggedUserSelector} from '../../../store';

const Account: React.FC = () => {
    const navigate = useNavigate();
    const loggedUser = useSelector(loggedUserSelector);

    const toLogout = (): void => navigate('logout');

    const userFullName = `${loggedUser?.first_name} ${loggedUser?.last_name}`;
    return (
        <Stack direction="row" spacing={1} sx={{color: 'white', alignItems: 'center'}}>
            {(function () {
                if (loggedUser) {
                    return (
                        <>
                            <Typography variant="h6" gutterBottom component="div" sx={{m: 0}}>
                                {userFullName}
                            </Typography>
                            {loggedUser.avatar ?
                                <Avatar
                                    alt={userFullName}
                                    src={loggedUser.avatar}
                                /> :
                                <Avatar sx={{bgcolor: '#fff', color: '#00BFFF'}}>
                                    {loggedUser.first_name[0]}{loggedUser.last_name[0]}
                                </Avatar>
                            }
                            <Fab
                                size="small"
                                onClick={toLogout}
                                sx={{
                                    color: '#00BFFF',
                                    boxShadow: 'none',
                                    backgroundColor: '#fff',
                                    transition: 'all 300ms',
                                    '&:active': {
                                        boxShadow: 'none'
                                    },
                                    '&:hover': {
                                        transform: 'scale(1.1)'
                                    }
                                }}>
                                <LogoutIcon/>
                            </Fab>
                        </>
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
