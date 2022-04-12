import {TPost, TPostTag, TTag} from '../../types';

function getTagListForPost(post: TPost, postTagList: TPostTag[], tagList: TTag[]): TTag[] {
    const _postTagList = postTagList.filter(postTag => postTag.post_id === post.id);
    return tagList.filter(tag => !!_postTagList.find(postTag => postTag.tag_id === tag.id));
}

export default getTagListForPost;
