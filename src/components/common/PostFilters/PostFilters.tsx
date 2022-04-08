import React, {Dispatch, SetStateAction} from 'react';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField
} from '@mui/material';

import {TSortDirection, TSortType} from '../../../types';

type PostFiltersProps = {
    sortType: TSortType,
    setSortType: Dispatch<SetStateAction<TSortType>>,
    sortDirection: TSortDirection,
    setSortDirection: Dispatch<SetStateAction<TSortDirection>>,
    keyWord: string,
    setKeyWord: Dispatch<SetStateAction<string>>,
    resetParams: () => void
}

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
            <FormControl sx={{minWidth: '12em'}}>
                <InputLabel id="sort_type_selector_label">Сортировка постов</InputLabel>
                <Select
                    labelId="sort_type_selector_label"
                    id="sort_type_selector"
                    label="Сортировка постов"
                    value={sortType}
                    defaultValue={TSortType.ByDate}
                    onChange={sortTypeChangeHandler}
                >
                    <MenuItem value={TSortType.ByDate}>По дате</MenuItem>
                    <MenuItem value={TSortType.ByUser}>По пользователю</MenuItem>
                    <MenuItem value={TSortType.ByTitle}>По заголовку</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{minWidth: '12em'}}>
                <InputLabel id="demo-simple-select-label">Направление сортировки</InputLabel>
                <Select
                    labelId="sort_direction_selector_label"
                    id="sort_direction_selector"
                    label="Направление сортировки"
                    value={sortDirection}
                    defaultValue={TSortDirection.ToDown}
                    onChange={sortDirectionChangeHandler}
                >
                    <MenuItem value={TSortDirection.ToUp}>По возрастанию</MenuItem>
                    <MenuItem value={TSortDirection.ToDown}>По убыванию</MenuItem>
                </Select>
            </FormControl>
            <Button variant="outlined" disableElevation onClick={resetParams}>
                Сброс
            </Button>
        </Stack>
    );
};

export default PostFilters;
