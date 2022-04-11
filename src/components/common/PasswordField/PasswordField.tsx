import React from 'react';
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

type PasswordFieldProp = {
    id?: string,
    label?: string,
    hasShow: boolean,
    hasDisabled: boolean,
    value: string,
    showSwitcherHandler: () => void,
    changeHandler: (event: React.ChangeEvent) => void,
}

const PasswordField: React.FC<PasswordFieldProp> = (props) => {
    const {
        id='password',
        label='Пароль',
        hasShow,
        showSwitcherHandler,
        hasDisabled,
        value,
        changeHandler
    } = props;

    return (
        <FormControl variant="outlined" required>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
                id={id}
                type={hasShow ? 'text' : 'password'}
                value={value}
                onChange={changeHandler}
                disabled={hasDisabled}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={showSwitcherHandler}
                            edge="end"
                        >
                            {hasShow ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
        </FormControl>
    );
};

export default PasswordField;
