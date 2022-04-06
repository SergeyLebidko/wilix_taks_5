import {BACKEND_TIMEOUT, DB_NAME} from '../settings';
import {MOCK_DATA} from './mock_data';
import {TDataBase, TDataSet, TEntity, TEntityList, TResponse, TUrls, TUser} from './types';

class Backend {
    private db: TDataBase | undefined;

    constructor() {
        // Проверяем наличие данных в local storage и, если их там нет, записываем их туда
        const rawDatabase = localStorage.getItem(DB_NAME);
        if (!rawDatabase) {
            localStorage.setItem(DB_NAME, JSON.stringify(MOCK_DATA));
        }
    }

    private getNextId(entityType: TDataSet): number {
        return Math.max(...(this.db as TDataBase)[entityType].map(value => value.id as number)) + 1;
    }

    // Методы регистрации нового пользователя и логина
    private register(options: any): TUser {
        const {login} = options;
        const users = (this.db as TDataBase)[TDataSet.User];

        // Проверяем, чтобы не было двух пользователей с одинаковым логином
        if (users.find(user => user.login === login)) {
            throw new Error('Пользователь с таким логином уже существует');
        }

        // Присваиваем идентификатор вновь созданному пользователю
        const nextUser = {...options, id: this.getNextId(TDataSet.User)};
        this.db = {
            ...(this.db as TDataBase),
            [TDataSet.User]: [...users, nextUser]
        }

        // Возвращаем вновь созданного пользователя
        return nextUser;
    }

    private login(options: any): TUser {
        const {login, password} = options;
        const user = (this.db as TDataBase)[TDataSet.User].find(user => user.login === login && user.password === password);
        if (!user) {
            throw new Error('Пользователь с такими логином и паролем не найден');
        }
        return user;
    }

    // Метод получения списков сущностей
    private getEntityList(entityType: TDataSet): TEntityList {
        return (this.db as TDataBase)[entityType];
    }

    // Полчение отдельных сущностей по id
    private getEntity(entityType: TDataSet, options: any): TEntity {
        const {id} = options;
        const entityList = (this.db as TDataBase)[entityType];
        const entity = (entityList as any[]).find((value: TEntity) => (value.id as number) === id);
        if (!entity) {
            throw new Error('Не удалось найти объект...');
        }
        return entity;
    }

    // Создание сущностей
    private createEntity(entityType: TDataSet, options: any): TEntity {
        const nextId = this.getNextId(entityType);
        const entity = {...options, id: nextId};
        this.db = {
            ...(this.db as TDataBase),
            [entityType]: [...(this.db as TDataBase)[entityType], entity]
        }
        return entity;
    }

    // Удаление сущностей
    private removeEntity(entityType: TDataSet, options: any): TEntity {
        const {id} = options;

        // Удаляемая сущность, которая должна быть возвращена
        const entityList = (this.db as TDataBase)[entityType];
        const entity = (entityList as any[]).find((value: TEntity) => (value.id as number) === id);
        if (!entity) {
            throw new Error('Не удалось найти объект...');
        }

        // Списки с идентификаторами удаляемых объектов
        const userIds = entityType === TDataSet.User ? [id] : [];
        let postIds = entityType === TDataSet.Post ? [id] : [];
        let commentIds = entityType === TDataSet.Comment ? [id] : [];
        const tagIds = entityType === TDataSet.Tag ? [id] : [];
        let postTagIds = entityType === TDataSet.PostTag ? [id] : [];

        // Если есть объекты для удаления на сороне "один", то ищем связанные объекты на стороне "многие"
        // и вносим их идентификаторы в списки удаляемых объектов

        // Если есть удаляемые пользователи, то ищем посты и комменты, которые должны быть удалены по цепочке
        if (userIds.length) {
            userIds.forEach(userId => {
                postIds = [...postIds, ...this.getLinkedPostsIds(userId)];
                commentIds = [...commentIds, ...this.getLinkedCommentIds(userId, null)];
            });
        }

        // Если есть удаляемые посты, то ищем комменты, которые должны быть удалены по цепочке
        // и связи постов и тегов, которые также должны быть удалены
        if (postIds.length) {
            postIds.forEach(postId => {
                commentIds = [...commentIds, ...this.getLinkedCommentIds(null, postId)];
                postTagIds = [...postTagIds, ...this.getLinkedPostTagIds(postId, null)];
            });
        }

        // Если есть удаляемые теги, то помечаем для удаления все их связи с постами
        if (tagIds.length) {
            tagIds.forEach(tagId => {
                postTagIds = [...postTagIds, ...this.getLinkedPostTagIds(null, tagId)];
            })
        }

        // Удаляем помеченные объекты из БД
        this.db = {
            [TDataSet.User]: ((this.db as TDataBase)[TDataSet.User] as any[]).filter(({id}) => !userIds.includes(id)),
            [TDataSet.Post]: ((this.db as TDataBase)[TDataSet.Post] as any[]).filter(({id}) => !postIds.includes(id)),
            [TDataSet.Comment]: ((this.db as TDataBase)[TDataSet.Comment] as any[]).filter(({id}) => !commentIds.includes(id)),
            [TDataSet.Tag]: ((this.db as TDataBase)[TDataSet.Tag] as any[]).filter(({id}) => !tagIds.includes(id)),
            [TDataSet.PostTag]: ((this.db as TDataBase)[TDataSet.PostTag] as any[]).filter(({id}) => !postTagIds.includes(id))
        }

        return entity;
    }

