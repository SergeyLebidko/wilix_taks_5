import React from 'react';
import {useSelector} from 'react-redux';
import {Chip, Stack} from '@mui/material';

import {TPost} from '../../../types';
import {postTagListSelector, tagListSelector} from '../../../redux/selectors';
import getTagListForPost from '../../../helpers/utils/getTagListForPost';

type TagListProp = {
    post: TPost
}

const TagList: React.FC<TagListProp> = ({post}) => {
    const tagList = useSelector(tagListSelector);
    const postTagList = useSelector(postTagListSelector);

    return (
        <Stack direction="row" spacing={2} sx={{flexWrap: 'wrap'}}>
            {getTagListForPost(post, postTagList, tagList)
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
