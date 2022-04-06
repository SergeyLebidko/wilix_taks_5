import React from 'react';
import {Button, Card, CardActions, CardContent, Typography} from '@mui/material';
import {useSelector} from 'react-redux';

import {postListSelector, userListSelector} from '../../../store';
import {TUser} from "../../../backend/types";

const PostList: React.FC = () => {
    const userList = useSelector(userListSelector);
    const postList = useSelector(postListSelector);

    const getUserName = (id: number): string => {
        const user = userList.find(user => user.id === id) as TUser;
        return `${user.first_name} ${user.last_name}`;
    };

    return (
        <>
            {postList.map(
                post =>
                    <Card key={post.id} variant="outlined">
                        <CardContent>
                            <Typography sx={{fontSize: 12}} color="text.secondary" gutterBottom>
                                {getUserName(post.user_id)}
                            </Typography>
                            <Typography variant="h6" component="div">
                                {post.title}
                            </Typography>
                            <Typography variant="body2">
                                {post.text}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{justifyContent: 'flex-end'}}>
                            <Button>
                                Действие
                            </Button>
                        </CardActions>
                    </Card>
            )}
        </>
    );
};

export default PostList;
