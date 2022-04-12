import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, CircularProgress, Fab, Stack, Typography} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import {TPost, TUser} from '../../../backend/types';
import getDateStringForTimestamp from '../../../helpers/utils/getDateStringForTimestamp';
import {loggedUserSelector, userListSelector} from '../../../redux/selectors';
import {removePost} from '../../../redux/post_list';
import UserAvatar from '../UserAvatar/UserAvatar';
import getUserFullName from "../../../helpers/utils/getUserFullName";

type PostHeaderProps = {
    post: TPost
}

const containerStyle = {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '0.5em'
};

const removeProgressStyle = {
    display: 'flex',
    marginLeft: 'auto!important'
};

const removeButtonStyle = {
    marginLeft: 'auto!important'
};

const usernameStyle = {
    fontSize: 16,
    m: 0
};

const dtStyle = {
    fontSize: 12,
    m: 0
};

const PostHeader: React.FC<PostHeaderProps> = ({post}) => {
    const dispatch = useDispatch();
    const userList = useSelector(userListSelector);

    const loggedUser = useSelector(loggedUserSelector);
    const [hasRemoveProcess, setHasRemoveProcess] = useState<boolean>(false);

    const user = userList.find(user => user.id === post.user_id) as TUser;

    const removePostHandler = () => {
        setHasRemoveProcess(true);
        dispatch(removePost({id: post.id as number}));
    };

    let control = null;
    if ((loggedUser !== null && post.user_id === loggedUser.id)) {
        if (hasRemoveProcess) {
            control = <Box sx={removeProgressStyle}><CircularProgress/></Box>;
        } else {
            control = <Fab size="small" onClick={removePostHandler} sx={removeButtonStyle}><ClearIcon/></Fab>;
        }
    }

    return (
        <Stack direction="row" spacing={2} sx={containerStyle}>
            <UserAvatar user={user}/>
            <Stack>
                <Typography sx={usernameStyle} color="text.secondary" gutterBottom>
                    {getUserFullName(user)}
                </Typography>
                <Typography sx={dtStyle} color="text.secondary" gutterBottom>
                    {getDateStringForTimestamp(post.dt_created)}
                </Typography>
            </Stack>
            {control}
        </Stack>
    );
};

export default PostHeader;
