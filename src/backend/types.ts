// Методы для доступа к базе данных
export enum TMethods {
    Get = 'Get',
    Post = 'Post',
    Delete = 'Delete'
}

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

// Типы наборов данных, которые могут быть запрошены с бэкенда
export type TUrls = TDataSet.User | TDataSet.Post | TDataSet.Comment | TDataSet.Tag

// Типы наборов данных, которые могут быть возвращены бэкендом
export type TEntity = TUser | TUser[] | TPost | TPost[] | TComment | TComment[] | TTag | TTag[];

// Тип данных для представления стартового пресета данных
export type TMockData = {
    [TDataSet.User]: TUser[],
    [TDataSet.Post]: TPost[],
    [TDataSet.Comment]: TComment[],
    [TDataSet.Tag]: TTag[],
    [TDataSet.PostTag]: TPostTag[]
}
