import React, {Dispatch, SetStateAction, useState} from 'react';
import {Button, Chip, Stack, TextField} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import {TTag} from '../../../types';

type TEditableTagElement = {
    tag: TTag,
    hasSelection: boolean
}

type TagListCreatorProp = {
    editableList: TEditableTagElement[],
    setEditableList: Dispatch<SetStateAction<TEditableTagElement[]>>
}

const TagListCreator: React.FC<TagListCreatorProp> = ({editableList, setEditableList}) => {
    const [text, setText] = useState('');

    const addTag = (): void => {
        const _text = text.trim();

        const foundElement = editableList.find(editableTag => {
            return editableTag.tag.text.toLowerCase() === _text.toLowerCase();
        })

        // Если пользователь пытается добавить тег, который уже есть - просто делаем найденный существующий тег выделенным
        if (foundElement) {
            setEditableList(oldList => oldList.map(editableTag => {
                if (editableTag === foundElement) {
                    return {
                        ...foundElement,
                        hasSelection: true
                    }
                } else {
                    return editableTag;
                }
            }));
        } else {
            setEditableList(oldList => [
                ...oldList,
                {
                    tag: {
                        text: _text.trim()
                    },
                    hasSelection: true
                }
            ]);
        }
    }

    const tagChipClickHandler = (editableTag: TEditableTagElement): void => {
        setEditableList(oldList => {
            return oldList.map(_editableTag => {
                if (_editableTag !== editableTag) return _editableTag;
                return {...editableTag, hasSelection: !editableTag.hasSelection};
            })
        });
    }

    const textFieldChangeHandler = (event: React.ChangeEvent): void => {
        const nextValue = (event.target as HTMLInputElement).value;
        setText(nextValue);
    }

    const textFieldKeyDownHandler = (event: React.KeyboardEvent): void => {
        const {code} = event;
        if ((code === 'Enter' || code === 'NumpadEnter') && text.trim()) {
            addTag();
            setText('');
        }
    }

    const createTagButtonClickHandler = (): void => {
        if (text.trim()) {
            addTag();
            setText('');
        }
    }

    return (
        <>
            <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap', alignItems: 'center'}}>
                {editableList.map(
                    editableTag =>
                        editableTag.hasSelection ?
                            <Chip
                                sx={{margin: '4px'}}
                                key={editableTag.tag.id || editableTag.tag.text}
                                label={editableTag.tag.text}
                                onClick={() => tagChipClickHandler(editableTag)}
                                color="primary"
                            />
                            :
                            <Chip
                                sx={{margin: '4px'}}
                                key={editableTag.tag.id || editableTag.tag.text}
                                label={editableTag.tag.text}
                                onClick={() => tagChipClickHandler(editableTag)}
                                variant="outlined"
                            />
                )}
            </Stack>
            <Stack direction="row" spacing={2}>
                <TextField
                    label="Введите тег, чтобы выделить или добавить его"
                    variant="outlined"
                    value={text}
                    sx={{flex: 1}}
                    onChange={textFieldChangeHandler}
                    onKeyDown={textFieldKeyDownHandler}
                />
                <Button variant="contained" onClick={createTagButtonClickHandler}>
                    <PlayArrowIcon/>
                </Button>
            </Stack>
        </>
    );
};

export default TagListCreator;
