import React, {useState} from 'react';
import {Stack, TextField, Typography} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';

import {createPost} from '../../../redux/post_list';
import {loggedUserSelector, postListStatusSelector, tagListStatusSelector} from '../../../redux/selectors';
import useNavigator from '../../../helpers/hooks/useNavigator';
import PreloaderButton from '../../common/PreloaderButton/PreloaderButton';
import TagListCreator from '../../common/TagListCreator/TagListCreator';
import {TUser} from '../../../types';
import {createTagList} from '../../../redux/tag_list';

type TFormFieldNames = 'title' | 'text';

type TCreatePostFormData = {
    title: string,
    text: string
}

const CreatePost: React.FC = () => {
    const {toMain} = useNavigator();
    const dispatch = useDispatch();

    const [createdTagList, setCreatedTagList] = useState<string[]>([]);

    const loggedUser = useSelector(loggedUserSelector);
    const [formData, setFormData] = useState<TCreatePostFormData>({
        title: '',
        text: ''
    });

    const postListStatus = useSelector(postListStatusSelector);
    const tagListStatus = useSelector(tagListStatusSelector);
    const isPostListPending = postListStatus === 'pending' || tagListStatus === 'pending';

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
        // Создаем пост
        const result = await dispatch(createPost({
            user_id: (loggedUser as TUser).id as number,
            title: formData.title,
            text: formData.text,
            dt_created: +new Date()
        }));

        // Создаем список тегов, связанных с постом
        await dispatch(
            createTagList(
                // Подавление добавлено специально, так как иначе ts не дает получить доступ к свойству payload
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                createdTagList.map(text => ({text, post_id: result.payload.id}))
            )
        );

        // После завершения "сетевых" операций - переводим пользователя на главную страницу
        toMain();
    };

    const isCreatePostButtonDisabled = !formData.title || !formData.text;

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
                disabled={isPostListPending}
                onChange={fieldChangeHandler('title')}
                sx={{backgroundColor: 'white'}}
            />
            <TextField
                id='text_field'
                label='Текст'
                multiline
                rows={8}
                value={formData.text}
                disabled={isPostListPending}
                onChange={fieldChangeHandler('text')}
                sx={{backgroundColor: 'white'}}
            />
            <TagListCreator setCreatedTagList={setCreatedTagList} isDisabled={isPostListPending}/>
            <PreloaderButton
                isLoading={isPostListPending}
                isDisabled={isCreatePostButtonDisabled}
                clickHandler={createPostButtonClickHandler}
                label='Опубликовать'
            />
        </Stack>
    );
};

export default CreatePost;
