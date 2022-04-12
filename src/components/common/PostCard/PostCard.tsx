import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';
import {useSelector} from 'react-redux';

import {TPost} from '../../../backend/types';
import PostHeader from '../PostHeader/PostHeader';
import CommentList from '../CommentList/CommentList';

import {loggedUserSelector} from "../../../redux/selectors";
import CommentCreator from "../CommentCreator";

type PostCardProps = {
    post: TPost
}

const PostCard: React.FC<PostCardProps> = ({post}) => {
    const loggedUser = useSelector(loggedUserSelector);

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
                {loggedUser && <CommentCreator/>}
            </CardContent>
        </Card>
    );
};

export default PostCard;
