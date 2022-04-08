import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Box, Card, CardContent, CircularProgress, Fab, Stack, Typography} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import {TPost, TUser} from '../../../backend/types';
import {loggedUserSelector, removePost, userListSelector} from '../../../store';
import {getDateStringForTimestamp} from '../../../utils';

type PostCardProps = {
    post: TPost
}

const PostCard: React.FC<PostCardProps> = ({post}) => {
    const dispatch = useDispatch();
    const userList = useSelector(userListSelector);
    const loggedUser = useSelector(loggedUserSelector);
    const [hasRemoveProcess, setHasRemoveProcess] = useState<boolean>(false);

    console.log('В карточке', loggedUser);

    const user = userList.find(user => user.id === post.user_id) as TUser;

    const removePostHandler = () => {
        setHasRemoveProcess(true);
        dispatch(removePost({id: post.id as number}));
    };

    return (
        <Card key={post.id} variant="outlined">
            <CardContent>
                <Stack direction="row" spacing={2}
                       sx={{justifyContent: 'flex-start', alignItems: 'center', marginBottom: '1.5em'}}>
                    {user.avatar ?
                        <Avatar
                            alt="Avatar"
                            src={user.avatar}
                        />
                        :
                        <Avatar>
                            {user.first_name[0]}{user.last_name[0]}
                        </Avatar>
                    }
                    <Stack>
                        <Typography sx={{fontSize: 16, m: 0}} color="text.secondary" gutterBottom>
                            {`${user.first_name} ${user.last_name}`}
                        </Typography>
                        <Typography sx={{fontSize: 12, m: 0}} color="text.secondary" gutterBottom>
                            {getDateStringForTimestamp(post.dt_created)}
                        </Typography>
                    </Stack>
                    {(function () {
                        if ((loggedUser !== null && post.user_id === loggedUser.id)) {
                            if (hasRemoveProcess) {
                                return (
                                    <Box sx={{display: 'flex', marginLeft: 'auto!important'}}>
                                        <CircularProgress/>
                                    </Box>
                                );
                            } else {
                                return (
                                    <Fab
                                        size="small"
                                        color="secondary"
                                        aria-label="add"
                                        onClick={removePostHandler}
                                        sx={{
                                            backgroundColor: 'coral',
                                            borderColor: 'black',
                                            color: 'white',
                                            boxShadow: 'none',
                                            transition: 'all 300ms',
                                            marginLeft: 'auto!important',
                                            '&:active': {
                                                boxShadow: 'none'
                                            },
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                                backgroundColor: 'red'
                                            }
                                        }}>
                                        <ClearIcon/>
                                    </Fab>
                                );
                            }
                        }
                    })()}
                </Stack>
                <Typography variant="h6" component="div">
                    {post.title}
                </Typography>
                <Typography variant="body2">
                    {post.text}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PostCard;
