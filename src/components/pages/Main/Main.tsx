import React, {useState} from 'react';
import {Stack} from '@mui/material';

import PostList from '../../common/PostList/PostList';
import PostFilters from '../../common/PostFilters/PostFilters';
import {TSortDirection, TSortType} from '../../../types';

const Main: React.FC = () => {
    const [sortType, setSortType] = useState<TSortType>(TSortType.ByDate);
    const [sortDirection, setSortDirection] = useState<TSortDirection>(TSortDirection.ToDown);
    const [keyWord, setKeyWord] = useState<string>('');

    const resetParams = (): void => {
        setSortType(TSortType.ByDate);
        setSortDirection(TSortDirection.ToDown);
        setKeyWord('');
    }

    return (
        <Stack spacing={2}>
            <PostFilters
                sortType={sortType}
                setSortType={setSortType}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                keyWord={keyWord}
                setKeyWord={setKeyWord}
                resetParams={resetParams}
            />
            <PostList sortType={sortType} sortDirection={sortDirection} keyWord={keyWord}/>
        </Stack>
    );
};

export default Main;
