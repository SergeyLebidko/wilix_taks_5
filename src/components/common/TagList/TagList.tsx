import React from 'react';
import {useSelector} from 'react-redux';
import {Chip, Stack} from '@mui/material';

import {TPost} from '../../../types';
import {tagListSelector} from '../../../redux/selectors';

type TagListProp = {
    post: TPost
}

const TagList: React.FC<TagListProp> = ({post}) => {
    const tagList = useSelector(tagListSelector);

    return (
        <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
            {tagList
                .filter(tag => tag.post_id === post.id)
                .map(tag =>
                    <Chip
                        key={tag.id}
                        size="small"
                        label={tag.text}
                        color="primary"
                    />)
            }
        </Stack>
    );
};


export default TagList;
