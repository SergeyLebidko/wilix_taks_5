import React, {useState} from 'react';
import {
    Container,
    Stack,
    Typography,
    TextField,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    Alert,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';

import {loggedUserErrorSelector, loggedUserStatusSelector, loginUser} from '../../../store';
import {useDispatch, useSelector} from 'react-redux';
import {useLoggedUserErrorControl} from '../../../hooks';

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const loggedUserError = useSelector(loggedUserErrorSelector);
    const loggedUserStatus = useSelector(loggedUserStatusSelector);
    const hasUserDataPending = loggedUserStatus === 'pending';
    const hasUserDataError = loggedUserStatus === 'error';

    // Управляем отображением ошибки
    useLoggedUserErrorControl(hasUserDataError);

    const handleClickShowPassword = (): void => setShowPassword(!showPassword);

    const loginFieldChangeHandler = (event: React.ChangeEvent): void => {
        const nextLogin = (event.target as HTMLInputElement).value;
        setLogin(nextLogin);
    }

    const passwordFieldChangeHandler = (event: React.ChangeEvent): void => {
        const nextPassword = (event.target as HTMLInputElement).value;
        setPassword(nextPassword);
    }

    const loginButtonClickHandler = (): void => {
        dispatch(loginUser({login, password}));
    }

    return (
        <Container sx={{display: 'flex', justifyContent: 'center'}}>
            <Stack spacing={2} maxWidth="30em" sx={{width: '25em'}}>
                <Typography variant="h5" gutterBottom component="div" sx={{textAlign: 'center'}}>
                    Введите учетные данные
                </Typography>
                <TextField
                    id="login_field"
                    label="Логин"
                    variant="outlined"
                    value={login}
                    onChange={loginFieldChangeHandler}
                    disabled={hasUserDataPending}
                />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="password_field">Пароль</InputLabel>
                    <OutlinedInput
                        id="password_field"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={passwordFieldChangeHandler}
                        disabled={hasUserDataPending}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Пароль"
                    />
                </FormControl>
                {loggedUserError && <Alert severity="error">{loggedUserError}</Alert>}
                <LoadingButton
                    variant="contained"
                    disableElevation
                    loading={hasUserDataPending}
                    loadingPosition="center"
                    startIcon={<LoginIcon/>}
                    disabled={!(login && password)}
                    onClick={loginButtonClickHandler}
                >
                    Войти
                </LoadingButton>
            </Stack>
        </Container>
    );
}

export default Login;
