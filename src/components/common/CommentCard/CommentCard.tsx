import React from 'react';
import {Fab, Stack, Typography} from '@mui/material';
import {useSelector} from 'react-redux';

import {loggedUserSelector, userListSelector} from '../../../redux/selectors';
import UserAvatar from '../UserAvatar/UserAvatar';
import getUserFullName from '../../../helpers/utils/getUserFullName';
import getDateStringForTimestamp from '../../../helpers/utils/getDateStringForTimestamp';
import ClearIcon from "@mui/icons-material/Clear";
import {TComment, TUser} from "../../../types";

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
    const loggedUser = useSelector(loggedUserSelector);
    const userList = useSelector(userListSelector);

    const user = userList.find(user => user.id === comment.user_id) as TUser;

    const removeButtonClickHandler = (): void => {
        console.log('Удаление комментария');
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
            {(loggedUser && loggedUser.id === user.id) &&
                <Fab
                    size="small"
                    onClick={removeButtonClickHandler}
                    sx={removeButtonStyle}>
                    <ClearIcon/>
                </Fab>
            }
        </Stack>
    );
}

export default CommentCard;
