import React from 'react';
import {Button, Card, CardActions, CardContent} from '@mui/material';
import {useSelector} from 'react-redux';

import {postListSelector} from '../../../store';

const PostList: React.FC = () => {
    const postList = useSelector(postListSelector);

    return (
        <>
            {postList.map(
                post =>
                    <Card key={post.id} variant="outlined">
                        <CardContent>
                            {post.title}
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" size="small" disableElevation>
                                Действие
                            </Button>
                        </CardActions>
                    </Card>
            )}
        </>
    );
};

export default PostList;
