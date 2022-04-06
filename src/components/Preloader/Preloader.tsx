import React from 'react';
import {CircularProgress} from '@mui/material';

import './Preloader.scss';

type PreloaderProps = {
    fullscreen: boolean
}

const Preloader: React.FC<PreloaderProps> = ({fullscreen=false}) => {
    return (
        <div className={'preloader' + (fullscreen ? ' preloader_fullscreen' : ' preloader_usual')}>
            <CircularProgress/>
        </div>
    );
}

export default Preloader;
