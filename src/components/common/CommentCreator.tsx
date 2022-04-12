import React from 'react';
import {Stack, TextField} from '@mui/material';
import PreloaderButton from "./PreloaderButton/PreloaderButton";

const containerStyle = {
    marginTop: '1.2rem',
    marginLeft: '3rem'
};

const CommentCreator: React.FC = () => {

    const createButtonClickHandler = (): void => {
        console.log('Отправка комментария');
    }

    return (
        <Stack direction="row" spacing={2} sx={containerStyle}>
            <TextField label="Ваш комментарий" variant="outlined" sx={{flex: 1}}/>
            <PreloaderButton
                hasLoading={false}
                hasDisabled={false}
                clickHandler={createButtonClickHandler}
                label="Отправить"
            />
        </Stack>
    );
};

export default CommentCreator;
