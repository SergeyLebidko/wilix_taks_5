import React from 'react';
import {Box, CircularProgress} from '@mui/material';

import './Preloader.scss';

const Preloader: React.FC = () => {
    return (
        <Box className="preloader">
            <CircularProgress/>
        </Box>
    );
};

export default Preloader;
