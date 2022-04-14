import React from 'react';
import {Avatar} from '@mui/material';

import getUserInitial from '../../../helpers/utils/getUserInitial';
import {TUser} from "../../../types";

type UserAvatarProps = {
    user: TUser,
    isHeader?: boolean
}

const emptyAvatarStyle = {
    backgroundColor: 'white',
    color: 'dodgerblue'
}

const AccountAvatar: React.FC<UserAvatarProps> = ({user, isHeader = false}) => {
    if (user.avatar) {
        return <Avatar src={user.avatar}/>;
    } else {
        return <Avatar sx={isHeader ? emptyAvatarStyle : {}}>{getUserInitial(user)}</Avatar>;
    }
};

export default AccountAvatar;
