import React, {Dispatch, SetStateAction} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack} from '@mui/material';

import {TSortDirection, TSortType} from '../../../types';

type PostFiltersProps = {
    sortType: TSortType,
    setSortType: Dispatch<SetStateAction<TSortType>>,
    sortDirection: TSortDirection,
    setSortDirection: Dispatch<SetStateAction<TSortDirection>>
}

const PostFilters: React.FC<PostFiltersProps> = ({sortType, setSortType, sortDirection, setSortDirection}) => {

    const sortTypeChangeHandler = (event: SelectChangeEvent): void => setSortType(event.target.value as TSortType);

    const sortDirectionChangeHandler = (event: SelectChangeEvent): void => setSortDirection(event.target.value as TSortDirection);

    return (
        <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
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
            <FormControl fullWidth>
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
        </Stack>
    );
};

export default PostFilters;
