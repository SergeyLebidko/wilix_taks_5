import React, {useState} from 'react';
import {Stack, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';

import {loggedUserSelector, userListSelector} from '../../../redux/selectors';
import AccountAvatar from '../AccountAvatar/AccountAvatar';
import getUserFullName from '../../../helpers/utils/getUserFullName';
import getDateStringForTimestamp from '../../../helpers/utils/getDateStringForTimestamp';
import {TComment, TUser} from '../../../types';
import {removeComment} from '../../../redux/comment_list';
import RemoveButton from '../RemoveButton/RemoveButton';

type CommentCardProps = {
    comment: TComment
}

const containerStyle = {
    backgroundColor: 'whitesmoke',
    padding: '6px',
    borderRadius: 1
};

const CommentCard: React.FC<CommentCardProps> = ({comment}) => {
    const dispatch = useDispatch();
    const [isRemoveProcess, setHasRemoveProcess] = useState(false);

    const loggedUser = useSelector(loggedUserSelector);
    const userList = useSelector(userListSelector);

    const user = userList.find(user => user.id === comment.user_id) as TUser;

    const removeButtonClickHandler = (): void => {
        setHasRemoveProcess(true);
        dispatch(removeComment({
            id: comment.id as number
        }));
    }

    return (
        <Stack direction="row" spacing={2} sx={containerStyle}>
            <AccountAvatar user={user}/>
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
            {(loggedUser && loggedUser.id === user.id) &&
                <RemoveButton
                    isRemoveProcess={isRemoveProcess}
                    removeButtonClickHandler={removeButtonClickHandler}
                />
            }
        </Stack>
    );
}

export default CommentCard;
