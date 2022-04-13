import React, {Dispatch, SetStateAction, useState} from 'react';
import {Autocomplete, Chip, TextField} from '@mui/material';

import {TTag} from '../../../types';
import {useSelector} from "react-redux";
import {tagListSelector} from "../../../redux/selectors";

type TagListCreatorProp = {
    editableList: TTag[],
    setEditableList: Dispatch<SetStateAction<TTag[]>>
}

const TagListCreator: React.FC<TagListCreatorProp> = ({editableList, setEditableList}) => {
    const tagList = useSelector(tagListSelector);

    const changeHandler = (event: React.SyntheticEvent, value: string[], reason: string): void => {
        console.log(value);
    }

    return (
        <Autocomplete
            onChange={changeHandler}
            multiple
            options={tagList.map(tag => tag.text)}
            defaultValue={[]}
            freeSolo
            renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => (
                    // eslint-disable-next-line react/jsx-key
                    <Chip variant="outlined" label={option} {...getTagProps({index})}/>
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Введите или выберите теги"
                    placeholder="Введите или выберите теги"
                />
            )}
        />
    );
};

export default TagListCreator;
