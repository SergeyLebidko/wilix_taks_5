import React from 'react';
import {Box, CircularProgress, Fab} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

type PreloaderRemoveFabProp = {
    hasRemoveProcess: boolean,
    removeButtonClickHandler: () => void
}

const removeButtonStyle = {
    marginLeft: 'auto!important'
}

const RemoveButton: React.FC<PreloaderRemoveFabProp> = (props) => {
    const {hasRemoveProcess, removeButtonClickHandler} = props;

    if (hasRemoveProcess) {
        return (
            <Box sx={removeButtonStyle}>
                <CircularProgress/>
            </Box>
        );
    } else {
        return (
            <Fab
                size="small"
                onClick={removeButtonClickHandler}
                sx={removeButtonStyle}>
                <ClearIcon/>
            </Fab>
        );
    }
}

export default RemoveButton;
