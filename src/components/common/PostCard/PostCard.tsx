import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';

import {TPost} from '../../../backend/types';
import PostHeader from '../PostHeader/PostHeader';
import CommentList from '../CommentList/CommentList';

type PostCardProps = {
    post: TPost
}

const PostCard: React.FC<PostCardProps> = ({post}) => {
    return (
        <Card key={post.id} variant="outlined">
            <CardContent>
                <PostHeader post={post}/>
                <Typography variant="h6">
                    {post.title}
                </Typography>
                <Typography variant="body1">
                    {post.text}
                </Typography>
                <CommentList post={post}/>
            </CardContent>
        </Card>
    );
};

export default PostCard;
