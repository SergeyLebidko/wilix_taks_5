import React from 'react';
import {Card, CardContent, Stack, Typography} from '@mui/material';
import {useSelector} from 'react-redux';

import PostHeader from '../PostHeader/PostHeader';
import CommentList from '../CommentList/CommentList';

import {commentListSelector, loggedUserSelector, postTagListSelector} from "../../../redux/selectors";
import CommentCreator from "../CommentCreator/CommentCreator";
import {TPost} from "../../../types";
import TagList from "../TagList/TagList";

type PostCardProps = {
    post: TPost
}

const PostCard: React.FC<PostCardProps> = ({post}) => {
    const postTagList = useSelector(postTagListSelector);
    const commentList = useSelector(commentListSelector);
    const loggedUser = useSelector(loggedUserSelector);

    return (
        <Card key={post.id} variant="outlined">
            <CardContent>
                <PostHeader post={post}/>
                <Stack spacing={1}>
                    <Typography variant="h6">
                        {post.title}
                    </Typography>
                    <Typography variant="body1">
                        {post.text}
                    </Typography>
                    {postTagList.some(postTag => postTag.post_id === post.id) && <TagList post={post}/>}
                </Stack>
                {commentList.some(comment => comment.post_id === post.id) && <CommentList post={post}/>}
                {loggedUser && <CommentCreator post={post}/>}
            </CardContent>
        </Card>
    );
};

export default PostCard;
