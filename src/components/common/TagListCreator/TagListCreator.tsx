import React, {Dispatch, SetStateAction, SyntheticEvent, useEffect, useState} from 'react';
import {Autocomplete, Chip, TextField} from '@mui/material';
import {Color, ColorPicker} from 'material-ui-color';

import {useSelector} from 'react-redux';
import {tagListSelector} from '../../../redux/selectors';
import getTagUniqueTextList from '../../../helpers/utils/getTagUniqueTextList';
import {DEFAULT_TAG_COLOR_NAME, DEFAULT_TAG_COLOR_PARAMS, MAX_TAG_LEN} from '../../../constants';
import createColorString from '../../../helpers/utils/createColorString';
import {TColorParts, TTextColorMap} from '../../../types';

import './TagListCreator.scss';
import getLuma from "../../../helpers/utils/getLuma";

type TagListCreatorProp = {
    textColorMap: TTextColorMap
    setTextColorMap: Dispatch<SetStateAction<TTextColorMap>>,
    isDisabled: boolean
}

const TagListCreator: React.FC<TagListCreatorProp> = ({textColorMap, setTextColorMap, isDisabled}) => {
    // Получаем список тегов, уже использовавшихся другими пользователями
    const tagTextList = getTagUniqueTextList(useSelector(tagListSelector));

    const [tagText, setTagText] = useState('');

    // Обновляем цвета чипов с тегами при добавлении новых, еще не существовавших тегов
    useEffect(() => {
        for (const key of Object.keys(textColorMap)) {
            const {color, index} = textColorMap[key];
            if (typeof color === 'string') {
                repaintChip(index, ...DEFAULT_TAG_COLOR_PARAMS);
            } else {
                repaintChip(index, ...(color.rgb as TColorParts));
            }
        }
    }, [textColorMap]);

    // Функция для принудительного перкрашивания чипов
    const repaintChip = (index: number, r: number, g: number, b: number): void => {
        const chip = document.querySelector(`#color-chip-picker-${index} div:first-child`) as HTMLElement;
        const removeIcon = document.querySelector(`#color-chip-picker-${index} svg`) as HTMLElement;
        chip.style.backgroundColor = createColorString([r, g, b]);
        if (getLuma(r, g, b) < 60) {
            chip.style.color = 'white';
            removeIcon.style.color = 'white';
        }
    }

    // Функция получает новый список строк - тегов, которые сопоставляет с цветами
    const changeTagListHandler = (event: React.SyntheticEvent, textList: string[]): void => {
        setTextColorMap(oldMap => {
            const result: TTextColorMap = {};
            textList.forEach((text, index) => {
                if (oldMap[text] === undefined) {
                    result[text] = {
                        color: DEFAULT_TAG_COLOR_NAME,
                        index
                    };
                } else {
                    result[text] = {
                        color: oldMap[text].color,
                        index
                    };
                }
            });
            return result;
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
        // Обновляем создаваемый список тегов новым цветом
        setTextColorMap(oldData => {
            return {
                ...oldData,
                [text]: {
                    color: nextColor,
                    index
                }
            }
        });

        // Принудительно изменяем цвет чипа  и устанавливаем цвет текста для него
        const [r, g, b] = nextColor.rgb;
        repaintChip(index, r, g, b);
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
                            value={textColorMap[text].color}
                            onChange={(nextColor: Color) => setColorForText(nextColor, text, index)}
                            hideTextfield
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
