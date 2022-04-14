import React from 'react';
import {Fab, Stack, Typography} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {useSelector} from 'react-redux';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {loggedUserSelector} from '../../../redux/selectors';
import useNavigator from '../../../helpers/hooks/useNavigator';
import getUserFullName from '../../../helpers/utils/getUserFullName';
import AccountAvatar from '../AccountAvatar/AccountAvatar';
import {TUser} from '../../../types';

const accountActionsStyle = {
    alignItems: 'center'
}

const usernameStyle = {
    color: 'white',
    userSelect: 'none'
}

const actionButtonStyle = {
    color: 'deepskyblue',
    backgroundColor: 'white',
    boxShadow: 'none',
    fontSize: '10px',
    transition: 'all 150ms',
    '&:hover': {
        backgroundColor: 'white',
        transform: 'translateY(-3px)'
    },
    '&:active': {
        boxShadow: 'none',
        transform: 'translateY(0)'
    }
}

const AccountActions: React.FC = () => {
    const {toLogout, toCreatePost} = useNavigator();
    const user = useSelector(loggedUserSelector) as TUser;

    return (
        <Stack direction="row" spacing={1} sx={accountActionsStyle}>
            <Typography variant="subtitle1" sx={usernameStyle}>
                {getUserFullName(user)}
            </Typography>
            <AccountAvatar user={user} isHeader/>
            <Fab
                size="small"
                variant="extended"
                sx={actionButtonStyle}
                onClick={toCreatePost
            }>
                <AddCircleOutlineIcon sx={{marginRight: '4px'}}/>
                    Новый пост
            </Fab>
            <Fab size="small" variant="extended" sx={actionButtonStyle} onClick={toLogout}>
                <LogoutIcon sx={{marginRight: '4px'}}/>
                Выход
            </Fab>
        </Stack>
    );
}

export default AccountActions;
