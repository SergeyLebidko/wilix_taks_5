import React, {Dispatch, SetStateAction, SyntheticEvent, useState} from 'react';
import {Autocomplete, Chip, TextField} from '@mui/material';
import {Color, ColorPicker} from 'material-ui-color';

import {useSelector} from 'react-redux';
import {tagListSelector} from '../../../redux/selectors';
import getTagTextList from "../../../helpers/utils/getTagTextList";
import {MAX_TAG_LEN} from "../../../constants";

import './TagListCreator.scss';

type TagListCreatorProp = {
    setCreatedTagList: Dispatch<SetStateAction<string[]>>,
    isDisabled: boolean
}

const TagListCreator: React.FC<TagListCreatorProp> = ({setCreatedTagList, isDisabled}) => {
    const tagList = useSelector(tagListSelector);
    const tagTextList = getTagTextList(tagList);

    const [tagText, setTagText] = useState('');
    const [color, setColor] = useState('red');

    const changeTagListHandler = (event: React.SyntheticEvent, value: string[]): void => {
        setCreatedTagList(value);
    }

    const changeTagTextHandler = (event: SyntheticEvent, value: string): void => {
        setTagText(value.slice(0, MAX_TAG_LEN));
    }

    const chipClickHandler = (index: number): void => {
        const element = document.querySelector(`#color-${index} div:first-child button`);
        console.log(element);
        if (element !== null) {
            (element as HTMLElement).click();
        }
    }

    const colorChangeHandler = (newValue: Color) => {
        console.log("change", newValue);
        setColor(`#${newValue.hex}`);
        // setColor(newValue);
        // action('changed')(newValue);
    };

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
                    <div className="custom_chip" id={`color-${index}`}>
                        <ColorPicker value={color} onChange={colorChangeHandler} hideTextfield/>
                        <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({index})}
                            onClick={() => chipClickHandler(index)}
                        />

                    </div>

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
