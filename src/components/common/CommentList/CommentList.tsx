import React from 'react';
import {useSelector} from 'react-redux';
import {Stack} from '@mui/material';

import {commentListSelector} from '../../../redux/selectors';
import CommentCard from '../CommentCard/CommentCard';
import {TComment, TPost} from "../../../types";

type CommentListProps = {
    post: TPost
}

const containerStyle = {
    marginTop: '1.2rem',
    marginLeft: '3rem'
};

const CommentList: React.FC<CommentListProps> = ({post}) => {
    let commentList = Array.from(useSelector(commentListSelector));

    // Отсекаем комменты, не принадлежащие текущему посту и выполняем сортировку по дате
    commentList = commentList
        .filter(comment => comment.post_id === post.id)
        .sort((a: TComment, b: TComment) => b.dt_created - a.dt_created);

    if (!commentList.length) return null;

    return (
        <Stack spacing={2} sx={containerStyle}>
            {commentList.map(comment => <CommentCard key={comment.id} comment={comment}/>)}
        </Stack>
    );
};

export default CommentList;
