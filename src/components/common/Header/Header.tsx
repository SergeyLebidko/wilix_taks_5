import React from 'react';
import {useSelector} from 'react-redux';
import {Stack} from '@mui/material';

import {loggedUserSelector} from '../../../redux/selectors';
import AccountLinks from '../AccountLinks/AccountLinks';
import AccountActions from '../AccountActions/AccountActions';
import Logo from '../Logo/Logo';

const headerStyle = {
    backgroundColor: 'deepskyblue',
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 1
};

const Header: React.FC = () => {
    const loggedUser = useSelector(loggedUserSelector);

    return (
        <Stack direction="row" sx={headerStyle}>
            <Logo/>
            {loggedUser ? <AccountActions/> : <AccountLinks/>}
        </Stack>
    )
}

export default Header;
