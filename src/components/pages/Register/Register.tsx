import React, {useEffect, useState, useRef} from 'react';
import {
    Alert,
    Avatar,
    Button,
    Container,
    Fab,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {useDispatch} from 'react-redux';

import {PASSWORD_MIN_LEN} from '../../../constants';
import {registerUser} from '../../../redux/logged_user';
import useLoggedUserErrorControl from '../../../helpers/hooks/useLoggedUserErrorControl';
import createPassword from '../../../helpers/utils/createPassword';
import PasswordField from '../../common/PasswordField/PasswordField';
import PreloaderButton from '../../common/PreloaderButton/PreloaderButton';

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

const containerStyle = {
    display: 'flex',
    justifyContent: 'center'
}

const avatarStyle = {
    width: 72,
    height: 72
};

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
    const [isUserDataPending, loggedUserError] = useLoggedUserErrorControl();

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
        if(fileInputRef.current !== null) {
            (fileInputRef.current as HTMLInputElement).value = '';
        }
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
            login: login.trim(),
            password,
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            avatar: formData.avatarData
        }));
    }

    const isRegisterButtonDisabled = (): boolean => {
        const {login, password1, password2, firstName, lastName} = formData;
        return !(
            login.trim() &&
            password1 &&
            password2 &&
            firstName.trim() &&
            lastName.trim() &&
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
            <Container sx={containerStyle}>
                <Stack component="form" spacing={2} sx={{width: '25em'}}>
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
                        disabled={isUserDataPending}
                    />
                    <TextField
                        id="first_name_field"
                        label="Имя"
                        required
                        variant="outlined"
                        value={formData.firstName}
                        onChange={changeFieldHandler('firstName')}
                        disabled={isUserDataPending}
                    />
                    <TextField
                        id="last_name_field"
                        label="Фамилия"
                        required
                        variant="outlined"
                        value={formData.lastName}
                        onChange={changeFieldHandler('lastName')}
                        disabled={isUserDataPending}
                    />
                    <Stack direction="row" spacing={2} sx={{alignItems: 'center'}}>
                        <TextField
                            id="avatar_field"
                            label="Аватар"
                            variant="outlined"
                            disabled={isUserDataPending}
                            onClick={avatarChoiceHandler}
                            value={formData.avatarFilename}
                            sx={{flex: 1}}
                        />
                        <Fab size="small" onClick={avatarClearHandler}>
                            <ClearIcon/>
                        </Fab>
                        {formData.avatarData === null ?
                            <Avatar sx={avatarStyle}>...</Avatar>
                            :
                            <Avatar alt="Avatar" src={formData.avatarData} sx={avatarStyle}/>
                        }
                    </Stack>
                    <PasswordField
                        label="Пароль"
                        isShow={showPassword}
                        isDisabled={isUserDataPending}
                        value={formData.password1}
                        showSwitcherHandler={handleClickShowPassword}
                        changeHandler={changeFieldHandler('password1')}
                    />
                    <PasswordField
                        label="Подтверждение пароля"
                        isShow={showPassword}
                        isDisabled={isUserDataPending}
                        value={formData.password2}
                        showSwitcherHandler={handleClickShowPassword}
                        changeHandler={changeFieldHandler('password2')}
                    />
                    {passwordError && <Alert severity="error">{passwordError}</Alert>}
                    <Button variant="contained" disabled={isUserDataPending}
                            onClick={createPasswordButtonClickHandler}>
                        Создать для меня пароль
                    </Button>
                    {loggedUserError && <Alert severity="error">{loggedUserError}</Alert>}
                    <PreloaderButton
                        isLoading={isUserDataPending}
                        isDisabled={isRegisterButtonDisabled()}
                        clickHandler={registerButtonClickHandler}
                        label="Зарегистрироваться"
                    />
                </Stack>
            </Container>
        </>
    );
}

export default Register;
