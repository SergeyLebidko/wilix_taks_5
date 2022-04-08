import React from 'react';
import {useSelector} from 'react-redux';

import {postListSelector, userListSelector} from '../../../store';
import PostCard from '../PostCard/PostCard';
import {TPost, TUser} from '../../../backend/types';
import {TSortDirection, TSortType} from '../../../types';

type PostListProps = {
    sortType: TSortType,
    sortDirection: TSortDirection
}

const PostList: React.FC<PostListProps> = ({sortType, sortDirection}) => {
    const userList = useSelector(userListSelector);

    const getUserForId = (id: number): TUser => {
        return userList.find(user => user.id === id) as TUser;
    }

    const postListToShow = Array.from(useSelector(postListSelector));

    postListToShow.sort((a: TPost, b: TPost) => {
        let result = 0;
        switch (sortType) {
            case TSortType.ByDate: {
                result = a.dt_created - b.dt_created;
                break;
            }
            case TSortType.ByUser: {
                const userA = getUserForId(a.user_id);
                const userB = getUserForId(b.user_id);
                const userAFullName = `${userA.first_name} ${userA.last_name}`;
                const userBFullName = `${userB.first_name} ${userB.last_name}`;
                if (userAFullName > userBFullName) {
                    result = 1;
                } else if (userAFullName < userBFullName) {
                    result = -1;
                }
                break;
            }
            case TSortType.ByTitle: {
                if (a.title > b.title) {
                    result = 1;
                } else if (a.title < b.title) {
                    result = -1;
                }
            }
        }
        return (sortDirection === TSortDirection.ToDown) ? (-1) * result : result;
    });

    return (
        <>
            {postListToShow.map(post => <PostCard key={post.id} post={post}/>)}
        </>
    );
};

export default PostList;
