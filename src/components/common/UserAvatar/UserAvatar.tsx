import React from 'react';
import {Avatar} from '@mui/material';

import {TUser} from '../../../backend/types';
import getUserInitial from '../../../helpers/utils/getUserInitial';

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
