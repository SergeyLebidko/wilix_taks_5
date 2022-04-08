import React, {useState} from 'react';
import {Stack} from '@mui/material';

import PostList from '../../common/PostList/PostList';
import PostFilters from '../../common/PostFilters/PostFilters';
import {TSortDirection, TSortType} from '../../../types';

const Main: React.FC = () => {
    const [sortType, setSortType] = useState<TSortType>(TSortType.ByDate);
    const [sortDirection, setSortDirection] = useState<TSortDirection>(TSortDirection.ToDown);

    return (
        <Stack spacing={2}>
            <PostFilters
                sortType={sortType}
                setSortType={setSortType}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
            />
            <PostList sortType={sortType} sortDirection={sortDirection}/>
        </Stack>
    );
};

export default Main;
