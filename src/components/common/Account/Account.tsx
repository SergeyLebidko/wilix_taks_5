import React from 'react';
import {Box} from '@mui/material';

import {useSelector} from 'react-redux';
import {loggedUserSelector} from '../../../store';

const Account: React.FC = () => {
    const loggedUser = useSelector(loggedUserSelector);

    return (
        <Box>
            {(function(){
                if (loggedUser) {
                    return (
                        <div>
                            Пользователь залогинен!
                        </div>
                    );
                } else {
                    return (
                        <div>
                            Пользователь не залогинен...
                        </div>
                    );
                }
            })()}
        </Box>
    );
}

export default Account;
