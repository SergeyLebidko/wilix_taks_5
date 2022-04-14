import React from 'react';
import {useSelector} from 'react-redux';
import {Stack} from '@mui/material';

import {TPost} from '../../../types';
import {tagListSelector} from '../../../redux/selectors';
import TagCard from '../TagCard';

type TagListProp = {
    post: TPost
}

const TagList: React.FC<TagListProp> = ({post}) => {
    const tagList = useSelector(tagListSelector);

    return (
        <Stack direction="row" spacing={1} sx={{flexWrap: 'wrap'}}>
            {tagList
                .filter(tag => tag.post_id === post.id)
                .map(tag => <TagCard key={tag.id} tag={tag}/>)
            }
        </Stack>
    );
};


export default TagList;
