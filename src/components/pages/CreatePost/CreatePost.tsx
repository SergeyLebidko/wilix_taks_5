import React, {useState} from 'react';
import {Button, Chip, Stack, TextField, Typography} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {useDispatch, useSelector} from 'react-redux';

import {createPost} from '../../../redux/post_list';
import {loggedUserSelector, postListStatusSelector, tagListSelector} from '../../../redux/selectors';
import useNavigator from '../../../helpers/hooks/useNavigator';
import PreloaderButton from '../../common/PreloaderButton/PreloaderButton';
import {TTag, TUser} from '../../../types';

type TFormFieldNames = 'title' | 'text';

type TCreatePostFormData = {
    title: string,
    text: string
}

type TEditableTagElement = {
    tag: TTag,
    hasSelection: boolean
}

const CreatePost: React.FC = () => {
    const {toMain} = useNavigator();
    const dispatch = useDispatch();

    const [tagText, setTagText] = useState('');

    const tagList = useSelector(tagListSelector);
    const [editableTagList, setEditableTagList] = useState<TEditableTagElement[]>(() =>
        tagList.map(tag => ({tag, hasSelection: false}))
    );

    const loggedUser = useSelector(loggedUserSelector);
    const [formData, setFormData] = useState<TCreatePostFormData>({
        title: '',
        text: ''
    });

    const postListStatus = useSelector(postListStatusSelector);
    const hasPostListPending = postListStatus === 'pending';

    const addTag = (_tagText: string): void => {
        // Если пользователь пытается добавить тег, который уже есть - просто делаем его выделенным
        const foundElement = editableTagList.find(editableTag => {
            return editableTag.tag.text.toLowerCase() === _tagText.toLowerCase();
        })

        // Если пользователь пытается добавить элемент, тег уже есть - просто делаем его выделенным
        if (foundElement) {
            setEditableTagList(oldList => oldList.map(editableTag => {
                if (editableTag === foundElement) {
                    return {...foundElement, hasSelection: true}
                } else {
                    return editableTag;
                }
            }));
        } else {
            setEditableTagList(oldList => [
                ...oldList,
                {
                    tag: {
                        text: tagText.trim()
                    },
                    hasSelection: true
                }
            ]);
        }
    }

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

    const tagClickHandler = (editableTag: TEditableTagElement): void => {
        setEditableTagList(oldList => {
            return oldList.map(_editableTag => {
                if (_editableTag !== editableTag) return _editableTag;
                return {...editableTag, hasSelection: !editableTag.hasSelection};
            })
        });
    }

    const tagTextChangeHandler = (event: React.ChangeEvent): void => {
        const nextValue = (event.target as HTMLInputElement).value;
        setTagText(nextValue);
    }

    const tagTextKeyDownHandler = (event: React.KeyboardEvent): void => {
        const {code} = event;
        const _tagText = tagText.trim();

        if ((code === 'Enter' || code === 'NumpadEnter') && _tagText) {
            addTag(_tagText);
            setTagText('');
        }
    }

    const tagTextButtonClickHandler = (): void => {
        const _tagText = tagText.trim();

        if (_tagText) {
            addTag(_tagText);
            setTagText('');
        }
    }

    const createPostButtonClickHandler = async () => {
        await dispatch(createPost({
            user_id: (loggedUser as TUser).id as number,
            title: formData.title,
            text: formData.text,
            dt_created: +new Date()
        }));
        toMain();
    };

    const hasCreatePostButtonDisabled = !formData.title || !formData.text;

    return (
        <Stack spacing={2}>
            <Typography variant="h5" gutterBottom component="div" sx={{textAlign: 'center'}}>
                Новый пост
            </Typography>
            <TextField
                id="title_field"
                label="Заголовок"
                variant="outlined"
                required
                value={formData.title}
                disabled={hasPostListPending}
                onChange={fieldChangeHandler('title')}
            />
            <TextField
                id="text_field"
                label="Текст"
                multiline
                rows={8}
                value={formData.text}
                disabled={hasPostListPending}
                onChange={fieldChangeHandler('text')}
            />
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap', alignItems: 'center'}}>
                {editableTagList.map(
                    editableTag =>
                        editableTag.hasSelection ?
                            <Chip
                                sx={{margin: '4px'}}
                                key={editableTag.tag.id || editableTag.tag.text}
                                label={editableTag.tag.text}
                                onClick={() => tagClickHandler(editableTag)}
                                color="primary"
                            />
                            :
                            <Chip
                                sx={{margin: '4px'}}
                                key={editableTag.tag.id || editableTag.tag.text}
                                label={editableTag.tag.text}
                                onClick={() => tagClickHandler(editableTag)}
                                variant="outlined"
                            />
                )}
            </Stack>
            <Stack direction="row" spacing={2}>
                <TextField
                    label="Введите тег, чтобы выделить или добавить его"
                    variant="outlined"
                    value={tagText}
                    onChange={tagTextChangeHandler}
                    onKeyDown={tagTextKeyDownHandler}
                    sx={{flex: 1}}
                />
                <Button variant="contained" onClick={tagTextButtonClickHandler}>
                    <PlayArrowIcon/>
                </Button>
            </Stack>
            <PreloaderButton
                hasLoading={hasPostListPending}
                hasDisabled={hasCreatePostButtonDisabled}
                clickHandler={createPostButtonClickHandler}
                label="Опубликовать"
            />
        </Stack>
    );
};

export default CreatePost;
