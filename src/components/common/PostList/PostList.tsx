import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import {postListSelector, userListSelector} from '../../../store';
import PostCard from '../PostCard/PostCard';
import {TPost, TUser} from '../../../backend/types';

// Тип сортировки постов - по дате, по пользователю, по заголовку
type TSortType = 'date' | 'user' | 'title';

// Направление сортировки - от меньшего к большему и от большего к меньшему
type TSortDirection = 'to_up' | 'to_down';

const PostList: React.FC = () => {
    const userList = useSelector(userListSelector);
    const [sortType, setSortType] = useState<TSortType>('date');
    const [sortDirection, setSortDirection] = useState<TSortDirection>('to_down');

    const getUserForId = (id: number): TUser => {
        return userList.find(user => user.id === id) as TUser;
    }

    const postListToShow = Array.from(useSelector(postListSelector));

    postListToShow.sort((a: TPost, b: TPost) => {
        let result = 0;
        switch (sortType) {
            case 'date': {
                result = a.dt_created - b.dt_created;
                break;
            }
            case 'user': {
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
            case 'title': {
                if (a.title > b.title) {
                    result = 1;
                } else if (a.title < b.title) {
                    result = -1;
                }
            }
        }
        return (sortDirection === 'to_down') ? (-1) * result : result;
    });

    return (
        <>
            {postListToShow.map(post => <PostCard key={post.id} post={post}/>)}
        </>
    );
};

export default PostList;
