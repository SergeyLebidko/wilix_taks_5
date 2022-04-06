import React from 'react';
import {Box} from '@mui/material';

const Logo: React.FC = () => {
    return (
        <Box sx={{
            typography: 'body1',
            fontWeight: 'regular',
            color: 'white',
            fontSize: 'h5.fontSize'
        }}>
            Wilix Blog
        </Box>
    );
}

export default Logo;
