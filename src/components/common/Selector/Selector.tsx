import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import createRandomString from '../../../helpers/utils/createRandomString';

type TItem = {
    value: string,
    text: string
}

type SelectorProps = {
    label: string,
    value: string,
    changeHandler: (event: SelectChangeEvent) => void,
    itemList: TItem[]
};

const Selector: React.FC<SelectorProps> = ({label, value, changeHandler, itemList}) => {
    const labelId = `selector-${createRandomString()}-label`;
    const id = `selector-${createRandomString()}`;

    return (
        <FormControl sx={{minWidth: '12em'}}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                id={id}
                label={label}
                value={value}
                defaultValue={itemList[0].value}
                onChange={changeHandler}
            >
                {itemList.map(
                    ({value, text}) =>
                        <MenuItem key={value} value={value}>{text}</MenuItem>)
                }
            </Select>
        </FormControl>
    );
};

export default Selector;
