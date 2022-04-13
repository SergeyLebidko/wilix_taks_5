import {BACKEND_TIMEOUT, DB_NAME} from '../constants';
import {MOCK_DATA} from './mock_data';
import {
    TBackendResponse,
    TComment,
    TDataBase,
    TDataSet,
    TEntity,
    TEntityList,
    TEntityOpt,
    TLoginOpt,
    TOptions,
    TPost,
    TQueryOpt,
    TRegisterOpt,
    TTag,
    TUrls,
    TUser
} from "../types";

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
        const idsList = (this.db as TDataBase)[entityType].map(value => value.id as number);
        if (!idsList.length) return 1;
        return Math.max(...idsList) + 1;
    }

    // Методы регистрации нового пользователя и логина
    private register(options: TRegisterOpt): TUser {
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

    private login(options: TLoginOpt): TUser {
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
    private getEntity(entityType: TDataSet, options: TQueryOpt): TEntity {
        const {id} = options;
        const entityList = (this.db as TDataBase)[entityType];
        const entity = (entityList as any[]).find((value: TEntity) => (value.id as number) === id);
        if (!entity) {
            throw new Error('Не удалось найти объект...');
        }
        return entity;
    }

    // Создание сущностей
    private createEntity(entityType: TDataSet, options: TEntityOpt): TEntity {
        const nextId = this.getNextId(entityType);
        const entity = {...options, id: nextId};
        this.db = {
            ...(this.db as TDataBase),
            [entityType]: [...(this.db as TDataBase)[entityType], entity]
        }
        return entity;
    }

    // TODO Вставить создание списков сущностей

    // Удаление сущностей
    private removeEntity(entityType: TDataSet, options: TQueryOpt): TEntity {
        const {id} = options;

        // Удаляемая сущность, которая должна быть возвращена
        const entityList = this.getEntityList(entityType);
        const entity = (entityList as any[]).find((value: TEntity) => (value.id as number) === id);
        if (!entity) {
            throw new Error('Не удалось найти объект для удаления...');
        }

        let users = this.getEntityList(TDataSet.User) as TUser[];
        let posts = this.getEntityList(TDataSet.Post) as TPost[];
        let comments = this.getEntityList(TDataSet.Comment) as TComment[];
        let tags = this.getEntityList(TDataSet.Tag) as TTag[];

        if (entityType === TDataSet.User) {
            users = users.filter(user => user.id !== id);
        } else if (entityType === TDataSet.Post) {
            posts = posts.filter(post => post.id !== id);
        } else if (entityType === TDataSet.Comment) {
            comments = comments.filter(comment => comment.id !== id);
        } else if (entityType === TDataSet.Tag) {
            tags = tags.filter(tag => tag.id !== id);
        }

        // Удаляем посты без пользователей
        posts = posts.filter(post => users.some(user => user.id === post.user_id));

        // Удаляем комменты без пользователей
        comments = comments.filter(comment => users.some(user => user.id === comment.user_id));

        // Удаляем комменты без постов
        comments = comments.filter(comment => posts.some(post => post.id === comment.post_id));

        // Удаляем теги без постов
        tags = tags.filter(tag => posts.some(post => post.id === tag.post_id));

        // Формируем новое состояние базы данных
        this.db = {
            [TDataSet.User]: users,
            [TDataSet.Post]: posts,
            [TDataSet.Comment]: comments,
            [TDataSet.Tag]: tags
        }

        return entity;
    }

    // Метод вызывает нужные методы манипулирования данными в зависимости от переданного URL
    private router(url: TUrls, options?: TOptions): TEntity | TEntityList {
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
            case TUrls.Register: {
                return this.register(options as TRegisterOpt);
            }
            case TUrls.Login: {
                return this.login(options as TLoginOpt);
            }
            case TUrls.GetUser: {
                return this.getEntity(TDataSet.User, options as TQueryOpt);
            }
            case TUrls.GetPost: {
                return this.getEntity(TDataSet.Post, options as TQueryOpt);
            }
            case TUrls.GetComment: {
                return this.getEntity(TDataSet.Comment, options as TQueryOpt);
            }
            case TUrls.GetTag: {
                return this.getEntity(TDataSet.Tag, options as TQueryOpt);
            }
            case TUrls.CreateUser: {
                return this.createEntity(TDataSet.User, options as TEntityOpt);
            }
            case TUrls.CreatePost: {
                return this.createEntity(TDataSet.Post, options as TEntityOpt);
            }
            case TUrls.CreateComment: {
                return this.createEntity(TDataSet.Comment, options as TEntityOpt);
            }
            case TUrls.CreateTag: {
                return this.createEntity(TDataSet.Tag, options as TEntityOpt);
            }
            case TUrls.RemoveUser: {
                return this.removeEntity(TDataSet.User, options as TQueryOpt);
            }
            case TUrls.RemovePost: {
                return this.removeEntity(TDataSet.Post, options as TQueryOpt);
            }
            case TUrls.RemoveComment: {
                return this.removeEntity(TDataSet.Comment, options as TQueryOpt);
            }
            case TUrls.RemoveTag: {
                return this.removeEntity(TDataSet.Tag, options as TQueryOpt);
            }
        }
    }

    public fetch(url: TUrls, options?: TOptions): Promise<TBackendResponse> {
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
