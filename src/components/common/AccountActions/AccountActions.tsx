import React from 'react';
import {Avatar, Fab, Stack, Typography} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {useSelector} from 'react-redux';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {loggedUserSelector} from '../../../redux/selectors';
import useNavigator from '../../../helpers/hooks/useNavigator';
import {TUser} from '../../../backend/types';

const accountActionsStyle = {
    alignItems: 'center'
}

const headerStyle = {
    color: 'white'
}

const emptyAvatarStyle = {
    color: 'deepskyblue',
    backgroundColor: 'white'
}

const actionButtonStyle = {
    color: 'deepskyblue',
    backgroundColor: 'white'
}

const AccountActions: React.FC = () => {
    const {toLogout, toCreatePost} = useNavigator();
    const {first_name, last_name, avatar} = useSelector(loggedUserSelector) as TUser;

    const userFullName = `${first_name} ${last_name}`;

    const userInitial = `${first_name[0]}${last_name[0]}`;

    return (
        <Stack direction="row" spacing={1} sx={accountActionsStyle}>
            <Typography variant="h6" sx={headerStyle}>
                {userFullName}
            </Typography>
            {avatar ?
                <Avatar src={avatar}/>
                :
                <Avatar sx={emptyAvatarStyle}>{userInitial}</Avatar>
            }
            <Fab size="small" sx={actionButtonStyle} onClick={toCreatePost}>
                <AddCircleOutlineIcon/>
            </Fab>
            <Fab size="small" sx={actionButtonStyle} onClick={toLogout}>
                <LogoutIcon/>
            </Fab>
        </Stack>
    );
}

export default AccountActions;
