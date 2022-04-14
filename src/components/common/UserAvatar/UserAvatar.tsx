import React from 'react';
import {Avatar} from '@mui/material';

import getUserInitial from '../../../helpers/utils/getUserInitial';
import {TUser} from "../../../types";

type UserAvatarProps = {
    user: TUser,
    hasHeader?: boolean
}

const emptyAvatarStyle = {
    backgroundColor: 'white',
    color: 'dodgerblue'
}

const UserAvatar: React.FC<UserAvatarProps> = ({user, hasHeader = false}) => {
    if (user.avatar) {
        return <Avatar src={user.avatar}/>;
    } else {
        return <Avatar sx={hasHeader ? emptyAvatarStyle : {}}>{getUserInitial(user)}</Avatar>;
    }
};

export default UserAvatar;
