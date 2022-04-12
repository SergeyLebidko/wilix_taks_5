import React from 'react';
import {Stack, Typography} from '@mui/material';
import {useSelector} from 'react-redux';

import {TComment, TUser} from '../../../backend/types';
import {userListSelector} from '../../../redux/selectors';
import UserAvatar from "../UserAvatar/UserAvatar";
import getUserFullName from "../../../helpers/utils/getUserFullName";
import getDateStringForTimestamp from "../../../helpers/utils/getDateStringForTimestamp";

type CommentCardProps = {
    comment: TComment
}

const CommentCard: React.FC<CommentCardProps> = ({comment}) => {
    const userList = useSelector((userListSelector));

    const user = userList.find(user => user.id === comment.user_id) as TUser;

    return (
        <Stack direction="row" spacing={2}>
            <UserAvatar user={user}/>
            <Stack>
                <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                    <Typography variant="caption">
                        {getUserFullName((user))}
                    </Typography>
                    <Typography variant="caption">
                        {getDateStringForTimestamp(comment.dt_created)}
                    </Typography>
                </Stack>
                <Typography variant="body1">
                    {comment.text}
                </Typography>
            </Stack>
        </Stack>
    );
}

export default CommentCard;
