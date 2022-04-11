import React from 'react';
import {Typography} from '@mui/material';
import useNavigator from '../../../helpers/hooks/useNavigator';

const logoStyle = {
    color: 'white',
    cursor: 'pointer'
};

const Logo: React.FC = () => {
    const {toMain} = useNavigator();

    return <Typography variant="h5" sx={logoStyle} onClick={toMain}>Wilix Blog</Typography>;
}

export default Logo;
