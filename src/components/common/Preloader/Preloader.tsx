import React from 'react';
import {Box, CircularProgress} from '@mui/material';

const Preloader: React.FC = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        }}>
            <CircularProgress/>
        </Box>
    );
};

export default Preloader;
