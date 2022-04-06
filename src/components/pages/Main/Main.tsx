import React from 'react';
import {Stack} from '@mui/material';

import PostList from '../../common/PostList/PostList';

const Main: React.FC = () => {
    return (
        <Stack spacing={2}>
            <PostList/>
        </Stack>
    );
};

export default Main;
