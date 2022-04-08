import React from 'react';
import {useSelector} from 'react-redux';

import {postListSelector} from '../../../store';
import PostCard from '../PostCard/PostCard';

const PostList: React.FC = () => {
    const postList = useSelector(postListSelector);

    return (
        <>
            {postList.map(post => <PostCard key={post.id} post={post}/>)}
        </>
    );
};

export default PostList;
