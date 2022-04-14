import React from 'react';
import {Box, CircularProgress, Fab} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

type PreloaderRemoveFabProp = {
    isRemoveProcess: boolean,
    removeButtonClickHandler: () => void
}

const containerStyle = {
    marginLeft: 'auto!important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '32px',
    minHeight: '32px'
}

const removeElementStyle = {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    '&:hover': {
        backgroundColor: 'transparent'
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: 'transparent'
    }
}

const RemoveButton: React.FC<PreloaderRemoveFabProp> = (props) => {
    const {isRemoveProcess, removeButtonClickHandler} = props;

    return (
        <Box sx={containerStyle}>
            {isRemoveProcess ?
                <Box sx={removeElementStyle}>
                    <CircularProgress size={24} color="inherit"/>
                </Box>
                :
                <Fab size="small" sx={removeElementStyle} onClick={removeButtonClickHandler}>
                    <ClearIcon/>
                </Fab>
            }
        </Box>
    )
}

export default RemoveButton;
