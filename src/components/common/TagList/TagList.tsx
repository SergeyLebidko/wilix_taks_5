import React from 'react';
import {useSelector} from 'react-redux';
import {Chip, Stack} from '@mui/material';

import {TPost} from '../../../types';
import {postTagListSelector, tagListSelector} from '../../../redux/selectors';

type TagListProp = {
    post: TPost
}

const TagList: React.FC<TagListProp> = ({post}) => {
    const tagList = useSelector(tagListSelector);
    const postTagList = useSelector(postTagListSelector);

    // Список связей с тегами, актуальный для данного поста
    const linkedPostTag = postTagList.filter(postTag => postTag.post_id === post.id);

    return (
        <Stack direction="row" spacing={2} sx={{flexWrap: 'wrap'}}>
            {tagList
                .filter(tag => linkedPostTag.find(postTag => postTag.tag_id === tag.id))
                .map(tag => <Chip key={tag.id} label={tag.text} variant="outlined"/>)
            }
        </Stack>
    );
};


export default TagList;