    // Вспомогательные методы для поиска связанных сущностей в отношениях один-ко-многим
    private getLinkedPostsIds(userId: number): number[] {
        return (this.db as TDataBase)[TDataSet.Post]
            .filter(post => post.user_id === userId)
            .map(post => post.id as number);
    }

    private getLinkedCommentIds(userId: number | null, postId: number | null): number[] {
        return (this.db as TDataBase)[TDataSet.Comment]
            .filter(comment => comment.user_id === userId || comment.post_id === postId)
            .map(comment => comment.id as number);
    }

    private getLinkedPostTagIds(postId: number | null, tagId: number | null): number[] {
        return (this.db as TDataBase)[TDataSet.PostTag]
            .filter(postTag => postTag.post_id === postId || postTag.tag_id === tagId)
            .map(postTag => postTag.id as number);
    }

    // Метод вызывает нужные методы манипулирования данными в зависимости от переданного URL
    private router(url: TUrls, options?: any): TEntity | TEntityList {
        switch (url) {
            case TUrls.GetUserList: {
                return this.getEntityList(TDataSet.User);
            }
            case TUrls.GetPostList: {
                return this.getEntityList(TDataSet.Post);
            }
            case TUrls.GetCommentList: {
                return this.getEntityList(TDataSet.Comment);
            }
            case TUrls.GetTagList: {
                return this.getEntityList(TDataSet.Tag);
            }
            case TUrls.GetPostTagList: {
                return this.getEntityList(TDataSet.PostTag);
            }
            case TUrls.Register: {
                return this.register(options);
            }
            case TUrls.Login: {
                return this.login(options);
            }
            case TUrls.GetUser: {
                return this.getEntity(TDataSet.User, options);
            }
            case TUrls.GetPost: {
                return this.getEntity(TDataSet.Post, options);
            }
            case TUrls.GetComment: {
                return this.getEntity(TDataSet.Comment, options);
            }
            case TUrls.GetTag: {
                return this.getEntity(TDataSet.Tag, options);
            }
            case TUrls.GetPostTag: {
                return this.getEntity(TDataSet.PostTag, options);
            }
            case TUrls.CreateUser: {
                return this.createEntity(TDataSet.User, options);
            }
            case TUrls.CreatePost: {
                return this.createEntity(TDataSet.Post, options);
            }
            case TUrls.CreateComment: {
                return this.createEntity(TDataSet.Comment, options);
            }
            case TUrls.CreateTag: {
                return this.createEntity(TDataSet.Tag, options);
            }
            case TUrls.CreatePostTag: {
                return this.createEntity(TDataSet.PostTag, options);
            }
            case TUrls.RemoveUser: {
                return this.removeEntity(TDataSet.User, options);
            }
            case TUrls.RemovePost: {
                return this.removeEntity(TDataSet.Post, options);
            }
            case TUrls.RemoveComment: {
                return this.removeEntity(TDataSet.Comment, options);
            }
            case TUrls.RemoveTag: {
                return this.removeEntity(TDataSet.Tag, options);
            }
            case TUrls.RemovePostTag: {
                return this.removeEntity(TDataSet.PostTag, options);
            }
        }
    }

    public fetch(url: TUrls, options?: any): Promise<TEntity | TEntityList | string> {

        console.log(url);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    this.db = JSON.parse(localStorage.getItem(DB_NAME) || '');
                    const _db = this.db;

                    // Выбор "маршрута" и получение результата
                    resolve(this.router(url, options));

                    // Если нужно - сбрасываем обновленный дамп базы в local storage
                    if (_db !== this.db) {
                        localStorage.setItem(DB_NAME, JSON.stringify(this.db));
                    }
                } catch (err) {
                    console.error(`Не удалось выполнить запрос на url: ${url} с параметрами: ${JSON.stringify(options)}. Возникла ошибка: ${(err as Error).message}`);
                    reject((err as Error).message);
                }
            }, BACKEND_TIMEOUT);
        });
    }
}

export default new Backend();
