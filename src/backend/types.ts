export enum TMethods {
    Get = 'Get',
    Post = 'Post',
    Put = 'Put',
    Delete = 'Delete'
}

export enum TUrls {
    User = 'User',
    Post = 'Post',
    Comment = 'Comment',
    Tag = 'Tag'
}

export type TUser = {
    id: number,
    login: string,
    password: string,
    first_name: string,
    last_name: string
}

export type TPost = {
    id: number,
    user_id: number,
    text: string,
    dt_created: number
}

export type TComment = {
    id: number,
    user_id: number,
    post_id: number,
    text: string,
    dt_created: number
}

export type TTag = {
    id: number,
    text: string
}

export type TPostTag = {
    tag_id: number,
    post_id: number
}
