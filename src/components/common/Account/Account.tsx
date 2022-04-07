import React from 'react';
import {Avatar, Fab, Stack, Typography} from '@mui/material';
import {Link} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import {useSelector} from 'react-redux';
import {loggedUserSelector} from '../../../store';

const Account: React.FC = () => {
    const loggedUser = useSelector(loggedUserSelector);

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
                                sx={{
                                    color: '#00BFFF',
                                    boxShadow: 'none',
                                    backgroundColor: '#fff',
                                    '&:active': {
                                        boxShadow: 'none'
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
