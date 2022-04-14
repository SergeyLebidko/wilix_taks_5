import React, {useState} from 'react';
import {Container, Stack, Typography, TextField, Alert} from '@mui/material';

import {useDispatch} from 'react-redux';
import {loginUser} from '../../../redux/logged_user';
import useLoggedUserErrorControl from '../../../helpers/hooks/useLoggedUserErrorControl';
import PasswordField from '../../common/PasswordField/PasswordField';
import PreloaderButton from '../../common/PreloaderButton/PreloaderButton';

type TFormFieldNames = 'login' | 'password';

type TLoginFormData = {
    login: string,
    password: string
}

const containerStyle = {
    display: 'flex',
    justifyContent: 'center'
}

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<TLoginFormData>({
        login: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // Управляем отображением ошибки входа
    const [isUserDataPending, loggedUserError] = useLoggedUserErrorControl();

    const handleClickShowPassword = (): void => setShowPassword(!showPassword);

    const fieldChangeHandler = (fieldName: TFormFieldNames) => {
        return (event: React.ChangeEvent): void => {
            const nextValue = (event.target as HTMLInputElement).value;
            switch (fieldName) {
                case 'login': {
                    setFormData(oldData => ({
                        ...oldData,
                        login: nextValue
                    }));
                    break;
                }
                case 'password': {
                    setFormData(oldData => ({
                        ...oldData,
                        password: nextValue
                    }));
                    break;
                }
            }
        }
    }

    const loginButtonClickHandler = (): void => {
        dispatch(loginUser(formData));
    }

    return (
        <Container sx={containerStyle}>
            <Stack spacing={2} sx={{width: '25em'}}>
                <Typography variant="h5" gutterBottom component="div" sx={{textAlign: 'center'}}>
                    Введите учетные данные
                </Typography>
                <TextField
                    id="login_field"
                    label="Логин"
                    variant="outlined"
                    value={formData.login}
                    onChange={fieldChangeHandler('login')}
                    disabled={isUserDataPending}
                />
                <PasswordField
                    isShow={showPassword}
                    isDisabled={isUserDataPending}
                    value={formData.password}
                    showSwitcherHandler={handleClickShowPassword}
                    changeHandler={fieldChangeHandler('password')}
                />
                {loggedUserError && <Alert severity="error">{loggedUserError}</Alert>}
                <PreloaderButton
                    isLoading={isUserDataPending}
                    isDisabled={!(formData.login && formData.password)}
                    clickHandler={loginButtonClickHandler}
                    label="Войти"
                />
            </Stack>
        </Container>
    );
}

export default Login;
