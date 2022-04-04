// Наборы данных, которыми оперирует бэкенд
export enum TDataSet {
    User = 'User',
    Post = 'Post',
    Comment = 'Comment',
    Tag = 'Tag',
    PostTag = 'PostTag'
}

// Тип данных для таблицы пользователей
export type TUser = {
    id: number,
    login: string,
    password: string,
    first_name: string,
    last_name: string,
    avatar: null | string
}

// Тип данных для таблицы постов
export type TPost = {
    id: number,
    user_id: number,
    title: string
    text: string,
    dt_created: number
}

// Тип данных для таблицы комментариев
export type TComment = {
    id: number,
    user_id: number,
    post_id: number,
    text: string,
    dt_created: number
}

// Тип данных для таблицы тегов
export type TTag = {
    id: number,
    text: string
}

// Тип данных для таблицы связи постов и тегов
export type TPostTag = {
    id: number,
    tag_id: number,
    post_id: number
}

// Тип данных для представления всей базы данных в целом
export type TDataBase = {
    [TDataSet.User]: TUser[],
    [TDataSet.Post]: TPost[],
    [TDataSet.Comment]: TComment[],
    [TDataSet.Tag]: TTag[],
    [TDataSet.PostTag]: TPostTag[]
}

// Набор адресов для доступа к методам бэкенда (играют роль URL)
export enum TUrls {
    GetUserList = 'get_user_list',
    GetPostList = 'get_post_list',
    GetCommentList = 'get_comment_list',
    GetTagList = 'get_tag_list',
    Register = 'register',
    Login = 'login',
    Logout = 'logout'
}

// Тип для описания ответов бэкенда
export type TResponse = {
    type: 'success' | 'error',
    payload?: any
}
