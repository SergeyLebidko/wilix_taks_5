// Методы для доступа к базе данных
export enum TMethods {
    Get = 'Get',
    Post = 'Post',
    Put = 'Put',
    Delete = 'Delete'
}

// Основные наборы данных
export enum TDataSet {
    User = 'User',
    Post = 'Post',
    Comment = 'Comment',
    Tag = 'Tag',
    PostTag = 'PostTag'
}

export type TUser = {
    id: number,
    login: string,
    password: string,
    first_name: string,
    last_name: string,
    avatar: null | string
}

export type TPost = {
    id: number,
    user_id: number,
    title: string
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
    id: number,
    tag_id: number,
    post_id: number
}

// Тип данных для представления стартового пресета данных
export type TMockData = {
    [TDataSet.User]: TUser[],
    [TDataSet.Post]: TPost[],
    [TDataSet.Comment]: TComment[],
    [TDataSet.Tag]: TTag[],
    [TDataSet.PostTag]: TPostTag[]
}
