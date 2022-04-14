import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Button, Stack} from '@mui/material';

import {commentListSelector} from '../../../redux/selectors';
import CommentCard from '../CommentCard/CommentCard';
import {TComment, TPost} from "../../../types";
import {DEFAULT_SHOW_COMMENT_COUNT} from "../../../constants";

type CommentListProps = {
    post: TPost
}

const containerStyle = {
    marginTop: '1.2rem',
    marginLeft: '3rem'
};

const CommentList: React.FC<CommentListProps> = ({post}) => {
    let commentList = useSelector(commentListSelector);
    const [isShowAll, setHasShowAll] = useState(false);

    // Выбираем только комменты, относящиеся к текущему посту и сортируем их по дате
    commentList = commentList
        .filter(comment => comment.post_id === post.id)
        .sort((a: TComment, b: TComment) => a.dt_created - b.dt_created);

    const showSwitchClickHandler = (): void => setHasShowAll(oldValue => !oldValue);

    return (
        <Stack spacing={2} sx={containerStyle}>
            {commentList.length > DEFAULT_SHOW_COMMENT_COUNT &&
                <Button variant="text" onClick={showSwitchClickHandler}>
                    {isShowAll ? 'Показать только последние' : `Показать все (${commentList.length})`}
                </Button>
            }
            {commentList
                .filter((_, index) => {
                    return (
                        commentList.length <= DEFAULT_SHOW_COMMENT_COUNT ||
                        (isShowAll) ||
                        index >= commentList.length - DEFAULT_SHOW_COMMENT_COUNT
                    );
                })
                .map(comment => <CommentCard key={comment.id} comment={comment}/>)
            }
        </Stack>
    );
};

export default CommentList;
