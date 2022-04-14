import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Stack, Typography} from '@mui/material';

import getDateStringForTimestamp from '../../../helpers/utils/getDateStringForTimestamp';
import {loggedUserSelector, userListSelector} from '../../../redux/selectors';
import {removePost} from '../../../redux/post_list';
import AccountAvatar from '../AccountAvatar/AccountAvatar';
import getUserFullName from "../../../helpers/utils/getUserFullName";
import {TPost, TUser} from "../../../types";
import RemoveButton from "../RemoveButton/RemoveButton";

type PostHeaderProps = {
    post: TPost
}

const containerStyle = {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: '0.5em'
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
    const [isRemoveProcess, setHasRemoveProcess] = useState<boolean>(false);

    const user = userList.find(user => user.id === post.user_id) as TUser;

    const removePostHandler = () => {
        setHasRemoveProcess(true);
        dispatch(removePost({id: post.id as number}));
    };

    return (
        <Stack direction="row" spacing={2} sx={containerStyle}>
            <AccountAvatar user={user}/>
            <Stack>
                <Typography sx={usernameStyle} color="text.secondary" gutterBottom>
                    {getUserFullName(user)}
                </Typography>
                <Typography sx={dtStyle} color="text.secondary" gutterBottom>
                    {getDateStringForTimestamp(post.dt_created)}
                </Typography>
            </Stack>
            {(loggedUser !== null && post.user_id === loggedUser.id) &&
                <RemoveButton
                    isRemoveProcess={isRemoveProcess}
                    removeButtonClickHandler={removePostHandler}
                />
            }
        </Stack>
    );
};

export default PostHeader;
