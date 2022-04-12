import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';
import {useSelector} from 'react-redux';

import PostHeader from '../PostHeader/PostHeader';
import CommentList from '../CommentList/CommentList';

import {commentListSelector, loggedUserSelector} from "../../../redux/selectors";
import CommentCreator from "../CommentCreator/CommentCreator";
import {TPost} from "../../../types";

type PostCardProps = {
    post: TPost
}

const PostCard: React.FC<PostCardProps> = ({post}) => {
    const commentList = useSelector(commentListSelector);
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
                {commentList.some(comment => comment.post_id === post.id) && <CommentList post={post}/>}
                {loggedUser && <CommentCreator post={post}/>}
            </CardContent>
        </Card>
    );
};

export default PostCard;
