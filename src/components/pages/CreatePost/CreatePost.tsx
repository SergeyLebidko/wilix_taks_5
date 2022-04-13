import React, {useState} from 'react';
import {Stack, TextField, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';

import {createPost} from '../../../redux/post_list';
import {loggedUserSelector, postListStatusSelector} from '../../../redux/selectors';
import useNavigator from '../../../helpers/hooks/useNavigator';
import PreloaderButton from '../../common/PreloaderButton/PreloaderButton';
import TagListCreator from '../../common/TagListCreator/TagListCreator';
import {TTag, TUser} from '../../../types';

type TFormFieldNames = 'title' | 'text';

type TCreatePostFormData = {
    title: string,
    text: string
}

const CreatePost: React.FC = () => {
    const {toMain} = useNavigator();
    const dispatch = useDispatch();

    const [editableTagList, setEditableTagList] = useState<TTag[]>([]);

    const loggedUser = useSelector(loggedUserSelector);
    const [formData, setFormData] = useState<TCreatePostFormData>({
        title: '',
        text: ''
    });

    const postListStatus = useSelector(postListStatusSelector);
    const hasPostListPending = postListStatus === 'pending';

    const fieldChangeHandler = (fieldName: TFormFieldNames) => {
        return (event: React.ChangeEvent) => {
            const nextValue = (event.target as HTMLInputElement).value;
            if (fieldName === 'title') {
                setFormData(oldData => ({
                    ...oldData,
                    title: nextValue
                }));
            }
            if (fieldName === 'text') {
                setFormData(oldData => ({
                    ...oldData,
                    text: nextValue
                }));
            }
        }
    };

    const createPostButtonClickHandler = async () => {
        await dispatch(createPost({
            user_id: (loggedUser as TUser).id as number,
            title: formData.title,
            text: formData.text,
            dt_created: +new Date()
        }));
        toMain();
        // TODO Дополнить кодом создания списка тегов
    };

    const hasCreatePostButtonDisabled = !formData.title || !formData.text;

    return (
        <Stack spacing={2}>
            <Typography variant='h5' gutterBottom component='div' sx={{textAlign: 'center'}}>
                Новый пост
            </Typography>
            <TextField
                id='title_field'
                label='Заголовок'
                variant='outlined'
                required
                value={formData.title}
                disabled={hasPostListPending}
                onChange={fieldChangeHandler('title')}
            />
            <TextField
                id='text_field'
                label='Текст'
                multiline
                rows={8}
                value={formData.text}
                disabled={hasPostListPending}
                onChange={fieldChangeHandler('text')}
            />
            <TagListCreator editableList={editableTagList} setEditableList={setEditableTagList}/>
            <PreloaderButton
                hasLoading={hasPostListPending}
                hasDisabled={hasCreatePostButtonDisabled}
                clickHandler={createPostButtonClickHandler}
                label='Опубликовать'
            />
        </Stack>
    );
};

export default CreatePost;
