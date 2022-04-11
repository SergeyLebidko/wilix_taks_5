import React from 'react';
import {useSelector} from 'react-redux';
import {Box, Link, Stack} from '@mui/material';

import {loggedUserSelector} from '../../../redux/selectors';
import AccountLinks from '../AccountLinks/AccountLinks';
import AccountActions from '../AccountActions/AccountActions';
import './Header.scss';

const Header: React.FC = () => {
    const loggedUser = useSelector(loggedUserSelector);

    return (
        <Box className="header">
            <Link className="header__title" href="#/">Wilix Blog</Link>
            <Stack className="header__content_block" direction="row" spacing={1}>
                {loggedUser ? <AccountActions/> : <AccountLinks/>}
            </Stack>
        </Box>
    )
}

export default Header;
