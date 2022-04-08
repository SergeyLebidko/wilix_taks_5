import React from 'react';
import {Fab, Stack} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useSelector} from 'react-redux';

import PostList from '../../common/PostList/PostList';
import {loggedUserSelector} from '../../../store';

const Main: React.FC = () => {
    const loggedUser = useSelector(loggedUserSelector);

    return (
        <Stack spacing={2}>
            {loggedUser &&
                <Fab
                    size="small"
                    color="secondary"
                    aria-label="add"
                    sx={{
                        alignSelf: 'flex-end',
                        backgroundColor: 'deepskyblue',
                        transition: 'all 300ms',
                        boxShadow: 'none',
                        '&:active': {
                            boxShadow: 'none'
                        },
                        '&:hover': {
                            transform: 'scale(1.1)',
                            backgroundColor: 'dodgerblue'
                        }
                    }}>
                    <AddCircleOutlineIcon/>
                </Fab>
            }
            <PostList/>
        </Stack>
    );
};

export default Main;
