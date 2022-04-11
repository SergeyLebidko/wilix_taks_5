import React from 'react';
import {useSelector} from 'react-redux';
import {AccordionActions, Box, Stack} from '@mui/material';

import Logo from '../Logo/Logo';
import {loggedUserSelector} from '../../../redux/selectors';
import AccountLinks from "../AccountLinks/AccountLinks";

const Header: React.FC = () => {
    const loggedUser = useSelector(loggedUserSelector);

    return (
        <Box sx={{
            backgroundColor: 'deepskyblue',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem'
        }}>
            <Logo/>
            <Stack direction="row" spacing={1} sx={{color: 'white', alignItems: 'center'}}>
                {loggedUser ? <AccordionActions/> : <AccountLinks/>}
            </Stack>
        </Box>
    )
}

export default Header;
