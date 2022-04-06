import React from 'react';
import {Alert} from '@mui/material';
import {useLocation} from 'react-router-dom';

const NoMatch: React.FC = () => {
    const location = useLocation();
    return <Alert severity="error">Станица {location.pathname} не найдена...</Alert>;
};

export default NoMatch;
