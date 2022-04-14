import React from 'react';
import {Typography} from '@mui/material';
import useNavigator from '../../../helpers/hooks/useNavigator';

const logoStyle = {
    color: 'white',
    cursor: 'pointer',
    transition: 'all 150ms',
    '&:hover': {
        transform: 'translateY(-3px)'
    },
    '&:active': {
        transform: 'translateY(0)'
    }
};

const Logo: React.FC = () => {
    const {toMain} = useNavigator();

    return <Typography variant="h6" sx={logoStyle} onClick={toMain}>Wilix Blog</Typography>;
}

export default Logo;
