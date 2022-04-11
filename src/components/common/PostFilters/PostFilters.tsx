import React, {Dispatch, SetStateAction} from 'react';
import {Button, SelectChangeEvent, Stack, TextField} from '@mui/material';

import {TSortDirection, TSortType} from '../../../types';
import Selector from '../Selector/Selector';

type PostFiltersProps = {
    sortType: TSortType,
    setSortType: Dispatch<SetStateAction<TSortType>>,
    sortDirection: TSortDirection,
    setSortDirection: Dispatch<SetStateAction<TSortDirection>>,
    keyWord: string,
    setKeyWord: Dispatch<SetStateAction<string>>,
    resetParams: () => void
}

const SortTypesList = [
    {
        value: TSortType.ByDate,
        text: 'По дате'
    },
    {
        value: TSortType.ByTitle,
        text: 'По заголовку'
    },
    {
        value: TSortType.ByUser,
        text: 'По пользователю'
    }
];

const SortDirectionList = [
    {
        value: TSortDirection.ToUp,
        text: 'По возрастанию'
    },
    {
        value: TSortDirection.ToDown,
        text: 'По убыванию'
    }
];

const PostFilters: React.FC<PostFiltersProps> = (props) => {
    const {sortType, setSortType, sortDirection, setSortDirection, keyWord, setKeyWord, resetParams} = props;

    const sortTypeChangeHandler = (event: SelectChangeEvent): void => setSortType(event.target.value as TSortType);

    const sortDirectionChangeHandler = (event: SelectChangeEvent): void => setSortDirection(event.target.value as TSortDirection);

    const keyWordChangeHandler = (event: React.ChangeEvent) => {
        setKeyWord((event.target as HTMLInputElement).value);
    }

    return (
        <Stack direction="row" spacing={2}>
            <TextField
                fullWidth
                id="key_word"
                label="Ключевые слова"
                variant="outlined"
                value={keyWord}
                onChange={keyWordChangeHandler}
            />
            <Selector
                label="Сортировка постов"
                value={sortType as string}
                changeHandler={sortTypeChangeHandler}
                itemList={SortTypesList}
            />
            <Selector
                label="Направление сортировки"
                value={sortDirection as string}
                changeHandler={sortDirectionChangeHandler}
                itemList={SortDirectionList}
            />
            <Button variant="contained" onClick={resetParams}>Сброс</Button>
        </Stack>
    );
};

export default PostFilters;
