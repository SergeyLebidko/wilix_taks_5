import React, {useState} from 'react';
import {Box, CircularProgress, Fab, Stack, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';

import {loggedUserSelector, userListSelector} from '../../../redux/selectors';
import UserAvatar from '../UserAvatar/UserAvatar';
import getUserFullName from '../../../helpers/utils/getUserFullName';
import getDateStringForTimestamp from '../../../helpers/utils/getDateStringForTimestamp';
import {TComment, TUser} from '../../../types';
import {removeComment} from "../../../redux/comment_list";

type CommentCardProps = {
    comment: TComment
}

const containerStyle = {
    backgroundColor: 'whitesmoke',
    padding: '6px',
    borderRadius: 1
};

const removeButtonStyle = {
    marginLeft: 'auto!important'
};

const CommentCard: React.FC<CommentCardProps> = ({comment}) => {
    const dispatch = useDispatch();
    const [hasRemoveProcess, setHasRemoveProcess] = useState(false);

    const loggedUser = useSelector(loggedUserSelector);
    const userList = useSelector(userListSelector);

    const user = userList.find(user => user.id === comment.user_id) as TUser;

    const removeButtonClickHandler = (): void => {
        setHasRemoveProcess(true);
        dispatch(removeComment({
            id: comment.id as number
        }));
    }

    let control = null;
    if (loggedUser && loggedUser.id === user.id) {
        if (hasRemoveProcess) {
            control = (
                <Box sx={removeButtonStyle}>
                    <CircularProgress/>
                </Box>
            );
        } else {
            control = (
                <Fab
                    size="small"
                    onClick={removeButtonClickHandler}
                    sx={removeButtonStyle}>
                    <ClearIcon/>
                </Fab>
            );
        }
    }

    return (
        <Stack direction="row" spacing={2} sx={containerStyle}>
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
            {control}
        </Stack>
    );
}

export default CommentCard;
