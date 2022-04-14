import React, {Dispatch, SetStateAction} from 'react';
import {Autocomplete, Chip, TextField} from '@mui/material';

import {useSelector} from 'react-redux';
import {tagListSelector} from '../../../redux/selectors';
import getTagTextList from "../../../helpers/utils/getTagTextList";

type TagListCreatorProp = {
    setCreatedTagList: Dispatch<SetStateAction<string[]>>
}

const TagListCreator: React.FC<TagListCreatorProp> = ({setCreatedTagList}) => {
    const tagList = useSelector(tagListSelector);
    const tagTextList = getTagTextList(tagList);

    const changeHandler = (event: React.SyntheticEvent, value: string[]): void => {
        setCreatedTagList(value);
    }

    return (
        <Autocomplete
            onChange={changeHandler}
            multiple
            options={tagTextList}
            defaultValue={[]}
            freeSolo
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
