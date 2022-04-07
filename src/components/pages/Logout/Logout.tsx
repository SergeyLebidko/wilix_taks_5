import React from 'react';
import {Container, Typography} from '@mui/material';
import {Stack} from '@mui/material';

const Logout: React.FC = () => {
    return (
        <Container sx={{display: 'flex', justifyContent: 'center'}}>
            <Stack spacing={2} maxWidth="30em" sx={{width: '25em'}}>
                <Typography variant="h5" gutterBottom component="div" sx={{textAlign: 'center'}}>
                    Вы действительно хотите выйти?
                </Typography>
            </Stack>
        </Container>
    );
};

export default Logout;
