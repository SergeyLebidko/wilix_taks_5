import React from 'react';
import {Avatar, Fab, Stack, Typography} from '@mui/material';
import {Link} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {useSelector} from 'react-redux';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {loggedUserSelector} from '../../../redux/selectors';
import useNavigator from '../../../helpers/hooks/useNavigator';

const Account: React.FC = () => {
    const {toLogout, toCreatePost} = useNavigator();
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
                                color="secondary"
                                aria-label="add"
                                onClick={toCreatePost}
                                sx={{
                                    alignSelf: 'flex-end',
                                    backgroundColor: 'deepskyblue',
                                    transition: 'all 300ms',
                                    boxShadow: 'none',
                                    '&:active': {
                                        boxShadow: 'none'
                                    },
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        backgroundColor: 'dodgerblue'
                                    }
                                }}>
                                <AddCircleOutlineIcon/>
                            </Fab>
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
