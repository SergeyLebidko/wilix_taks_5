import React, {useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Container,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import LoadingButton from '@mui/lab/LoadingButton';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {useDispatch} from 'react-redux';

import {registerUser} from '../../../store';
import {PASSWORD_MIN_LEN} from '../../../settings';
import {createPassword} from '../../../utils';
import {useLoggedUserErrorControl} from '../../../hooks';

type TFormFieldNames = 'login' | 'password1' | 'password2' | 'firstName' | 'lastName' | 'avatar';

type TRegisterFormData = {
    login: string,
    password1: string,
    password2: string,
    firstName: string,
    lastName: string,
    avatar: string | null
}

const Register: React.FC = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<TRegisterFormData>({
        login: '',
        password1: '',
        password2: '',
        firstName: '',
        lastName: '',
        avatar: null
    });
    const [passwordError, setPasswordError] = useState<string | null>(null);

    // Управляем отображением ошибки
    const [hasUserDataPending, loggedUserError] = useLoggedUserErrorControl();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        const {password1, password2} = formData;
        if (password1 !== password2) {
            setPasswordError('Пароль и подтверждение не совпадают');
        } else if (password1.length < PASSWORD_MIN_LEN && password1.length > 0) {
            setPasswordError(`Минимальная длина пароля ${PASSWORD_MIN_LEN} символов`);
        } else {
            setPasswordError(null);
        }
    }, [formData.password1, formData.password2]);

    const handleClickShowPassword = (): void => setShowPassword(!showPassword);

    const changeFieldHandler = (fieldName: TFormFieldNames) => {
        return (event: React.ChangeEvent): void => {
            let nextValue: string;
            switch (fieldName) {
                case 'login':
                case 'password1':
                case 'password2':
                case 'firstName':
                case 'lastName': {
                    nextValue = (event.target as HTMLInputElement).value;
                }
            }
            setFormData(oldState => ({
                ...oldState,
                [fieldName]: nextValue
            }));
        }
    }

    const createPasswordButtonClickHandler = (): void => {
        const password = createPassword();
        setFormData(oldData => ({
            ...oldData,
            password1: password,
            password2: password,
        }));
        setShowPassword(true);
    }

    const registerButtonClickHandler = (): void => {
        const {login, password1: password, firstName: first_name, lastName: last_name} = formData;
        dispatch(registerUser({
            login,
            password,
            first_name,
            last_name,
            avatar: null
        }));
    }

    const hasRegisterEnabled = (): boolean => {
        const {login, password1, password2, firstName, lastName} = formData;
        return !!(
            login &&
            password1 &&
            password2 &&
            firstName &&
            lastName &&
            password1 === password2 &&
            password1.length >= PASSWORD_MIN_LEN
        );
    }

    return (
        <Container sx={{display: 'flex', justifyContent: 'center'}}>
            <Stack spacing={2} maxWidth="30em" sx={{width: '25em'}}>
                <Typography variant="h5" gutterBottom component="div" sx={{textAlign: 'center'}}>
                    Введите данные для регистрации
                </Typography>
                <TextField
                    id="login_field"
                    label="Логин"
                    required
                    variant="outlined"
                    value={formData.login}
                    onChange={changeFieldHandler('login')}
                    disabled={hasUserDataPending}
                />
                <TextField
                    id="first_name_field"
                    label="Имя"
                    required
                    variant="outlined"
                    value={formData.firstName}
                    onChange={changeFieldHandler('firstName')}
                    disabled={hasUserDataPending}
                />
                <TextField
                    id="last_name_field"
                    label="Фамилия"
                    required
                    variant="outlined"
                    value={formData.lastName}
                    onChange={changeFieldHandler('lastName')}
                    disabled={hasUserDataPending}
                />
                <FormControl variant="outlined" required>
                    <InputLabel htmlFor="password_field">Пароль</InputLabel>
                    <OutlinedInput
                        id="password1_field"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password1}
                        onChange={changeFieldHandler('password1')}
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
                <FormControl variant="outlined" required>
                    <InputLabel htmlFor="password_field">Подтверждение пароля</InputLabel>
                    <OutlinedInput
                        id="password2_field"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password2}
                        onChange={changeFieldHandler('password2')}
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
                        label="Подтверждение пароля"
                    />
                </FormControl>
                {passwordError && <Alert severity="error">{passwordError}</Alert>}
                {/* Добавить поле выбора аватара */}
                <Button
                    variant="contained"
                    disableElevation
                    disabled={hasUserDataPending}
                    onClick={createPasswordButtonClickHandler}
                >
                    Создать для меня пароль
                </Button>
                {loggedUserError && <Alert severity="error">{loggedUserError}</Alert>}
                <LoadingButton
                    variant="contained"
                    disableElevation
                    loading={hasUserDataPending}
                    loadingPosition="center"
                    startIcon={<HowToRegIcon/>}
                    disabled={!hasRegisterEnabled()}
                    onClick={registerButtonClickHandler}
                >
                    Зарегистрироваться
                </LoadingButton>
            </Stack>
        </Container>
    );
}

export default Register;
