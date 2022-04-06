import React from 'react';
import {Link} from '@mui/material';

const Logo: React.FC = () => {
    return (
        <Link
            sx={{
                typography: 'body1',
                fontWeight: 'regular',
                fontSize: 'h5.fontSize',
                color: '#fff',
                textDecoration: 'none'
            }}
            href="#/"
        >
            Wilix Blog
        </Link>
    );
}

export default Logo;
