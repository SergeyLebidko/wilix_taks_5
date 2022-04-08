import React from 'react';
import {useSelector} from 'react-redux';

import {postListSelector, userListSelector} from '../../../store';
import PostCard from '../PostCard/PostCard';
import {TPost, TUser} from '../../../backend/types';
import {TSortDirection, TSortType} from '../../../types';

type PostListProps = {
    sortType: TSortType,
    sortDirection: TSortDirection,
    keyWord: string
}

const PostList: React.FC<PostListProps> = ({sortType, sortDirection, keyWord}) => {
    const userList = useSelector(userListSelector);

    const getUserForId = (id: number): TUser => {
        return userList.find(user => user.id === id) as TUser;
    }

    let postListToShow = Array.from(useSelector(postListSelector));

    // Применяем параметры сортировки
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

    // Применяем фильтр по ключевым словам
    if (keyWord !== '') {
        const _keyWord = keyWord.toLocaleLowerCase();
        postListToShow = postListToShow.filter(post => {
            const user = getUserForId(post.user_id);
            return (
                user.first_name.toLocaleLowerCase().includes(_keyWord) ||
                user.last_name.toLocaleLowerCase().includes(_keyWord) ||
                post.title.toLocaleLowerCase().includes(_keyWord) ||
                post.text.toLocaleLowerCase().includes(_keyWord)
            );
        });
    }

    return (
        <>
            {postListToShow.map(post => <PostCard key={post.id} post={post}/>)}
        </>
    );
};

export default PostList;
