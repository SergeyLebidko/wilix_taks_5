import React, {Dispatch, SetStateAction, SyntheticEvent, useState} from 'react';
import {Autocomplete, Chip, TextField} from '@mui/material';
import {Color, ColorPicker} from 'material-ui-color';

import {useSelector} from 'react-redux';
import {tagListSelector} from '../../../redux/selectors';
import getTagUniqueTextList from '../../../helpers/utils/getTagUniqueTextList';
import {DEFAULT_TAG_COLOR_PARAMS, MAX_TAG_LEN} from '../../../constants';
import createColorString from '../../../helpers/utils/createColorString';
import {TColorParts, TTag} from '../../../types';

import './TagListCreator.scss';

type TagListCreatorProp = {
    setCreatedTagList: Dispatch<SetStateAction<Pick<TTag, 'text' | 'color'>[]>>,
    isDisabled: boolean
}

const TagListCreator: React.FC<TagListCreatorProp> = ({setCreatedTagList, isDisabled}) => {
    // Цвета тегов для ColorPicker храним в отдельном стейте из-за специфичности представления цвета в ColorPicker
    const [pickerColor, setPickerColor] = useState({});

    const tagList = useSelector(tagListSelector);
    const tagTextList = getTagUniqueTextList(tagList);

    const [tagText, setTagText] = useState('');

    // Мы получили новый массив с текстом тегов.
    // Теперь сопоставляем его с предыдущей версией массива и извлекаем из неё цвета
    // Если для тег только что добавлен и для него еще не выбран цвет - назначаем цвет по-умолчанию
    const changeTagListHandler = (event: React.SyntheticEvent, textList: string[]): void => {
        setCreatedTagList(oldTagList => {
            return textList.map(nextText => {
                const element = oldTagList.find(oldTag => oldTag.text === nextText);
                if (element) {
                    return element;
                } else {
                    return {text: nextText, color: DEFAULT_TAG_COLOR_PARAMS as TColorParts}
                }
            });
        });
    }

    const changeTagTextHandler = (event: SyntheticEvent, value: string): void => {
        setTagText(value.slice(0, MAX_TAG_LEN));
    }

    // Открываем компонент выбора цвета для чипа с переданным индексом
    const chipClickHandler = (index: number): void => {
        const element = document.querySelector(`#color-chip-picker-${index} div:last-child button`);
        if (element !== null) {
            (element as HTMLElement).click();
        }
    }

    // Назначаем тексту новый цвет
    const setColorForText = (nextColor: Color, text: string, index: number) => {
        const [h, s, l] = nextColor.hsl;

        // Обновляем создаваемый список тегов
        setCreatedTagList(oldData => {
            return oldData.map(data => {
                if (text === data.text) {
                    return {
                        text,
                        color: [h, s, l]
                    }
                } else {
                    return data;
                }
            });
        })

        // Принудительно изменяем цвет чипа
        const chip = document.querySelector(`#color-chip-picker-${index} div:first-child`) as HTMLElement;
        if (chip !== null) {
            chip.style.backgroundColor = createColorString([h, s, l]);
            if (l < 60) {
                chip.style.color = 'white';
            }
        }

        // Сохраняем цвет для ColorPicker
        setPickerColor(old => ({
            ...old,
            [text]: nextColor
        }));
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
                value.map((text: string, index: number) => (
                    <div key={text} className="custom_chip" id={`color-chip-picker-${index}`}>
                        <Chip
                            variant="outlined"
                            label={text}
                            {...getTagProps({index})}
                            onClick={() => chipClickHandler(index)}
                        />
                        <ColorPicker
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            value={pickerColor[text] || 'LightGray'}
                            onChange={(nextColor: Color) => setColorForText(nextColor, text, index)}
                            hideTextfield
                            hslGradient
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
