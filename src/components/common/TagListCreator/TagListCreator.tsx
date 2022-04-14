import React, {Dispatch, SetStateAction, SyntheticEvent, useState} from 'react';
import {Autocomplete, Chip, TextField} from '@mui/material';

import {useSelector} from 'react-redux';
import {tagListSelector} from '../../../redux/selectors';
import getTagTextList from "../../../helpers/utils/getTagTextList";
import {MAX_TAG_LEN} from "../../../constants";

type TagListCreatorProp = {
    setCreatedTagList: Dispatch<SetStateAction<string[]>>,
    isDisabled: boolean
}

const TagListCreator: React.FC<TagListCreatorProp> = ({setCreatedTagList, isDisabled}) => {
    const tagList = useSelector(tagListSelector);
    const tagTextList = getTagTextList(tagList);

    const [tagText, setTagText] = useState('');

    const changeTagListHandler = (event: React.SyntheticEvent, value: string[]): void => {
        setCreatedTagList(value);
    }

    const changeTagTextHandler = (event: SyntheticEvent, value: string): void => {
        setTagText(value.slice(0, MAX_TAG_LEN));
    }

    return (
        <Autocomplete
            onChange={changeTagListHandler}
            multiple
            options={tagTextList}
            defaultValue={[]}
            freeSolo
            disabled={isDisabled}
            inputValue={tagText}
            onInputChange={changeTagTextHandler}
            renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => (
                    // eslint-disable-next-line react/jsx-key
                    <Chip
                        onClick={() => console.log(`Клик по чипсе: ${option}`)}
                        variant="outlined"
                        label={option}
                        {...getTagProps({index})}
                    />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Введите или выберите теги"
                    sx={{backgroundColor: 'white'}}
                />
            )}
        />
    );
};

export default TagListCreator;
