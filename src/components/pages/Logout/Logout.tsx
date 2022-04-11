import React from 'react';
import {Button, Container, Typography} from '@mui/material';
import {Stack} from '@mui/material';
import {useDispatch} from 'react-redux';

import {loggedUserSlice} from '../../../redux/logged_user';
import useNavigator from '../../../helpers/hooks/useNavigator';

const {setLoggedUser} = loggedUserSlice.actions;

const Logout: React.FC = () => {
    const {toMain} = useNavigator();
    const dispatch = useDispatch();

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
