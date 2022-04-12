// Состояния загрузки списков данных
export type TStatus = 'pending' | 'done' | 'error';

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
    id?: number,
    login: string,
    password: string,
    first_name: string,
    last_name: string,
    avatar: null | string
}

// Тип данных для таблицы постов
export type TPost = {
    id?: number,
    user_id: number,
    title: string
    text: string,
    dt_created: number
}

// Тип данных для таблицы комментариев
export type TComment = {
    id?: number,
    user_id: number,
    post_id: number,
    text: string,
    dt_created: number
}

// Тип данных для таблицы тегов
export type TTag = {
    id?: number,
    text: string
}

// Тип данных для таблицы связи постов и тегов
export type TPostTag = {
    id?: number,
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

// Собирательный тип данных для всех сущностей
export type TEntity = TUser | TPost | TComment | TTag | TPostTag;

// Собирательный тип для списков сущностей
export type TEntityList = TUser[] | TPost[] | TComment[] | TTag[] | TPostTag[];

// Собирательный тип для всех возможных ответов бэкенда
export type TBackendResponse = TEntity | TEntityList | string;

// Набор адресов для доступа к методам бэкенда (играют роль URL)
export enum TUrls {
    GetUserList = 'get_user_list',
    GetPostList = 'get_post_list',
    GetCommentList = 'get_comment_list',
    GetTagList = 'get_tag_list',
    GetPostTagList = 'get_post_tag_list',
    Register = 'register',
    Login = 'login',
    GetUser = 'get_user',
    GetPost = 'get_post',
    GetComment = 'get_comment',
    GetTag = 'get_tag',
    GetPostTag = 'get_post_tag',
    CreateUser = 'create_user',
    CreatePost = 'create_post',
    CreateComment = 'create_comment',
    CreateTag = 'create_tag',
    CreatePostTag = 'create_post_tag',
    RemoveUser = 'remove_user',
    RemovePost = 'remove_post',
    RemoveComment = 'remove_comment',
    RemoveTag = 'remove_tag',
    RemovePostTag = 'remove_post_tag'
}

// Типы объектов-параметров (опций) для запросов к бэкенду
export type TRegisterOpt = TUser;

export type TLoginOpt = {
    login: string,
    password: string
}

export type TEntityOpt = TEntity;

export type TQueryOpt = {
    id: number
}

export type TOptions = TRegisterOpt | TLoginOpt | TEntityOpt | TQueryOpt;

// Тип сортировки постов - по дате, по пользователю, по заголовку
export enum TSortType {
    ByDate = 'date',
    ByUser = 'user',
    ByTitle = 'title'
}

// Направление сортировки - от меньшего к большему и от большего к меньшему
export enum TSortDirection {
    ToUp = 'to_up',
    ToDown = 'to_down'
}
