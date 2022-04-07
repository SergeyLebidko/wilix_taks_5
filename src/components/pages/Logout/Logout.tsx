import React from 'react';
import {Button, Container, Typography} from '@mui/material';
import {Stack} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {loggedUserSlice} from '../../../store';

const {setLoggedUser} = loggedUserSlice.actions;

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toMain = (): void => navigate('/');

    const logoutClickHandler = (): void => {
        dispatch(setLoggedUser(null));
    }

    return (
        <Container sx={{display: 'flex', justifyContent: 'center'}}>
            <Stack spacing={2} maxWidth="30em" sx={{width: '25em'}}>
                <Typography variant="h5" gutterBottom component="div" sx={{textAlign: 'center'}}>
                    Вы действительно хотите выйти?
                </Typography>
                <Stack direction="row" spacing={2} sx={{justifyContent: 'center'}}>
                    <Button variant="contained" sx={{minWidth: '7em'}} disableElevation onClick={logoutClickHandler}>
                        Да
                    </Button>
                    <Button variant="contained" sx={{minWidth: '7em'}} disableElevation onClick={toMain}>
                        Нет
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
};

export default Logout;
