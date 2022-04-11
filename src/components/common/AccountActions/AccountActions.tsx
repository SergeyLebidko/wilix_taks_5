import React from 'react';
import {Avatar, Fab, Typography} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import {useSelector} from 'react-redux';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {loggedUserSelector} from '../../../redux/selectors';
import useNavigator from '../../../helpers/hooks/useNavigator';
import {TUser} from '../../../backend/types';
import './AccountActions.scss';

const AccountActions: React.FC = () => {
    const {toLogout, toCreatePost} = useNavigator();
    const {first_name, last_name, avatar} = useSelector(loggedUserSelector) as TUser;

    const userFullName = `${first_name} ${last_name}`;

    const userInitial = `${first_name[0]}${last_name[0]}`;

    return (
        <>
            <Typography className="account_actions__user_full_name" variant="h6">
                {userFullName}
            </Typography>
            {avatar ?
                <Avatar src={avatar}/>
                :
                <Avatar className="account_actions__empty_avatar">{userInitial}</Avatar>
            }
            <Fab size="small" className="account_actions__action_btn" onClick={toCreatePost}>
                <AddCircleOutlineIcon/>
            </Fab>
            <Fab size="small" className="account_actions__action_btn" onClick={toLogout}>
                <LogoutIcon/>
            </Fab>
        </>
    );
}

export default AccountActions;
