import React, {useEffect, useState, useRef} from 'react';
import {
    Alert, Avatar,
    Button,
    Container, Fab,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import LoadingButton from '@mui/lab/LoadingButton';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {useDispatch} from 'react-redux';

import {PASSWORD_MIN_LEN} from '../../../constants';
import {createPassword} from '../../../helpers/utils/utils';
import {registerUser} from "../../../redux/logged_user";
import {useLoggedUserErrorControl} from "../../../helpers/hooks/useLoggedUserErrorControl";

type TFormFieldNames = 'login' | 'password1' | 'password2' | 'firstName' | 'lastName' | 'avatar';

type TRegisterFormData = {
    login: string,
    password1: string,
    password2: string,
    firstName: string,
    lastName: string,
    avatarFilename: string
    avatarData: string | null
}

const Register: React.FC = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<TRegisterFormData>({
        login: '',
        password1: '',
        password2: '',
        firstName: '',
        lastName: '',
        avatarFilename: '',
        avatarData: null
    });
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Управляем отображением ошибки регистрации
    const [hasUserDataPending, loggedUserError] = useLoggedUserErrorControl();

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
        if (fieldName === 'avatar') {
            return (event: React.ChangeEvent): void => {
                const file = ((event.target as HTMLInputElement).files as FileList)[0];
                if (!file) return;

                setFormData(oldData => ({
                    ...oldData,
                    avatarFilename: file.name
                }));

                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = function () {
                    setFormData(oldData => ({
                        ...oldData,
                        avatarData: reader.result as string
                    }));
                }
            }
        }

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

    const avatarChoiceHandler = (): void => {
        if (fileInputRef.current === null) return;
        fileInputRef.current.click();
    }

    const avatarClearHandler = (): void => {
        setFormData(oldData => ({
            ...oldData,
            avatarFilename: '',
            avatarData: null
        }));
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
            avatar: formData.avatarData
        }));
    }

    const hasRegisterButtonDisabled = (): boolean => {
        const {login, password1, password2, firstName, lastName} = formData;
        return !(
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
        <>
            <input
                type="file"
                accept="image/jpeg,image/png"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={changeFieldHandler('avatar')}
            />
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
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <TextField
                            id="avatar_field"
                            label="Аватар"
                            variant="outlined"
                            disabled={hasUserDataPending}
                            onClick={avatarChoiceHandler}
                            value={formData.avatarFilename}
                            sx={{flex: 1}}
                        />
                        <Fab
                            size="small"
                            onClick={avatarClearHandler}
                            sx={{
                                backgroundColor: 'coral',
                                color: 'white',
                                boxShadow: 'none',
                                transition: 'all 300ms',
                                '&:active': {
                                    boxShadow: 'none'
                                },
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    backgroundColor: 'red'
                                }
                            }}>
                            <ClearIcon/>
                        </Fab>
                        {formData.avatarData === null ?
                            <Avatar sx={{width: 56, height: 56}}>
                                ...
                            </Avatar>
                            :
                            <Avatar
                                alt="Avatar"
                                src={formData.avatarData}
                                sx={{width: 56, height: 56}}
                            />
                        }

                    </Stack>
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
                        disabled={hasRegisterButtonDisabled()}
                        onClick={registerButtonClickHandler}
                    >
                        Зарегистрироваться
                    </LoadingButton>
                </Stack>
            </Container>
        </>
    );
}

export default Register;
