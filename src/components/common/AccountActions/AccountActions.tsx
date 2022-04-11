import React from 'react';
import {Fab, Stack, Typography} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {useSelector} from 'react-redux';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {loggedUserSelector} from '../../../redux/selectors';
import useNavigator from '../../../helpers/hooks/useNavigator';
import {TUser} from '../../../backend/types';
import getUserFullName from '../../../helpers/utils/getUserFullName';
import UserAvatar from '../UserAvatar/UserAvatar';

const accountActionsStyle = {
    alignItems: 'center'
}

const headerStyle = {
    color: 'white'
}

const actionButtonStyle = {
    color: 'deepskyblue',
    backgroundColor: 'white'
}

const AccountActions: React.FC = () => {
    const {toLogout, toCreatePost} = useNavigator();
    const user = useSelector(loggedUserSelector) as TUser;

    return (
        <Stack direction="row" spacing={1} sx={accountActionsStyle}>
            <Typography variant="h6" sx={headerStyle}>
                {getUserFullName(user)}
            </Typography>
            <UserAvatar user={user}/>
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
