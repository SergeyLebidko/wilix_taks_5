import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Box, Pagination, PaginationItem} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import PostCard from '../PostCard/PostCard';
import {TPost, TSortDirection, TSortType, TUser} from '../../../types';
import {PAGINATION_PAGE_SIZE} from '../../../constants';
import {postListSelector, userListSelector} from '../../../redux/selectors';

type PostListProps = {
    sortType: TSortType,
    sortDirection: TSortDirection,
    keyWord: string
}

const PostList: React.FC<PostListProps> = ({sortType, sortDirection, keyWord}) => {
    const userList = useSelector(userListSelector);
    const [page, setPage] = useState<number>(1);

    let postListToShow = Array.from(useSelector(postListSelector));

    const getUserForId = (id: number): TUser => {
        return userList.find(user => user.id === id) as TUser;
    }

    const pageChangeHandler = (event: React.ChangeEvent<unknown>, nextPage: number): void => {
        setPage(nextPage);
    }

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

    // Если изменяется количество элементов в массиве для отображения - сбрасываем пагинацию на первую страницу
    useEffect(() => {
        setPage(1);
    }, [postListToShow.length]);

    let startIndex = 0;
    let endIndex = postListToShow.length - 1;

    // Если нужно, то к отсортированным и отфильтрованным данным применяем пагинацию
    const hasPagination = postListToShow.length > PAGINATION_PAGE_SIZE;
    if (hasPagination) {
        startIndex = (page - 1) * PAGINATION_PAGE_SIZE;
        endIndex = startIndex + (PAGINATION_PAGE_SIZE - 1);
    }

    return (
        <>
            {postListToShow
                .filter((_, index) => index >= startIndex && index <= endIndex)
                .map(post => <PostCard key={post.id} post={post}/>)
            }
            {hasPagination &&
                <Box sx={{display: 'flex', alignSelf: 'stretch', justifyContent: 'center'}}>
                    <Pagination
                        count={Math.ceil(postListToShow.length / PAGINATION_PAGE_SIZE)}
                        page={page}
                        onChange={pageChangeHandler}
                        renderItem={(item) => (
                            <PaginationItem
                                components={{previous: ArrowBackIcon, next: ArrowForwardIcon}}
                                {...item}
                            />
                        )}
                    />
                </Box>
            }
        </>
    );
};

export default PostList;
