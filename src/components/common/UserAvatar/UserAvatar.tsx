import React from 'react';
import {Avatar} from '@mui/material';

import getUserInitial from '../../../helpers/utils/getUserInitial';
import {TUser} from "../../../types";

type UserAvatarProps = {
    user: TUser
}

const UserAvatar: React.FC<UserAvatarProps> = ({user}) => {
    if (user.avatar) {
        return <Avatar src={user.avatar}/>;
    } else {
        return <Avatar>{getUserInitial(user)}</Avatar>;
    }
};

export default UserAvatar;
