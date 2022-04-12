import React, {useState} from 'react';
import {Stack, TextField} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';

import {TUser, TPost} from '../../../types';
import PreloaderButton from '../PreloaderButton/PreloaderButton';
import {loggedUserSelector} from '../../../redux/selectors';
import {createComment} from '../../../redux/comment_list';

type CommentCreatorProp = {
    post: TPost
}

const containerStyle = {
    marginTop: '1.2rem',
    marginLeft: '3rem'
};

const CommentCreator: React.FC<CommentCreatorProp> = ({post}) => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(loggedUserSelector);

    const [text, setText] = useState('');
    const [hasProcess, setHasProcess] = useState(false);

    const textChangeHandler = (event: React.ChangeEvent): void => {
        const nextValue = (event.target as HTMLInputElement).value;
        setText(nextValue);
    }

    const textKeyDownHandler = (event: React.KeyboardEvent): void => {
        const {code} = event;
        if (code === 'Enter' || code === 'NumpadEnter') {
            createButtonClickHandler();
        }
    }

    const createButtonClickHandler = async () => {
        setHasProcess(true);
        await dispatch(createComment({
            user_id: (loggedUser as TUser).id as number,
            post_id: post.id as number,
            text: text.trim(),
            dt_created: +new Date()
        }));
        setText('');
        setHasProcess(false);
    }

    return (
        <Stack direction="row" spacing={2} sx={containerStyle}>
            <TextField
                label="Ваш комментарий"
                variant="outlined"
                sx={{flex: 1}}
                value={text}
                onChange={textChangeHandler}
                onKeyDown={textKeyDownHandler}
                disabled={hasProcess}
            />
            <PreloaderButton
                hasLoading={hasProcess}
                hasDisabled={text.trim() === ''}
                clickHandler={createButtonClickHandler}
                label="Отправить"
            />
        </Stack>
    );
};

export default CommentCreator;
