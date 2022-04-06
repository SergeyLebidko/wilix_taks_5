import React from 'react';
import {Box, CircularProgress} from '@mui/material';

type PreloaderProps = {
    fullscreen: boolean
}

const Preloader: React.FC<PreloaderProps> = ({fullscreen = false}) => {
    return (
        <Box sx={[
            {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            },
            fullscreen ? {
                position: 'fixed',
                zIndex: '10000',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
            } : {
                width: '100%',
                height: '100%'
            }
        ]}>
            <CircularProgress/>
        </Box>
    );
}

export default Preloader;
