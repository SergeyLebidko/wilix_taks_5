import React from 'react';

import {TComment} from '../../../backend/types';

type CommentCardProps = {
    comment: TComment
}

const CommentCard: React.FC<CommentCardProps> = ({comment}) => {
    return (
        <div>
            {comment.text}
        </div>
    );
}

export default CommentCard;
